import React from 'react';
import { CardHeader, Box, Card, Divider, Typography, CardContent, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setup } from '../../stores/user';

const Pending = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const email = searchParams.get('email');
  const firstName = searchParams.get('firstName');
  const token = searchParams.get('token');

  if (token) {
    window.localStorage.setItem('token', token);
    dispatch(setup());
    window.open('http://localhost:3000', '_self');
  }

  return (
    <Box sx={{ display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: 500, height: 500 }}>
        <CardHeader title="Verify your email" />
        <Divider />

        <CardContent>
          <Typography sx={{ fontWeight: 400, fontSize: '20px' }}>{`👋 Hey there,`}</Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '15px',
              color: '#00000090',
              marginTop: '20px',
            }}>{`We've sent an email to ${email}. Please click the email link to complete your sign in.`}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <CircularProgress size={50} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Pending;
