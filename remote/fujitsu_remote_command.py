HEADER = [0b00101000, 0b11000110, 0b00000000, 0b00001000, 0b00001000]

CMD_OFF = 0b01000000
CMD_KAZE_MUKI = 0b00110110
CMD_DASH = 0b10011100
CMD_ENERGY_EFFICIENT = 0b10010000

CMD_LONG = 0b00111111

LONG_HEADER_1 = 0b00010000
LONG_HEADER_2 = 0b00001100

PWR_TURN_ON = 0b1000
PWR_STAY_ON = 0b0000

TMR_ON_TIME = 0b1100
TMR_OFF_TIME = 0b0100
TMR_OFF = 0b0000

TEMP_MIN = 0x00
TEMP_MAX = 0x0F

TEMP_MIN_HEAT_C = 16
TEMP_MIN_C = 18
TEMP_MAX_C = 30

MODE_AUTO = 0b0000
MODE_COOLER = 0b1000
MODE_DRY = 0b0100
MODE_FAN = 0b1100
MODE_HEATER = 0b0010

FAN_SPD_AUTO = 0b0000
FAN_SPD_HIGH = 0b1000
FAN_SPD_LOW = 0b0100
FAN_SPD_QUIET = 0b1100
FAN_SPD_NATURAL = 0b0010

SWING_ON = 0b1000
SWING_OFF = 0b0000

SHORT_COMMAND_LENGTH = len(HEADER) + 1
LONG_COMMAND_LENGTH = SHORT_COMMAND_LENGTH + 2 + 6 + 1


class ShortCommand:
    def __init__(self, cmd):
        self.cmd = cmd

    def to_bytes(self):
        return HEADER + [self.cmd]

    def __str__(self):
        return "Short command: " + {
            CMD_OFF: "OFF",
            CMD_DASH: "DASH",
            CMD_ENERGY_EFFICIENT: "ECO",
            CMD_KAZE_MUKI: "KAZE_MUKI",
            CMD_LONG: "LONG",
        }[self.cmd]


class LongCommand:
    def __init__(self, pwr, mode, timer_mode, temperature, fan_speed,
                 swing, timer_time):
        self.pwr = pwr
        self.temperature = temperature
        self.mode = mode
        self.timer_mode = timer_mode
        self.swing = swing
        self.fan_speed = fan_speed
        self.timer_time = timer_time
        pass

    def to_bytes(self):
        pwr_temp = self.pwr << 4 | self.temperature
        mode = self.mode << 4 | self.timer_mode
        fan_swing = self.fan_speed << 4 | self.swing << 0

        timer_bits = [0, 0, 0]
        if self.timer_mode == TMR_ON_TIME:
            top_nibble = (self.timer_time & 0x3C0) >> 6
            bottom_byte = (self.timer_time & 0x3F) << 2 | 1
            timer_bits = [0, top_nibble, bottom_byte]
        elif self.timer_mode == TMR_OFF_TIME:
            top_byte = (self.timer_time & 0x3FC) >> 2
            bottom_nibble = ((self.timer_time & 0x3) << 2 | 1) << 4
            timer_bits = [top_byte, bottom_nibble, 0]

        long_cmd = [LONG_HEADER_2] + [pwr_temp, mode, fan_swing] + timer_bits
        return HEADER + [CMD_LONG] + [LONG_HEADER_1] + long_cmd + \
            [checksum(long_cmd)]

    def __str__(self):
        pwr = "TURN_ON" if self.pwr == PWR_TURN_ON else "STAY_ON"
        temp = str(reverse_bits(self.temperature, 4) +
                   TEMP_MIN_HEAT_C - TEMP_MIN)

        mode = {MODE_AUTO: "AUTO", MODE_COOLER: "COOLER", MODE_DRY: "DRY",
                MODE_FAN: "FAN", MODE_HEATER: "HEATER", }[self.mode]
        timer_mode = {TMR_OFF: "OFF", TMR_OFF_TIME: "OFF AFTER",
                      TMR_ON_TIME: "ON AFTER", }[self.timer_mode]
        fan_spd = {
            FAN_SPD_AUTO: "AUTO",
            FAN_SPD_HIGH: "HIGH",
            FAN_SPD_LOW: "LOW",
            FAN_SPD_NATURAL: "NATURAL",
            FAN_SPD_QUIET: "QUIET",
        }[self.fan_speed]
        swing = ("ON" if self.swing == SWING_ON else "OFF")

        indicators = {
            "PWR": pwr,
            "TEMP": temp,
            "MODE": mode,
            "TMR": timer_mode,
            "TIME": str(self.timer_time / 60) + "H",
            "FAN_SPD": fan_spd,
            "SWING": swing
        }

        return ("+------------+--------------+\n" +
                "\n".join(map(lambda k: "| " + k.ljust(10) + " | " + indicators[k].ljust(12) + " |", indicators.keys())) +
                "\n+------------+--------------+")


def reverse_word(v):
    n1 = reverse_bits(v & 0x0f, 4)
    n2 = reverse_bits((v & 0xf0) >> 4, 4)
    return (n1 << 4) | n2


def reverse_bits(num, bits):
    result = 0
    while bits != 0:
        result = (result << 1) + (num & 1)
        num >>= 1
        bits -= 1
    return result


def from_bytes(bytes):
    if len(bytes) == SHORT_COMMAND_LENGTH:
        if not HEADER == bytes[:len(HEADER)]:
            raise ValueError("Invalid header " + str(bytes[:len(HEADER)]))

        return ShortCommand(bytes[-1])

    if len(bytes) != LONG_COMMAND_LENGTH:
        # raise ValueError("Invalid command length: " + str(len(bytes)) + " expected " + str(ll))
        pass

    if not HEADER == bytes[:len(HEADER)]:
        raise ValueError("Invalid header " + str(bytes[:len(HEADER)]))

    rem = bytes[len(HEADER):]
    if not CMD_LONG == rem[0]:
        raise ValueError("Invalid command " + str(rem[0]))

    if not LONG_HEADER_1 == rem[1]:
        raise ValueError("Invalid long command header " + str(rem[1]))

    if not LONG_HEADER_2 == rem[2]:
        raise ValueError("Invalid long command header " + str(rem[2]))

    pwr_temp = rem[3]
    mode = rem[4]
    fan_swing = rem[5]
    timer_mode = mode & 0xF
    timer_time = 0

    if (timer_mode == TMR_ON_TIME):
        raw_value = ((rem[7] & 0xF) << 6) | (rem[8] >> 2)
        timer_time = reverse_bits(raw_value, 10)
    elif (timer_mode == TMR_OFF_TIME):
        raw_value = ((rem[6]) << 2) | ((rem[7] & 0xF0) >> 6)
        timer_time = reverse_bits(raw_value, 10)

    return LongCommand(
        (pwr_temp & 0xF0) >> 4,
        (mode & 0xF0) >> 4,
        timer_mode,
        pwr_temp & 0xF,
        (fan_swing & 0xF0) >> 4,
        fan_swing & 0xF,
        timer_time)


def checksum(bytes):
    r = 0
    for w in bytes:
        r = (r + reverse_word(w)) & 0xff
    return reverse_word((0b11111111 ^ r) + 1)


def temperature_code(temperature, heater):
    min = TEMP_MIN_HEAT_C if heater else TEMP_MIN_C
    max = TEMP_MAX_C
    if not (min <= temperature <= max):
        raise ValueError('Temperature must be between ' +
                         str(min) + ' and ' + str(max))

    return reverse_bits((temperature - TEMP_MIN_HEAT_C) + TEMP_MIN, 4)


def byte_str(byte):
    bits = [str((byte >> i) & 1) for i in range(0, 8)]
    return "".join(bits)

