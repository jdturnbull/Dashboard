import React from 'react';
import { Card, Box, CardHeader, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import WorkerList from '../../components/WorkerList';

const Dashboard = () => {
  const workers = useSelector((state) => state.user.workers);

  return (
    <Box component="main">
      <Card>
        <CardHeader title="Active Agents" />
      </Card>
      <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <WorkerList workers={workers} screen={'dashboard'} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
