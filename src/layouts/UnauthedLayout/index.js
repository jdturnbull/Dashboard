import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from './components/NavBar';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

const UnauthedLayout = ({ children }) => {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}>
          {children}
        </Box>
      </Container>
      <NavBar />
    </>
  );
};

export default UnauthedLayout;

// #111827 - side bar color + top bar color
