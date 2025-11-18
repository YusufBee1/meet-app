import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

  const getData = () => {
    if (!events || !Array.isArray(events)) return [];

    return genres.map((genre) => {
      const count = events.filter((event) =>
        event.summary && event.summary.includes(genre)
      ).length;

      return { name: genre, value: count };
    });
  };

  useEffect(() => {
    setData(getData());
  }, [events]);

  const COLORS = ['#ff4444', '#ffbb33', '#00C49F', '#0088FE', '#aa66cc'];

  return (
    <ResponsiveContainer height={300} width={300}>
      <PieChart>
        <Pie
          data={data}
          cx={150}
          cy={150}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
