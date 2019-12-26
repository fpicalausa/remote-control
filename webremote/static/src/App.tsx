import React, { useState, useEffect } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';
import Tabs from './Tabs';
import './App.css';
import Indicator from './Indicator';
import Remote from './Remote';
import Client, {
    RemoteMode,
    START_STATE,
    RemoteFanSpeed,
    CurrentCondition,
    History,
} from './Client';
import Drawer from './Drawer';
import Chart from './Chart';
import { reducer, INITIAL_SATE, fetch as fetchTimers } from './TimersReducer';
import Timers from './Timers';

const client = new Client();

const App: React.FC = () => {
    const [remoteState, setRemoteState] = useState(START_STATE);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState<null | CurrentCondition>(null);
    const [history, setHistory] = useState<History>([]);
    const [timers, dispatch] = useThunkReducer(reducer, INITIAL_SATE)

    useEffect(() => {
        async function get_history() {
            const history = await client.history();
            setHistory(history);
        }

        get_history();
    }, []);

    useEffect(() => {
        dispatch(fetchTimers(client));
    }, [dispatch])

    useEffect(() => {
        client.state().then(remote => {
            setRemoteState(remote);

            client.sensor().then(condition => {
                setCurrent(condition);
            });

            setLoading(false);
        });
    }, []);

    function onPowerChange(power: boolean) {
        if (power) {
            client.on();
        } else {
            client.off();
        }

        setRemoteState(state => ({
            ...state,
            power,
        }));
    }

    function onModeChange(mode: RemoteMode) {
        client.mode(mode);

        setRemoteState(state => ({
            ...state,
            mode,
        }));
    }

    function onSpeedChange(speed: RemoteFanSpeed) {
        client.fan(speed);

        setRemoteState(state => ({
            ...state,
            fan_speed: speed,
        }));
    }

    function onTemperatureChange(temperature: number) {
        client.temperature(temperature);

        setRemoteState(state => ({
            ...state,
            temperature: temperature,
        }));
    }

    if (loading) {
        return <div>Please wait</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="Indicators">
                    <Indicator
                        label="Temperature"
                        value={current ? current.temperature : 'N/A'}
                        unit="°C"
                    />
                    <Indicator
                        label="Humidity"
                        value={current ? current.humidity : 'N/A'}
                        unit="%"
                    />
                </div>
            </header>
            <main className="App-main">
                <Drawer>
                    {history.length === 0 ? (
                        'Collecting data...'
                    ) : (
                            <Chart history={history} />
                        )}
                </Drawer>
                <Tabs className="side-tabs">
                    <Tabs.Tab label={<><i className="fas fa-broadcast-tower"></i></>}>
                        <h1>Remote</h1>
                        <Remote
                            onPowerChange={onPowerChange}
                            onModeChange={onModeChange}
                            onFanSpeedChange={onSpeedChange}
                            onTemperatureChange={onTemperatureChange}
                            state={remoteState}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab label={<><i className="far fa-clock" /></>}>
                        <h1>Timers</h1>
                        {
                            timers.state === 'loaded'
                                ? <Timers client={client} dispatch={dispatch} timers={timers.timers} />
                                : "Loading..."
                        }
                    </Tabs.Tab>
                </Tabs>

            </main>
        </div>
    );
};

export default App;
