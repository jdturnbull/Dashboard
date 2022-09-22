import React, { useState } from 'react';
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
  TableBody,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const getColor = (s) => {
  if (s.trim() === 'POSITIVE') {
    return '#2dc937';
  }
  if (s.trim() === 'NEGATIVE') {
    return '#cc3232';
  }
  if (s.trim() === 'NEUTRAL') {
    return '#e7b416';
  }
};

const SideBar = ({ selected, conversations, setSelected }) => {
  return (
    <PerfectScrollbar>
      <Box sx={{ height: '460px', overflowY: 'scroll' }}>
        <Table>
          <TableBody>
            {conversations.map((c) => {
              const lastMessage = c.chatlog[c.chatlog.length - 1];
              const sColor = getColor(c.sentiment);

              const handleCellClick = () => {
                setSelected(c.id);
              };

              return (
                <TableRow key={c.id} hover>
                  <TableCell
                    onClick={handleCellClick}
                    sx={{ borderRadius: '10px' }}
                    style={selected === c.id ? { backgroundColor: '#00000007' } : {}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ marginRight: '10px' }}>
                        <AccountCircleIcon style={{ color: sColor }} />
                      </Box>
                      <Box sx={{ flex: 1, marginBottom: '4px' }}>
                        <Typography style={selected === c.id ? { fontWeight: '500' } : {}}>Customer</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 12, marginBottom: '4px', color: '#00000050' }}>
                          {moment.utc(c.createdAt).fromNow(true)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                        }}
                        variant="body1">
                        {lastMessage.AI || lastMessage.Customer}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  );
};

const MessageContent = ({ conversation, resolve }) => {
  if (!conversation) {
    return (
      <Card>
        <CardHeader title="Conversation" sx={{}} />
        <CardContent sx={{ height: '460px', overflowY: 'scroll' }} />
      </Card>
    );
  } else {
    return (
      <PerfectScrollbar>
        <Box sx={{ height: '460px', overflowY: 'scroll' }}>
          {conversation.chatlog.map((c, i) => {
            if (c.AI) {
              return (
                <Box key={i} sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', marginBottom: '20px' }}>
                  <Box
                    key={i}
                    sx={{
                      backgroundColor: 'primary.main',
                      padding: '5px 15px',
                      borderRadius: '10px',
                      maxWidth: '70%',
                    }}>
                    <Typography sx={{ color: '#fff' }}>{c.AI}</Typography>
                  </Box>
                </Box>
              );
            } else {
              return (
                <Box key={i} sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', marginBottom: '20px' }}>
                  <Box
                    key={i}
                    sx={{ backgroundColor: '#00000010', padding: '5px 15px', borderRadius: '10px', maxWidth: '70%' }}>
                    <Typography>{c.Customer}</Typography>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
      </PerfectScrollbar>
    );
  }
};

const Conversations = ({ conversations, refresh, actions }) => {
  const [selected, setSelected] = useState(conversations[0]?.id || '');

  const conversation = conversations.filter((c) => c.id === selected)[0];

  return (
    <PerfectScrollbar>
      <Box>
        <Card>
          <CardHeader title="Conversations" />
          <Divider />
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '30%' }}>
              <SideBar selected={selected} conversations={conversations} setSelected={setSelected} />
            </Box>
            <Box sx={{ border: '0.5px solid #00000020', height: '460px', marginLeft: '10px', marginRight: '10px' }} />
            <Box sx={{ width: '70%' }}>
              <MessageContent conversation={conversation} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PerfectScrollbar>
  );
};

export default Conversations;
