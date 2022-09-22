import React from 'react';
import { Grid, Typography } from '@mui/material';

const EmptyWorkerList = ({ handleClick }) => {
  return (
    <Grid container direction={'column'} rowSpacing={2} sx={{ alignItems: 'center', marginTop: '50px' }}>
      <Grid item sx={{ textAlign: 'center' }}>
        <Typography color="textPrimary" gutterBottom variant="h6">
          No available agents
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          You have all available agents active already
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyWorkerList;
