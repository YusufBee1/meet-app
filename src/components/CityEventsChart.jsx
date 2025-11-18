import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  const getData = () => {
    if (!allLocations || !Array.isArray(allLocations)) return [];
    if (!events || !Array.isArray(events)) return [];

    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, count };
    });
  };

  useEffect(() => {
    setData(getData());
  }, [allLocations, events]);

  return (
    <ResponsiveContainer height={300} width="99%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" />
        <YAxis type="number" dataKey="count" name="Events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
