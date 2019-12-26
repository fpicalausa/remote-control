from datetime import datetime
import time


class TimerCommand:
    def __init__(self, on, temperature, fan, mode):
        self.on = on
        self.temperature = temperature
        self.fan = fan
        self.mode = mode

    def _set_full_state(self, remote):
        remote.off()
        remote.set_silent(True)
        remote.change_temperature(self.temperature)
        remote.change_fan_speed(self.fan)
        remote.change_mode(self.mode)

        # Make sure we send a power on signal.
        remote.off()
        remote.set_silent(False)
        time.sleep(1)
        remote.on()

    def execute(self, remote):
        if self.on:
            self._set_full_state(remote)
        else:
            remote.off()


class Timer:
    def __init__(self, tid, time, command, enabled):
        self.tid = tid
        self.time = time
        self.command = command
        self.enabled = enabled


class Timers:
    def __init__(self, remote):
        now = datetime.now()
        self.timers = []
        self.last_run = [now.hour, now.minute - 5]
        self.remote = remote
        self.tid = 0

    def add(self, timer):
        self.tid = self.tid + 1
        timer.tid = self.tid
        self.timers.append(timer)

    def replace(self, new):
        self.timers = [(new if t.tid == new.tid else t) for t in self.timers]

    def remove(self, tid):
        self.timers = [t for t in self.timers if t.tid != tid]

    def run(self):
        now = datetime.now()
        before = self.last_run
        after = [now.hour, now.minute]
        to_run = [
            t for t in self.timers
            if before <= t.time < after and t.enabled
        ]
        self.last_run = after

        if not to_run:
            return

        to_run: Timer = to_run[0]
        to_run.command.execute(self.remote)
