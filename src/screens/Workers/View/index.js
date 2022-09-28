import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const WorkersView = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const workers = useSelector((state) => state.user.workers);
  const worker = workers.filter((w) => w.id === id)[0];

  useEffect(() => {
    if (worker.type === "CHATBOT") {
      navigate(`../../workers/shopify/view${id}`);
    }
  }, [worker, id]);

  return <Box component="main" sx={{ width: "100%", height: "93vh" }}></Box>;
};

export default WorkersView;
