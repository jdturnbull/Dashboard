import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

const AuthedLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
      <NavBar onSidebarOpen={() => setSidebarOpen(true)} />
      <SideBar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

export default AuthedLayout;

// #111827 - side bar color + top bar color
