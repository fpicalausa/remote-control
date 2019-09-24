import React, { useState, useEffect } from "react";
import "./App.css";
import Indicator from "./Indicator";
import Remote, { Action, ACTION_PWR, ACTION_MODE } from "./Remote";
import Client, { RemoteState } from "./Client";

const client = new Client();

const App: React.FC = () => {
  const [state, setState] = useState({
    loading: true,
    remote: { power: false, mode: "cooler" } as RemoteState,
    current: { temperature: 29, humidity: 51 }
  });

  const { loading, remote, current } = state;

  useEffect(() => {
    client.state().then(remote =>
      setState(state => ({
        ...state,
        remote,
        loading: false
      }))
    );
  }, []);

  if (loading) {
    return <div>Please wait</div>;
  }

  function onChange({ action, payload }: Action) {
    switch (action) {
      case ACTION_PWR:
        if (payload) {
          client.on();
        } else {
          client.off();
        }

        setState({
          ...state,
          remote: {
            mode: remote.mode,
            power: payload as boolean
          }
        });
        break;
      case ACTION_MODE:
        setState({
          ...state,
          remote: {
            mode: payload as string,
            power: remote.power
          }
        });
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Indicator label="Temperature" value={current.temperature} unit="°C" />
        <Indicator label="Humidity" value={current.humidity} unit="%" />
      </header>
      <main className="App-main">
        <Remote onChange={onChange} state={remote}></Remote>
      </main>
    </div>
  );
};

export default App;
