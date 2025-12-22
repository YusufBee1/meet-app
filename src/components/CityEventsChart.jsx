import React, { useState, useEffect } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events]); // FIXED: Using direct object comparison instead of string coercion

    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(/, | - /)[0];
            return { city, count };
        });
        return data;
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