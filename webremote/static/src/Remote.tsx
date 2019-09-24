import React from "react";
import "./Remote.css";
import Toggle from "./Toggle";

export const ACTION_PWR = 'power';
export const ACTION_MODE = 'mode';

type BoolAction = 'power'
type StringAction = 'mode' | 'fanspd'

export type Action = {
  action: BoolAction,
  payload: boolean,
} | {
  action: StringAction,
  payload: string,
};

const Remote: React.FC<{
  onChange: (action: Action) => void,
  state: {
    power: boolean,
    mode: string
  }
}> = ({
  onChange,
  state
}) => {
  const {power, mode} = state;

  function setPower(value: boolean) {
    onChange({
      action: ACTION_PWR,
      payload: value
    })
  }

  function setMode(value: string) {
    onChange({
      action: ACTION_MODE,
      payload: value
    })
  }

  return (
    <>
      <Toggle className="Option-row">
        <Toggle.Button
          id="pwr-on"
          value={true}
          checked={power}
          onChange={setPower}
        >
          On
        </Toggle.Button>
        <Toggle.Button
          id="pwr-off"
          value={false}
          checked={!power}
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
    </>
  );
};

export default Remote;
