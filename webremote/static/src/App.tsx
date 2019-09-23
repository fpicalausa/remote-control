import React, { useState } from "react";
import "./App.css";
import Indicator from "./Indicator";
import Toggle from "./Toggle";
import Client from "./Client"

const client = new Client();

const App: React.FC = () => {
  const [power, _setPower] = useState(1);
  const [mode, setMode] = useState("cooler");
  const [fanSpeed, setFanSpeed] = useState("auto");

  function setPower(value:number) {
    if (!value) {
      client.off();
    }
    _setPower(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Indicator label="Temperature" value={29} unit="°C" />
        <Indicator label="Humidity" value={50} unit="%" />
      </header>
      <main className="App-main">
        <Toggle className="Option-row">
          <Toggle.Button
            id="pwr-on"
            value={1}
            checked={power === 1}
            onChange={setPower}
          >
            On
          </Toggle.Button>
          <Toggle.Button
            id="pwr-off"
            value={0}
            checked={power === 0}
            onChange={setPower}
          >
            Off
          </Toggle.Button>
        </Toggle>

        <Toggle className="Option-row">
          <Toggle.Button
            id="mode-auto"
            value={"auto"}
            checked={mode === "auto"}
            onChange={setMode}
          >
            Auto
          </Toggle.Button>
          <Toggle.Button
            id="mode-cooler"
            value={"cooler"}
            checked={mode === "cooler"}
            onChange={setMode}
          >
            <i className="far fa-snowflake"></i>
          </Toggle.Button>
          <Toggle.Button
            id="mode-heater"
            value={"heater"}
            checked={mode === "heater"}
            onChange={setMode}
          >
            <i className="fas fa-sun"></i>
          </Toggle.Button>
        </Toggle>

        <Toggle className="Option-row">
          <Toggle.Button
            id="fan-auto"
            value={"auto"}
            checked={fanSpeed === "auto"}
            onChange={setFanSpeed}
          >
            Auto
          </Toggle.Button>
          <Toggle.Button
            id="fan-high"
            value={"high"}
            checked={fanSpeed === "high"}
            onChange={setFanSpeed}
          >
            <i className="fas fa-wind"></i>
          </Toggle.Button>
          <Toggle.Button
            id="fan-low"
            value={"low"}
            checked={fanSpeed === "low"}
            onChange={setFanSpeed}
          >
            <i className="fas fa-wind"></i>
          </Toggle.Button>
        </Toggle>
      </main>
    </div>
  );
};

export default App;
