import React from 'react';
import { Box, Grid, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

const labels = ['Returns', 'Cancellations', 'Missing', 'Damaged'];

const label_map = {
  Returns: 'RETURN AN ITEM',
  Cancellations: 'CANCEL AN ORDER',
  Missing: 'ITEM NEVER ARRIVED',
  Damaged: 'ITEM DAMAGED',
};

const ActionAnalysis = ({ actions }) => {
  const incompleteActions = actions.filter((a) => !a.archived);

  return (
    <Card sx={{ height: '500px' }}>
      <CardHeader title="Action Items" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {labels.map((label) => {
            return (
              <Grid key={label} item lg={6} md={12} xl={12} xs={12}>
                <Card sx={{ backgroundColor: '#00000005' }}>
                  <CardHeader title={label} />
                  <CardContent sx={{ pt: 0 }}>
                    <Typography sx={{ fontSize: 20 }}>
                      {incompleteActions.filter((a) => a.type === label_map[label] && a.merchantRequired).length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActionAnalysis;
