// src/components/CityEventsChart.jsx
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';

const CityEventsChart = ({ allEvents }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const cityCount = {};
      allEvents.forEach((event) => {
        const city = event.location.split(', ')[0];
        cityCount[city] = (cityCount[city] || 0) + 1;
      });
      return Object.entries(cityCount).map(([city, count]) => ({ city, count }));
    };

    setData(getData());
  }, [allEvents]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <XAxis type="category" dataKey="city" name="City" />
        <YAxis type="number" dataKey="count" name="Number of Events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
