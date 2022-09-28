import React from "react";
import { Box } from "@mui/system";
import NavBar from "../../../components/NavBar";
import { Grid } from "@mui/material";
import AgentCard from "../../../components/AgentCard";
import { Engineering } from "@mui/icons-material";

const WorkersViewAll = () => {
  const handleShopifyClick = () => {
    window.open("https://communion-developer.myshopify.com/");
  };

  return (
    <Box component="main" sx={{ width: "100%", height: "93vh" }}>
      <NavBar header={"Agents"} />
      <Grid sx={{ mt: 2, padding: "0 15px" }} container spacing={2}>
        <Grid item lg={6} md={12} xl={12} xs={12}>
          <AgentCard
            label="Shopify Chatbot"
            Icon={Engineering}
            subText={
              "Automate customer support and sales through our intelligent chatbot. Setting up this process is but a few clicks. We can automate customer questions such as 'where's my order' and more. Click on this card to be redirected to our playground, where you'll be able to check out its cabailities."
            }
            onClick={handleShopifyClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkersViewAll;
