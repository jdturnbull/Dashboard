import React from "react";
import { CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkerCard from "./WorkerCard";
import WorkerListAddNewWorker from "./WorkerListAddNew";
import EmptyWorkerList from "./EmptyWorkerList";
import AddNewWorker from "./AddNewWorker";

const WorkerList = (props) => {
  const { workers, screen } = props;

  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate("/workers/shopify/create");
  };

  const handleWorkerClick = (id) => {
    if (screen === "dashboard") {
      navigate(`workers/shopify/view${id}`);
    }
  };

  return (
    <CardContent sx={{ mt: 2 }}>
      {workers.length === 0 && screen === "dashboard" && (
        <WorkerListAddNewWorker handleClick={handleNewClick} />
      )}
      {workers.length === 0 && screen !== "dashboard" && <EmptyWorkerList />}
      {workers.length !== 0 && (
        <Grid container spacing={3} sx={{ paddingLeft: "20px" }}>
          {workers.map((worker) => {
            return (
              <Grid key={worker.id} item lg={5} md={12} xl={12} xs={12}>
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onClick={handleWorkerClick}
                />
              </Grid>
            );
          })}
          <Grid item lg={5} md={12} xl={12} xs={12}>
            <AddNewWorker />
          </Grid>
        </Grid>
      )}
    </CardContent>
  );
};

export default WorkerList;
