import time

MAX_KEEP_PERIOD = 30 * 24 * 3600
MAX_KEEP_UPDATES = 10000


class SensorData:
    def __init__(
            self,
            initial_data=[],
            on_change=lambda data: None,
            time=time
    ):
        self.data = initial_data
        self.time = time
        self.on_change = on_change

    def _prune(self, now):
        last_valid = min(MAX_KEEP_UPDATES, len(self.data))
        while last_valid > 1:
            updated = self.data[last_valid - 1]["timestamp"]
            if now - updated < MAX_KEEP_PERIOD:
                break

            last_valid = last_valid - 1

        self.data = self.data[:last_valid]

    def add(self, temperature, humidity):
        now = int(self.time.time_ns() / 1000000000)
        data = {
            "temperature": temperature,
            "humidity": humidity,
            "timestamp": now
        }
        self.data.insert(0, data)

        self._prune(now)
        self.on_change(data)

    def get_all(self):
        now = int(self.time.time_ns() / 1000000000)
        self._prune(now)

        return [p for p in self.data]
