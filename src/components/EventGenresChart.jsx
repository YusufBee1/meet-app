import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const [outerRadius, setOuterRadius] = useState(getResponsiveRadius());

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    function getResponsiveRadius() {
        const width = window.innerWidth;
        if (width <= 360) return 50;
        if (width <= 375) return 50;
        if (width <= 400) return 80;
        if (width <= 420) return 90;
        return 130;
    }

    useEffect(() => {
        const getData = () => {
            return genres.map((genre) => {
                const filteredEvents = events.filter(
                    (event) => event.summary && event.summary.includes(genre)
                );
                return { name: genre, value: filteredEvents.length };
            });
        };
        setData(getData());
    }, [events]);

    useEffect(() => {
        const handleResize = () => setOuterRadius(getResponsiveRadius());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1;

        return percent > 0 ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={11}
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div className="genre-chart-wrapper">
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={outerRadius}
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;