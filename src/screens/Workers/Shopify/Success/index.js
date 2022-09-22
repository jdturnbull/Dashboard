import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CreateSuccess = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
      }}>
      <Card sx={{ padding: '20px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: '100px', marginBottom: '20px' }} />
          <Typography variant={'h5'} sx={{ marginBottom: '20px' }}>
            Success!
          </Typography>
          <Typography variant={'body2'}>Head to the dashboard to configure your agent</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSuccess;
