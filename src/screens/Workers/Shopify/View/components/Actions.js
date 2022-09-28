import React, { useEffect, useState } from "react";
import {
  Box,
  CardHeader,
  Card,
  CardContent,
  Typography,
  Table,
  TableRow,
  Divider,
  TableCell,
  TableHead,
  Modal,
  Fade,
  TableBody,
  Grid,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { resolve } from "../../../../../stores/shopify";

const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Chatlog = ({ log }) => {
  return (
    <PerfectScrollbar>
      <Box sx={{ height: "300px", overflowY: "scroll" }}>
        {log.map((c, i) => {
          if (c.AI) {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <Box
                  key={i}
                  sx={{
                    backgroundColor: "primary.main",
                    padding: "5px 15px",
                    borderRadius: "10px",
                    maxWidth: "70%",
                  }}
                >
                  <Typography sx={{ color: "#fff" }}>{c.AI}</Typography>
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <Box
                  key={i}
                  sx={{
                    backgroundColor: "#00000010",
                    padding: "5px 15px",
                    borderRadius: "10px",
                    maxWidth: "70%",
                  }}
                >
                  <Typography>{c.Customer}</Typography>
                </Box>
              </Box>
            );
          }
        })}
      </Box>
    </PerfectScrollbar>
  );
};

const ModalComponent = ({
  open,
  handleClose,
  action,
  resolve,
  conversation,
}) => {
  const handleResolve = () => resolve(action.id);

  if (action) {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card sx={style}>
            <CardHeader
              title={action.type}
              action={
                <Button variant="outlined" onClick={handleResolve}>
                  Resolve
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {action.orderNumber && (
                  <Grid item lg={4} md={12} xl={12} xs={12}>
                    <Typography sx={{ fontWeight: 500 }}>
                      Order Number
                    </Typography>
                    <Typography>{action.orderNumber}</Typography>
                  </Grid>
                )}
                {action.email && (
                  <Grid item lg={4} md={12} xl={12} xs={12}>
                    <Typography>Email</Typography>
                    <Typography>{action.email}</Typography>
                  </Grid>
                )}
                <Grid item lg={6} md={12} xl={12} xs={12}>
                  <Typography sx={{ fontWeight: 500 }}>Sentiment</Typography>
                  <Typography>{conversation.sentiment}</Typography>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Typography sx={{ fontWeight: 500 }}>Summary</Typography>
                  <Typography sx={{ marginBottom: "30px" }}>
                    {conversation.summary}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item sx={{ mt: "10px" }} lg={12} md={12} xl={12} xs={12}>
                  <Chatlog log={conversation.chatlog} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

const ActionRow = ({ action, onClick }) => {
  const handleClick = () => onClick(action.id);

  return (
    <TableRow onClick={handleClick} hover>
      <TableCell>{moment.utc(action.createdAt).fromNow()}</TableCell>
      <TableCell>{action.type}</TableCell>
      <TableCell>{action.email}</TableCell>
      <TableCell>{action.orderNumber}</TableCell>
    </TableRow>
  );
};

const Actions = ({ conversations, actions, worker, refresh }) => {
  const [action, setAction] = useState();
  const [conversation, setConversation] = useState();
  const merchantActions = actions.filter(
    (a) => a.merchantRequired && !a.archived
  );
  const agentActions = actions.filter(
    (a) => !a.merchantRequired && !a.archived
  );

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (id) => {
    const a = actions.filter((a) => a.id === id)[0];
    setAction(a);
    setConversation(conversations.filter((c) => c.id === a.conversationId)[0]);
    setOpen(true);
  };

  const resolveAction = async (id) => {
    dispatch(resolve({ id }));
    setOpen(false);
    await refresh();
  };

  return (
    <>
      <Card>
        <CardHeader title="Your Action Items" />
        <Divider />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time Elapsed</TableCell>
                <TableCell>Action Type</TableCell>
                <TableCell>Customer Email</TableCell>
                <TableCell>Order Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merchantActions.map((a) => {
                return (
                  <ActionRow key={a.id} action={a} onClick={handleClick} />
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: "20px" }}>
        <CardHeader title="Actions Taken by Agent" />
        <Divider />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time Elapsed</TableCell>
                <TableCell>Action Type</TableCell>
                <TableCell>Customer Email</TableCell>
                <TableCell>Order Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentActions.map((a) => {
                return (
                  <ActionRow key={a.id} action={a} onClick={handleClick} />
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        action={action}
        conversation={conversation}
        resolve={resolveAction}
      />
    </>
  );
};

export default Actions;
