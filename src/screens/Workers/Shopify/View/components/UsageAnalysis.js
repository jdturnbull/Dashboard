import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const week_dates = [];

const currentDate = moment();
const weekStart = currentDate.clone().startOf('week');

for (let i = 0; i <= 6; i++) {
  week_dates.push(moment(weekStart).add(i, 'days'));
}

export const options = {
  responsive: true,
  ticks: {
    precision: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = week_dates.map((d) => d.format('dddd'));

const UsageAnalysis = ({ conversations }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Conversations',
        data: labels.map((date) => {
          const m = week_dates.filter((d) => d.format('dddd') === date)[0];
          return conversations.filter((c) => moment(c.createdAt).isSame(m, 'day')).length;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Card>
      <CardHeader title="Weekly Usage" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
          }}>
          <Line options={options} data={data} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UsageAnalysis;
