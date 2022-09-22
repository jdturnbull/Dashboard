import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Container = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const NavBar = ({ onSidebarOpen }) => {
  return (
    <Container
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: 'calc(100% - 280px)',
        },
      }}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}>
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none',
            },
          }}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
      </Toolbar>
    </Container>
  );
};

export default NavBar;
