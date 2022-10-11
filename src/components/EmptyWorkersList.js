import React from "react";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const EmptyWorkersList = ({ handleClick }) => {
  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      sx={{
        width: "80vw",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Grid item>
        <Avatar
          sx={{
            backgroundColor: "secondary.main",
            height: 66,
            width: 66,
          }}
        >
          <HourglassEmptyIcon fontSize="large" />
        </Avatar>
      </Grid>
      <Grid item sx={{ textAlign: "center" }}>
        <Typography color="textPrimary" gutterBottom variant="body1">
          You haven't created any agents!
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Get started in seconds
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="medium"
          sx={{ "&:hover": { backgroundColor: "primary.hover" } }}
          startIcon={<ControlPointOutlinedIcon />}
        >
          New Agent
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmptyWorkersList;
