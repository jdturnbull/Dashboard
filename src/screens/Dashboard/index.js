import React from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import DashboardWorkerList from "../../components/DashboardWorkerList";

const Dashboard = () => {
  const workers = useSelector((state) => state.user.workers);
  const navigate = useNavigate();

  const handleNewAgentClick = () => navigate("workers/create");

  const NewAgent = () => {
    return (
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="contained"
        sx={{
          "&:hover": { backgroundColor: "primary.hover" },
        }}
        onClick={handleNewAgentClick}
      >
        New Agent
      </Button>
    );
  };

  return (
    <Box component="main" sx={{ width: "100%", height: "93vh" }}>
      <NavBar header={"Dashboard"} Right={NewAgent} />
      <DashboardWorkerList workers={workers} />
    </Box>
  );
};

export default Dashboard;
