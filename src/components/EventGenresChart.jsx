// src/components/EventGenresChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';

const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.toLowerCase().includes(genre.toLowerCase())
      ).length;
      return { name: genre, value };
    });
    setData(data);
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
