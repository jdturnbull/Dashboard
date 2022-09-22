import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysis = ({ conversations }) => {
  const theme = useTheme();

  const numPositive = conversations.filter((c) => c.sentiment.trim() === 'POSITIVE').length;
  const numNegative = conversations.filter((c) => c.sentiment.trim() === 'NEGATIVE').length;
  const numNeutral = conversations.filter((c) => c.sentiment.trim() === 'NEUTRAL').length;

  const percentPositive = (numPositive / conversations.length) * 100;
  const percentNeutral = (numNeutral / conversations.length) * 100;
  const percentNegative = (numNegative / conversations.length) * 100;

  const data = {
    datasets: [
      {
        data: [percentPositive.toFixed(0), percentNeutral.toFixed(0), percentNegative.toFixed(0)],
        backgroundColor: ['#2dc937', '#e7b416', '#cc3232'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: ['Positive', 'Neutral', 'Negative'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  const sentiments = [
    {
      title: 'Positive',
      value: percentPositive.toFixed(0),
      icon: SentimentSatisfiedAltIcon,
      color: '#2dc937',
    },
    {
      title: 'Neutral',
      value: percentNeutral.toFixed(0),
      icon: SentimentNeutralIcon,
      color: '#e7b416',
    },
    {
      title: 'Negative',
      value: percentNegative.toFixed(0),
      icon: SentimentVeryDissatisfiedIcon,
      color: '#cc3232',
    },
  ];

  return (
    <Card sx={{ height: '500px' }}>
      <CardHeader title="Sentiment Analysis" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
          }}>
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}>
          {sentiments.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}>
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {isNaN(value) ? '-' : `${value}%`}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
