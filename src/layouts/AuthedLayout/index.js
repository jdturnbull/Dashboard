import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SideBar from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarOpen } from "../../stores/user";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const AuthedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { sideBarOpen } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Container>
      <SideBar
        onClose={() => dispatch(setSideBarOpen(false))}
        open={sideBarOpen}
      />
    </>
  );
};

export default AuthedLayout;

// #111827 - side bar color + top bar color
