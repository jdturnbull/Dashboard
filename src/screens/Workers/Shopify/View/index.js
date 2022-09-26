import React, { useState, useEffect } from "react";
import { Card, CardHeader, Box, Tabs, Tab, Button, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import Analytics from "./components/Analytics";
import Conversations from "./components/Conversations";
import Actions from "./components/Actions";
import Configuration from "./components/Configuration";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../../../functions";
import { setup } from "../../../../stores/user";
import config from "../../../../config";

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
  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

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

  return (
    <Box component="main">
      <Card>
        <CardHeader
          title={"Shopify Chatbot"}
          action={
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Analytics" />
              <Tab label="Actions" />
              <Tab label="Conversations" />
              <Tab label="Configuration" />
            </Tabs>
          }
        />
      </Card>
      {/* <Alert severity="warning" sx={{ display: "flex", alignItems: "center" }}>
        You haven't activated the agent yet - when you've finished configuration
        please
        <Button sx={{ marginBottom: "3px" }} onClick={handleDeepLinkPress}>
          Activate
        </Button>
      </Alert> */}
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
  );
};

export default View;
