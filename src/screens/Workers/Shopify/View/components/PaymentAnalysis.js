import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

const PaymentAnalysis = ({ conversations }) => {
  let messageCount = 0;

  for (let i = 0; i < conversations.length; i++) {
    const numMessages = conversations[i].chatlog.length;
    messageCount = messageCount + numMessages;
  }

  const paymentAmount = messageCount * 0.06;

  return (
    <Card sx={{ height: '495px' }}>
      <CardHeader title="Payment Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          }}>
          <Typography sx={{ fontSize: 40 }}>{`$${paymentAmount.toFixed(2)}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentAnalysis;

// 0.0600 / 1k tokens
// each call is probably 200 tokens
// each call is $0.012 * 5? = 0.06
