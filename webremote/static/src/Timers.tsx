import React, { useState } from "react";
import {
  remove as removeTimer,
  add as addTimer,
  update as updateTimer
} from "./TimersReducer";
import Client, {
  TimerAndTid,
  TimerCommand,
  Timer,
  Modes,
  FanSpeeds
} from "./Client";
import Remote from "./Remote";
import "./Timers.css";

const ModeIcon = ({ mode }: { mode: Modes }) => {
  switch (mode) {
    case "heater":
      return <i className="far fa-sun"></i>;
    case "cooler":
      return <i className="far fa-snowflake"></i>;
    case "fan":
      return <i className="fas fa-fan small"></i>;
    case "dry":
      return <i className="timer-icon">D</i>;
    default:
      return <i className="timer-icon">A</i>;
  }
};

const FanIcon = ({ fan }: { fan: FanSpeeds }) => {
  switch (fan) {
    case "low":
      return <i className="fas fa-fan small"></i>;
    case "high":
      return <i className="fas fa-fan"></i>;
    case "quiet":
      return <i className="fas fa-volume-mute"></i>;
    case "natural":
      return <i className="fas fa-tree"></i>;
    default:
      return <i className="timer-icon">A</i>;
  }
};

const Command: React.FC<{ command: TimerCommand }> = ({ command }) => {
  if (command.on_off === "off") {
    return <i className="fas fa-toggle-off" />;
  }

  return (
    <>
      <span className="Temperature">{command.temperature}℃</span>
      <span className="Icon">
        <i className="fas fa-toggle-on"></i>
      </span>
      <span className="Icon">
        <ModeIcon mode={command.mode} />
      </span>
      <span className="Icon">
        <FanIcon fan={command.fan} />
      </span>
    </>
  );
};

const timerDefault: Timer = {
  enabled: true,
  time: "01:00",
  command: { on_off: "off", temperature: 22, fan: "auto", mode: "auto" }
};

function splitTime(time: string): [Number, Number] {
  const parts = time.split(":").map(Number);
  if (parts.length !== 2) {
    return [8, 30];
  }

  const [hour, min] = parts;
  return [hour, min];
}

const TimerEdit: React.FC<{
  value: Timer;
  onSave: (timer: Timer) => void;
  onCancel: () => void;
  onDelete?: () => void;
}> = ({ value, onSave, onCancel, onDelete }) => {
  const [timer, setTimer] = useState<Timer>(value);
  const [[hour, min], setTime] = useState<[Number, Number]>(
    splitTime(value.time)
  );

  const setTimerCommand = (cmd: TimerCommand) => {
    const newTimer: Timer = {
      ...timer,
      command: cmd
    };
    setTimer(newTimer);
  };

  return (
    <div className="TimerEditor">
      <div className="TimeInput">
          <input
            type="text"
            placeholder="06"
            value={'' + hour}
            onChange={e => {
              const newTime: [Number, Number] = [Number(e.target.value), min];
              setTime(newTime);
              setTimer({ ...timer, time: newTime.join(":") });
            }}
          />&nbsp;:&nbsp;
          <input
            type="text"
            value={'' + min}
            placeholder="30"
            onChange={e => {
              const newTime: [Number, Number] = [hour, Number(e.target.value)];
              setTime(newTime);
              setTimer({ ...timer, time: newTime.join(":") });
            }}
          />
      </div>

      <Remote
        state={{
          power: timer.command.on_off === "on",
          fan_speed: timer.command.fan,
          mode: timer.command.mode,
          temperature: timer.command.temperature
        }}
        onPowerChange={pwr =>
          setTimerCommand({
            ...timer.command,
            on_off: pwr ? "on" : "off"
          })
        }
        onFanSpeedChange={fan =>
          setTimerCommand({
            ...timer.command,
            fan
          })
        }
        onModeChange={mode =>
          setTimerCommand({
            ...timer.command,
            mode
          })
        }
        onTemperatureChange={temperature =>
          setTimerCommand({
            ...timer.command,
            temperature
          })
        }
      />

      <div className="Timers-Action">
        <button onClick={() => onSave(timer)}>Save</button>
        {onDelete && <button onClick={() => onDelete()}>Delete</button>}
        <button onClick={() => onCancel()}>Close</button>
      </div>
    </div>
  );
};

type TimersViewState =
  | { view: "list" }
  | { view: "new" }
  | { view: "edit"; timer: TimerAndTid };

const Timers: React.FC<{
  client: Client;
  dispatch: any;
  timers: TimerAndTid[];
}> = ({ client, dispatch, timers }) => {
  const [editState, setEditState] = useState<TimersViewState>({ view: "list" });

  if (editState.view === "new") {
    return (
      <TimerEdit
        value={timerDefault}
        onSave={timer => {
          dispatch(addTimer(client, timer));
          setEditState({ view: "list" });
        }}
        onCancel={() => setEditState({ view: "list" })}
      />
    );
  }

  if (editState.view === "edit") {
    return (
      <TimerEdit
        value={editState.timer}
        onSave={timer => {
          dispatch(updateTimer(client, timer, editState.timer.tid));
          setEditState({ view: "list" });
        }}
        onCancel={() => setEditState({ view: "list" })}
        onDelete={() => {
          dispatch(removeTimer(client, editState.timer.tid));
          setEditState({ view: "list" });
        }}
      />
    );
  }

  return (
    <>
      <div className="Timers-Action">
        <button
          className="Timers-Action"
          onClick={() => setEditState({ view: "new" })}
        >
          Add a timer
        </button>
      </div>
      <ul className="Timers">
        {timers.map(timer => (
          <li key={timer.tid}>
            <button
              className="edit"
              onClick={e => {
                setEditState({ view: "edit", timer: timer });
              }}
            >
              <span className="Timers-Time">{timer.time}</span>
              <span className="Timers-Command">
                <Command command={timer.command} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Timers;
