import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import useWindowDimensions from "../hooks/useWindowDimensions";
import EngineeringIcon from "@mui/icons-material/Engineering";

const styles = (theme) => {
  return {
    card: {
      height: "100%",
      backgroundColor: "#00000008",
      border: "1px solid #00000010",
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
        cursor: "pointer",
      },
    },
  };
};

const WorkerCard = (props) => {
  const { worker } = props;

  const [showIcon, setShowIcon] = useState(true);
  const { width } = useWindowDimensions();

  const handleClick = () => {
    props.onClick(worker.id);
  };

  useEffect(() => {
    if (width < 600) {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
  }, [width]);

  return (
    <Card className={props.classes.card} onClick={handleClick}>
      <CardContent>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Agent
            </Typography>
            <Typography color="textPrimary" variant="h6">
              Shopify Chatbot
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {worker.storeName}
            </Typography>
          </Grid>
          {showIcon && (
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  height: 46,
                  width: 46,
                }}
              >
                <EngineeringIcon />
              </Avatar>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(WorkerCard);
