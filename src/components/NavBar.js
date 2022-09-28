import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { setSideBarOpen } from "../stores/user";
import { useDispatch } from "react-redux";

const Container = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const NavBar = ({ header, Right }) => {
  const dispatch = useDispatch();

  const onSidebarOpen = () => {
    dispatch(setSideBarOpen(true));
  };

  return (
    <Container
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100% - 280px)",
        },
        minHeight: {
          lg: 80,
        },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          left: 0,
          px: 2,
          height: 80,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: "#000" }}>
            {header}
          </Typography>
        </Box>
        {Right && <Right />}
      </Toolbar>
    </Container>
  );
};

export default NavBar;
