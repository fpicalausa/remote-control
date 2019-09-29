import React, { useState, useEffect } from "react";
import "./App.css";
import Indicator from "./Indicator";
import Remote from "./Remote";
import Client, { RemoteMode, START_STATE, RemoteFanSpeed, CurrentCondition } from "./Client";

const client = new Client();

const App: React.FC = () => {
  const [remoteState, setRemoteState] = useState(START_STATE);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<null | CurrentCondition>(null);

  function onPowerChange(power: boolean) {
    if (power) {
      client.on();
    } else {
      client.off();
    }

    setRemoteState(state => ({
      ...state,
      power
    }));
  }

  function onModeChange(mode: RemoteMode) {
    client.mode(mode);

    setRemoteState(state => ({
      ...state,
      mode
    }));
  }

  function onSpeedChange(speed: RemoteFanSpeed) {
    client.fan(speed);

    setRemoteState(state => ({
      ...state,
      fan_speed: speed
    }));
  }

  function onTemperatureChange(temperature: number) {
    client.temperature(temperature);

    setRemoteState(state => ({
      ...state,
      temperature: temperature
    }));
  }

  useEffect(() => {
    client.state().then(remote => {
      setRemoteState(remote);

      client.sensor().then(condition => {
        setCurrent(condition)
      })


      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Please wait</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Indicator label="Temperature" value={current ? current.temperature : 'N/A'} unit="°C" />
        <Indicator label="Humidity" value={current ? current.humidity : 'N/A'} unit="%" />
      </header>
      <main className="App-main">
        <Remote
          onPowerChange={onPowerChange}
          onModeChange={onModeChange}
          onFanSpeedChange={onSpeedChange}
          onTemperatureChange={onTemperatureChange}
          state={remoteState}
        ></Remote>
      </main>
    </div>
  );
};

export default App;
