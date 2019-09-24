import React from "react";
import "./Remote.css";
import Toggle from "./Toggle";
import { RemoteMode, RemoteFanSpeed, RemoteState } from "./Client";

export const ACTION_PWR = "power";
export const ACTION_MODE = "mode";

const Remote: React.FC<{
  onPowerChange: (power: boolean) => void;
  onModeChange: (mode: RemoteMode) => void;
  onFanSpeedChange: (mode: RemoteFanSpeed) => void;
  state: RemoteState;
}> = ({ onPowerChange, onModeChange, onFanSpeedChange, state }) => {
  const { power, mode, fan_speed, temperature } = state;

  return (
    <>
      <Toggle className="Option-row">
        <Toggle.Button
          id="pwr-on"
          value={true}
          checked={power}
          onChange={onPowerChange}
        >
          On
        </Toggle.Button>
        <Toggle.Button
          id="pwr-off"
          value={false}
          checked={!power}
          onChange={onPowerChange}
        >
          Off
        </Toggle.Button>
      </Toggle>

      <Toggle className="Option-row">
        <Toggle.Button
          id="mode-auto"
          value={"auto"}
          checked={mode === "auto"}
          onChange={onModeChange}
        >
          Auto
        </Toggle.Button>
        <Toggle.Button
          id="mode-cooler"
          value={"cooler"}
          checked={mode === "cooler"}
          onChange={onModeChange}
        >
          <i className="far fa-snowflake"></i>
        </Toggle.Button>
        <Toggle.Button
          id="mode-heater"
          value={"heater"}
          checked={mode === "heater"}
          onChange={onModeChange}
        >
          <i className="fas fa-sun"></i>
        </Toggle.Button>
      </Toggle>

      <Toggle className="Option-row">
        <Toggle.Button
          id="speed-auto"
          value={"auto"}
          checked={fan_speed === "auto"}
          onChange={onFanSpeedChange}
        >
          Auto
        </Toggle.Button>
        <Toggle.Button
          id="speed-high"
          value={"high"}
          checked={fan_speed === "high"}
          onChange={onFanSpeedChange}
        >
          <i className="fas fa-fan"></i>
        </Toggle.Button>
        <Toggle.Button
          id="speed-low"
          value={"low"}
          checked={fan_speed === "low"}
          onChange={onFanSpeedChange}
        >
          <i className="fas fa-fan small"></i>
        </Toggle.Button>
      </Toggle>

      <div className="Option-row">
        <input type="Number" min={22} max={30} value={temperature} />
      </div>
    </>
  );
};

export default Remote;
