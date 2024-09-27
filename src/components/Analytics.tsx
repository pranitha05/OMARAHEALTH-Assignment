import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsProps {
  users: User[];
}

const Analytics: React.FC<AnalyticsProps> = ({ users }) => {
  // Function to group users by the date they were created
  const groupByDate = (users: User[]) => {
    const userCounts: { [key: string]: number } = {};

    users.forEach(user => {
      const date = new Date(user.createdAt).toLocaleDateString();
      userCounts[date] = (userCounts[date] || 0) + 1;
    });

    return Object.entries(userCounts).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const data = groupByDate(users);

  return (
    <div className="mt-4">
      <h2>Analytics</h2>
      
      <h3>Accounts Created Per Day</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Analytics;
