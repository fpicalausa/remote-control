from .fujitsu_remote_command import *


class FujitsuRemote:
    def __init__(self, on_command):
        self._on = False
        self._temperature = 25
        self._mode = MODE_AUTO
        self._fan_speed = FAN_SPD_AUTO
        self._swing = SWING_OFF

        self.on_command = on_command

    def off(self):
        self.on_command(ShortCommand(CMD_OFF))
        self._on = False

    def on(self):
        self.on_command(self._long_command())
        self._on = True

    def change_temperature(self, temperature):
        if self._mode == MODE_HEATER:
            if not (TEMP_MIN_HEAT_C <= temperature <= TEMP_MAX_C):
                raise ValueError(
                    "Temperature out of range: " + str(temperature))
        else:
            if not (TEMP_MIN_C <= temperature <= TEMP_MAX_C):
                raise ValueError(
                    "Temperature out of range: " + str(temperature))

        self._temperature = temperature
        self.on_command(self._long_command())
        self._on = True

    def change_mode(self, mode):
        if mode not in [MODE_AUTO, MODE_COOLER, MODE_DRY, MODE_FAN, MODE_HEATER]:
            raise ValueError('Unknown mode: ' + str(mode))

        self._mode = mode
        self.on_command(self._long_command())

    def change_swing(self, enable):
        self._swing = SWING_ON if enable else SWING_OFF

        self.on_command(self._long_command())

    def change_fan_speed(self, fan_speed):
        self._fan_speed = fan_speed

        self.on_command(self._long_command())

    def _long_command(self):
        pwr = PWR_STAY_ON if self._on else PWR_TURN_ON
        self._on = True
        temp_code = temperature_code(
            self._temperature, self._mode == MODE_HEATER)
        return LongCommand(pwr, self._mode, TMR_OFF, temp_code, self._fan_speed, self._swing, 0)

    def is_on(self):
        return self._on

    def temperature(self):
        return self._temperature

    def fan_speed(self):
        return {
            FAN_SPD_AUTO: "auto",
            FAN_SPD_HIGH: "high",
            FAN_SPD_LOW: "low",
            FAN_SPD_QUIET: "quiet",
            FAN_SPD_NATURAL: "natural",

        }[self._fan_speed]

    def mode(self):
        return {
            MODE_COOLER: "cooler",
            MODE_HEATER: "heater",
            MODE_AUTO: "auto",
            MODE_FAN: "fan",
            MODE_DRY: "dry",
        }[self._mode]
