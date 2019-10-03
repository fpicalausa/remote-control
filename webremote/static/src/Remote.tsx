import React, { useState } from 'react';
import './Remote.css';
import Toggle from './Toggle';
import { RemoteMode, RemoteFanSpeed, RemoteState } from './Client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const ACTION_PWR = 'power';
export const ACTION_MODE = 'mode';

const Remote: React.FC<{
    onPowerChange: (power: boolean) => void;
    onModeChange: (mode: RemoteMode) => void;
    onFanSpeedChange: (fan_speed: RemoteFanSpeed) => void;
    onTemperatureChange: (temperature: number) => void;
    state: RemoteState;
}> = ({
    onPowerChange,
    onModeChange,
    onFanSpeedChange,
    onTemperatureChange,
    state,
}) => {
    const { power, mode, fan_speed, temperature } = state;
    const minTemp = mode === 'heater' ? 20 : 22;
    const maxTemp = 30;
    const [current_temperature, setTemperatureState] = useState(temperature);

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
                    value={'auto'}
                    checked={mode === 'auto'}
                    onChange={onModeChange}
                >
                    Auto
                </Toggle.Button>
                <Toggle.Button
                    id="mode-cooler"
                    value={'cooler'}
                    checked={mode === 'cooler'}
                    onChange={onModeChange}
                >
                    <i className="far fa-snowflake"></i>
                </Toggle.Button>
                <Toggle.Button
                    id="mode-heater"
                    value={'heater'}
                    checked={mode === 'heater'}
                    onChange={onModeChange}
                >
                    <i className="fas fa-sun"></i>
                </Toggle.Button>
                <Toggle.Button
                    id="mode-dry"
                    value={'dry'}
                    checked={mode === 'dry'}
                    onChange={onModeChange}
                >
                    Dry
                </Toggle.Button>
                <Toggle.Button
                    id="mode-fan"
                    value={'fan'}
                    checked={mode === 'fan'}
                    onChange={onModeChange}
                >
                    <i className="fas fa-fan small"></i>
                </Toggle.Button>
            </Toggle>

            <Toggle className="Option-row">
                <Toggle.Button
                    id="speed-auto"
                    value={'auto'}
                    checked={fan_speed === 'auto'}
                    onChange={onFanSpeedChange}
                >
                    Auto
                </Toggle.Button>
                <Toggle.Button
                    id="speed-high"
                    value={'high'}
                    checked={fan_speed === 'high'}
                    onChange={onFanSpeedChange}
                >
                    <i className="fas fa-fan"></i>
                </Toggle.Button>
                <Toggle.Button
                    id="speed-low"
                    value={'low'}
                    checked={fan_speed === 'low'}
                    onChange={onFanSpeedChange}
                >
                    <i className="fas fa-fan small"></i>
                </Toggle.Button>
                <Toggle.Button
                    id="speed-quiet"
                    value={'quiet'}
                    checked={fan_speed === 'quiet'}
                    onChange={onFanSpeedChange}
                >
                    <i className="fas fa-volume-mute"></i>
                </Toggle.Button>
                <Toggle.Button
                    id="speed-natural"
                    value={'natural'}
                    checked={fan_speed === 'natural'}
                    onChange={onFanSpeedChange}
                >
                    <i className="fas fa-tree"></i>
                </Toggle.Button>
            </Toggle>

            <div className="Option-row Option-row_slider">
                <Slider
                    min={minTemp}
                    max={maxTemp}
                    value={current_temperature}
                    onChange={setTemperatureState}
                    onAfterChange={onTemperatureChange}
                    trackStyle={{ backgroundColor: 'transparent', height: 6 }}
                    railStyle={{
                        backgroundColor: '#106d82',
                        height: 6,
                    }}
                    handleStyle={{
                        border: '1px solid #106d82',
                        height: 20,
                        width: 20,
                        marginLeft: 0,
                        marginTop: -7,
                        backgroundColor: 'white',
                    }}
                />
                <div className="Target-temperature">
                    {current_temperature}°C
                </div>
            </div>
        </>
    );
};

export default Remote;
