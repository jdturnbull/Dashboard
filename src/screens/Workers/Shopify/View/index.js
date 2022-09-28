import React, { useState, useEffect } from "react";
import { Box, Button, Alert, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Analytics from "./components/Analytics";
import Conversations from "./components/Conversations";
import Actions from "./components/Actions";
import Configuration from "./components/Configuration";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../../../functions";
import { setup } from "../../../../stores/user";
import { update } from "../../../../stores/shopify";
import NavBar from "../../../../components/NavBar";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const View = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const dispatch = useDispatch();

  const refresh = () => {
    setShouldRefresh(!shouldRefresh);
  };

  const workers = useSelector((state) => state.user.workers);
  const actions = useSelector((state) =>
    state.user.actions.filter((a) => a.chatbotId === id)
  );
  const worker = workers.filter((w) => w.id === id)[0];

  const handleDeepLinkPress = () => {
    window
      .open(
        `https://${worker.storeName}.myshopify.com/admin/themes/current/editor?context=apps`
      )
      .focus();
    dispatch(update({ id: worker.id, data: { addedToTheme: true } }));
    refresh();
  };

  useEffect(() => {
    const get = async () => {
      dispatch(setup());
      const _conversations = await getConversation(id);
      setConversations(
        _conversations.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
    };
    get();
  }, [id, shouldRefresh, dispatch]);

  const TabOption = ({ selected, option, onClick, val }) => {
    const handleClick = () => onClick(val);

    return (
      <Box onClick={handleClick} sx={{ cursor: "default", padding: "0 15px" }}>
        <Typography
          sx={selected ? { color: "#5048E5" } : { color: "#000" }}
          style={{ fontWeight: 500 }}
        >
          {option}
        </Typography>
      </Box>
    );
  };

  const Tabs = () => {
    const handleClick = (v) => {
      setTabValue(v);
    };

    return (
      <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
        <TabOption
          selected={tabValue === 0}
          option={"Analytics"}
          val={0}
          onClick={handleClick}
        />
        <TabOption
          selected={tabValue === 1}
          option={"Actions"}
          val={1}
          onClick={handleClick}
        />
        <TabOption
          selected={tabValue === 2}
          option={"Conversations"}
          val={2}
          onClick={handleClick}
        />
        <TabOption
          selected={tabValue === 3}
          option={"Configuration"}
          val={3}
          onClick={handleClick}
        />
      </Box>
    );
  };

  return (
    <Box component="main">
      <NavBar header={"Your Shopify Chatbot"} Right={Tabs} />
      {!worker.addedToTheme && (
        <Alert
          severity="warning"
          sx={{ display: "flex", alignItems: "center", mt: 2 }}
        >
          You haven't activated the agent yet - when you've finished
          configuration please
          <Button sx={{ marginBottom: "3px" }} onClick={handleDeepLinkPress}>
            Activate
          </Button>
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <TabPanel value={tabValue} index={0}>
          <Analytics
            conversations={conversations}
            refresh={refresh}
            worker={worker}
            actions={actions}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Actions
            conversations={conversations}
            refresh={refresh}
            worker={worker}
            actions={actions}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Conversations
            conversations={conversations}
            refresh={refresh}
            worker={worker}
            actions={actions}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Configuration
            conversations={conversations}
            refresh={refresh}
            worker={worker}
            actions={actions}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default View;
