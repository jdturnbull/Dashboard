import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const AgentCard = (props) => {
  const { label, subText, Icon, onClick } = props;
  const [showIcon, setShowIcon] = useState(true);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { width } = useWindowDimensions();

  const handleClick = () => {
    if (!props.beta) {
      onClick(label);
    } else {
      setSnackBarOpen(true);
    }
  };

  useEffect(() => {
    if (width < 600) {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
  }, [width]);

  const closeSnack = () => {
    setSnackBarOpen(false);
  };

  return (
    <>
      <Card className={props.classes.card} onClick={handleClick}>
        <CardContent>
          <Grid container sx={{ width: "100%", height: "100%" }}>
            <Grid item lg={12}>
              <Box sx={{ display: "flex" }}>
                <Typography color="textPrimary" variant="h6" sx={{ flex: 1 }}>
                  {label}
                </Typography>
                {showIcon && (
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundColor: "primary.main",
                        height: 36,
                        width: 36,
                      }}
                    >
                      {<Icon />}
                    </Avatar>
                  </Grid>
                )}
              </Box>
              <Typography color="textPrimary" variant="body1">
                {subText}
              </Typography>
              {props.beta && (
                <Typography variant="body2" sx={{ color: "#00000050" }}>
                  (Under Development)
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={closeSnack}
      >
        <Alert severity="error">
          Sorry, this agent is currently under development!
        </Alert>
      </Snackbar>
    </>
  );
};

export default withStyles(styles)(AgentCard);
