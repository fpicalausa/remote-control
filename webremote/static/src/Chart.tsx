import React, { useEffect, useRef, useState } from 'react';
import { History, Condition } from './Client';
import './Chart.css';
import * as d3 from 'd3';

const Chart: React.FC<{ history: History }> = ({ history: full_history }) => {
    const d3Container = useRef(null);
    const [timeSpan, setTimeSpan] = useState(24 * 3600);

    useEffect(() => {
        const cutoff = new Date().getTime() / 1000 - timeSpan;
        const history = full_history
            .filter(h => h.timestamp >= cutoff)
            .sort((h1, h2) => h1.timestamp - h2.timestamp);
        const minTemp = Math.min(...history.map(t => t.temperature)) - 2;
        const maxTemp = Math.max(...history.map(t => t.temperature)) + 2;
        const minHumidity = Math.min(...history.map(t => t.humidity)) - 5;
        const maxHumidity = Math.max(...history.map(t => t.humidity)) + 5;
        const minDate = Math.min(...history.map(t => t.timestamp));
        const maxDate = Math.max(...history.map(t => t.timestamp));
        const margin = { top: 20, right: 100, bottom: 100, left: 100 },
            width = 600 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        d3.select(d3Container.current)
            .select('*')
            .remove();

        const svg = d3
            .select(d3Container.current)
            .attr(
                'viewBox',
                `0 0 ${width + margin.left + margin.right} ${height +
                    margin.top +
                    margin.bottom}`
            )
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const humidityScale = d3
            .scaleLinear()
            .domain([minHumidity, maxHumidity])
            .range([height, 0]);

        const temperatureScale = d3
            .scaleLinear()
            .domain([minTemp, maxTemp])
            .range([height, 0]);

        const timeScale = d3
            .scaleTime()
            .domain([new Date(minDate * 1000), new Date(maxDate * 1000)])
            .range([0, width]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .attr('class', 'axis')
            .style('text-anchor', 'end')
            .call(d3.axisBottom(timeScale))
            .selectAll('text')
            .attr('transform', 'translate(-10,10)rotate(-45)');
        svg.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(temperatureScale).ticks(7));
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${width},0)`)
            .call(d3.axisRight(humidityScale).ticks(5));

        const path1 = d3
            .line<Condition>()
            .x(h => timeScale(new Date(h.timestamp * 1000)))
            .y(h => temperatureScale(h.temperature));
        svg.append('path')
            .datum(history)
            .attr('class', 'Chart_ts-1')
            .attr('d', path1);

        const path2 = d3
            .line<Condition>()
            .x(h => timeScale(new Date(h.timestamp * 1000)))
            .y(h => humidityScale(h.humidity));
        svg.append('path')
            .datum(history)
            .attr('class', 'Chart_ts-2')
            .attr('d', path2);

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('font-size', '30px')
            .attr('y', -margin.left + 40)
            .attr('x', -height / 2)
            .attr('fill', 'red')
            .text('Temperature');

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(90)')
            .attr('font-size', '30px')
            .attr('y', -width - margin.right + 40)
            .attr('x', height / 2)
            .attr('fill', 'steelblue')
            .text('Humidity');
    }, [full_history, timeSpan]);

    return (
        <>
            <svg className="Chart" ref={d3Container} />
            <div className="Chart">
                <button onClick={() => setTimeSpan(6 * 3600)}>6h</button>
                <button onClick={() => setTimeSpan(24 * 3600)}>1d</button>
                <button onClick={() => setTimeSpan(2 * 24 * 3600)}>2d</button>
                <button onClick={() => setTimeSpan(7 * 24 * 3600)}>1w</button>
            </div>
        </>
    );
};

export default Chart;
