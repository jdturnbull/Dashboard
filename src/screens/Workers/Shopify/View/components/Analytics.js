import React from 'react';
import { Box, Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SentimentAnalysis from './SentimentAnalysis';
import ActionAnalysis from './ActionAnalysis';
import UsageAnalysis from './UsageAnalysis';
import PaymentAnalysis from './PaymentAnalysis';

const Analytics = ({ conversations, actions }) => {
  return (
    <PerfectScrollbar>
      <Box>
        <Grid container spacing={3} rowSpacing={5}>
          <Grid item lg={4} md={12} xl={12} xs={12}>
            <SentimentAnalysis conversations={conversations} />
          </Grid>
          <Grid item lg={8} md={12} xl={12} xs={12}>
            <ActionAnalysis actions={actions} />
          </Grid>
          <Grid item lg={8} md={12} xl={12} xs={12}>
            <UsageAnalysis conversations={conversations} />
          </Grid>
          <Grid item lg={4} md={12} xl={12} xs={12}>
            <PaymentAnalysis conversations={conversations} />
          </Grid>
        </Grid>
      </Box>
    </PerfectScrollbar>
  );
};

export default Analytics;
