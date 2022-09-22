import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

const Container = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const NavBar = (props) => {
  return (
    <Container>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}></Toolbar>
    </Container>
  );
};

export default NavBar;
