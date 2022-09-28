import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkerCard from "./WorkerCard";
import WorkerListAddNewWorker from "./WorkerListAddNew";
import EmptyWorkerList from "./EmptyWorkerList";

const WorkerList = (props) => {
  const { workers, screen } = props;

  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate("workers/create");
  };

  const handleWorkerClick = (id) => {
    if (screen === "dashboard") {
      navigate(`workers/view${id}`);
    }
  };

  return (
    <Box>
      {workers.length === 0 && (
        <WorkerListAddNewWorker handleClick={handleNewClick} />
      )}
      {workers.length === 0 && screen !== "dashboard" && <EmptyWorkerList />}
      {workers.length !== 0 && (
        <Grid
          container
          spacing={2}
          sx={{ paddingLeft: "20px", width: "100%", border: "1px solid red" }}
        >
          {workers.map((worker) => {
            return (
              <Grid key={worker.id} item lg={6} md={12} xl={12} xs={12}>
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onClick={handleWorkerClick}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default WorkerList;
