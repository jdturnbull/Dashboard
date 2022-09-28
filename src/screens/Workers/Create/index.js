import React from "react";
import { Box, Grid } from "@mui/material";
import NavBar from "../../../components/NavBar";
import AgentCard from "../../../components/AgentCard";
import { useNavigate } from "react-router-dom";
import { Engineering } from "@mui/icons-material";

const WorkerCreate = () => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    if (label === "Shopify") {
      navigate("../../workers/shopify/create");
    }
  };

  return (
    <Box component="main" sx={{ width: "100%", height: "93vh" }}>
      <NavBar header={"Select an Agent"} />
      <Grid sx={{ mt: 2, padding: "0 15px" }} container spacing={2}>
        <Grid item lg={4} md={12} xl={12} xs={12}>
          <AgentCard
            label={"Shopify"}
            subText={"Automate sales and support"}
            onClick={handleClick}
            Icon={Engineering}
          />
        </Grid>
        <Grid item lg={4} md={12} xl={12} xs={12}>
          <AgentCard
            label={"Copy Generator"}
            subText={"Use AI to generate copy for SEO"}
            onClick={handleClick}
            beta={true}
            Icon={Engineering}
          />
        </Grid>
        <Grid item lg={4} md={12} xl={12} xs={12}>
          <AgentCard
            label={"Document Extraction"}
            subText={"SQL queries from natural language"}
            onClick={handleClick}
            beta={true}
            Icon={Engineering}
          />
        </Grid>
        <Grid item lg={4} md={12} xl={12} xs={12}>
          <AgentCard
            label={"API Integrator"}
            subText={"Automate API integrations"}
            onClick={handleClick}
            beta={true}
            Icon={Engineering}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkerCreate;
