import React, { useState, useEffect } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    // Populate chart data when events change
    useEffect(() => {
        setData(getData());
    }, [`${events}`]); // stringify dependency so it triggers on changes

    const getData = () => {
        return allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(/, | - /)[0]; // Handles "Berlin, Germany" or "Dubai - UAE"
            return { city, count };
        });
    };


    return (
        <ResponsiveContainer height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: -30,
                }}
            >

                <CartesianGrid />
                <XAxis
                    type="category"
                    dataKey="city"
                    name="City"
                    angle={60}
                    interval={0}
                    tick={{ dx: 20, dy: 40, fontSize: 14 }}
                />
                <YAxis
                    type="number"
                    dataKey="count"
                    name="Number of Events"
                    allowDecimals={false}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Events in City" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;