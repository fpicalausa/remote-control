import React from 'react';
import { History } from './Client';
import './Chart.css';
import moment from 'moment';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const CustomizedAxisTick: React.FC<{
    x: number;
    y: number;
    stroke: any;
    payload: { value: any };
}> = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={-8}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-45)"
            >
                {moment(payload.value * 1000)
                    .local()
                    .format('DD-MM HH:mm')}
            </text>
        </g>
    );
};

const Chart: React.FC<{ history: History }> = ({ history }) => {
    const minTemp = Math.min(...history.map(t => t.temperature));
    const maxTemp = Math.max(...history.map(t => t.temperature));
    const minHumidity = Math.min(...history.map(t => t.humidity));
    const maxHumidity = Math.max(...history.map(t => t.humidity));

    return (
        <ResponsiveContainer className="Chart">
            <LineChart
                data={history.sort((h1, h2) => h1.timestamp - h2.timestamp)}
                margin={{
                    top: 60,
                    left: 10,
                    right: 10,
                }}
            >
                <CartesianGrid strokeDasharray="10 10" strokeOpacity="0.2" />
                <XAxis
                    dataKey="timestamp"
                    minTickGap={0}
                    tickCount={5}
                    tick={CustomizedAxisTick}
                    height={100}
                />
                <YAxis
                    yAxisId="temperature"
                    domain={[minTemp - 2, maxTemp + 2]}
                    label={{
                        value: 'Temperature',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#cf2d2d',
                        style: {
                            textAnchor: 'middle',
                        },
                    }}
                ></YAxis>
                <YAxis
                    yAxisId="humidity"
                    orientation="right"
                    domain={[minHumidity - 2, maxHumidity + 2]}
                    label={{
                        value: 'Humidity',
                        angle: 90,
                        position: 'insideRight',
                        fill: '#7a7391',
                        style: {
                            textAnchor: 'middle',
                        },
                    }}
                />
                <Line
                    yAxisId="temperature"
                    type="monotone"
                    dataKey="temperature"
                    strokeWidth={2}
                    stroke="#cf2d2d"
                    isAnimationActive={false}
                    dot={false}
                />
                <Line
                    yAxisId="humidity"
                    type="monotone"
                    dataKey="humidity"
                    strokeWidth={2}
                    stroke="#7a7391"
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
