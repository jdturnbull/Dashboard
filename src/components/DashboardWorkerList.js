import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmptyWorkersList from "./EmptyWorkersList";
import WorkerCard from "./WorkerCard";

const DashboardWorkerList = (props) => {
  const { workers } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("workers/create");
  };

  const WorkerList = ({ workers }) => {
    const handleWorkerClick = (id) => {
      navigate(`workers/view${id}`);
    };

    return (
      <Grid container spacing={2}>
        {workers.map((worker) => {
          return (
            <Grid key={worker.id} item lg={4} md={12} xl={12} xs={12}>
              <WorkerCard
                key={worker.id}
                worker={worker}
                onClick={handleWorkerClick}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        padding: "0px 15px",
        mt: 5,
      }}
    >
      {workers.length === 0 ? (
        <EmptyWorkersList handleClick={handleClick} />
      ) : (
        <WorkerList workers={workers} />
      )}
    </Box>
  );
};

export default DashboardWorkerList;
