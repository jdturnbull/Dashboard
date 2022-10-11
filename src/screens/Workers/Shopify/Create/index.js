import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { integrate } from "../../../../stores/shopify";
import NavBar from "../../../../components/NavBar";

const Stage0 = ({ description, setDescription, handleNext }) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", width: "70%" }} item>
      <TextField
        sx={{ marginBottom: "10px" }}
        label="Describe your company, the more detail the better"
        multiline={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleNext}
          variant="contained"
          sx={{
            color: "main.primary",
            "&:hover": { backgroundColor: "primary.hover" },
          }}
        >
          Next
        </Button>
      </div>
    </Grid>
  );
};

const Stage1 = ({ storeName, setStoreName, handleClick }) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", width: "70%" }} item>
      <TextField
        sx={{ marginBottom: "10px" }}
        label="Shopify store name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            color: "main.primary",
            "&:hover": { backgroundColor: "primary.hover" },
          }}
        >
          Integrate
        </Button>
      </div>
    </Grid>
  );
};

const Create = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);

  const [stage, setStage] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => setStage(stage + 1);

  const handleSelectedClick = async (props) => {
    dispatch(
      integrate({
        email: session.email,
        shop: storeName,
        description,
      })
    );
  };

  return (
    <Box component="main" sx={{ width: "100%", height: "93vh" }}>
      <NavBar header={"Create Your Shopify Chatbot"} />
      <Box sx={{ mt: 5, padding: "0 15px" }}>
        {stage === 0 && (
          <Stage0
            description={description}
            setDescription={setDescription}
            handleNext={handleNext}
          />
        )}
        {stage === 1 && (
          <Stage1
            storeName={storeName}
            setStoreName={setStoreName}
            handleClick={handleSelectedClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default Create;
