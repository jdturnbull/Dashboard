import React, { useState } from 'react';
import {
  Card,
  Box,
  Table,
  TableBody,
  Alert,
  TableCell,
  TableHead,
  TextField,
  TableRow,
  Button,
  Typography,
  CardHeader,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { update } from '../../../../stores/shopify';

const Edit = () => {
  const { id } = useParams();
  const workers = useSelector((state) => state.user.workers);
  const worker = workers.filter((w) => w.id === id)[0];

  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstMessage, setFirstMessage] = useState(worker.configuration.firstMessage);
  const [headingText, setHeadingText] = useState(worker.configuration.headingText);
  const [subHeader, setSubHeader] = useState(worker.configuration.subHeader);
  const [primaryColor, setPrimaryColor] = useState(worker.configuration.primaryColor);
  const [visitorTextColor, setVisitorTextColor] = useState(worker.configuration.visitorTextColor);
  const [botTextColor, setBotTextColor] = useState(worker.configuration.botTextColor);

  const handleSave = () => {
    dispatch(
      update({
        id,
        data: { firstMessage, headingText, subHeader, primaryColor, visitorTextColor, botTextColor },
      }),
    );
    setTimeout(() => setSaved(true), 1000);
  };

  const handleBack = () => {
    navigate(`/workers/shopify/view${id}`);
  };

  return (
    <Card>
      <CardHeader
        title={'Shopify Chatbot'}
        action={
          <>
            <Button variant="outlined" sx={{ marginRight: '10px', color: 'primary.main' }} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" sx={{ backgroundColor: 'primary.main' }} onClick={handleSave}>
              Save
            </Button>
          </>
        }
      />
      {saved && (
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={() => setSaved(false)}>
              Clear
            </Button>
          }>
          Sucessfully saved configuration
        </Alert>
      )}
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Setting</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Typography color="textPrimary" variant="body1">
                      First Message
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Typography color="textPrimary" variant="body1">
                      Header text
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={headingText}
                    onChange={(e) => setHeadingText(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Typography color="textPrimary" variant="body1">
                      SubHeader text
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={subHeader}
                    onChange={(e) => setSubHeader(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Primary Color</TableCell>
                  <TableCell>Visitor Text Color</TableCell>
                  <TableCell>Bot Text Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>
                    <SketchPicker color={primaryColor} onChangeComplete={(color) => setPrimaryColor(color.hex)} />
                  </TableCell>
                  <TableCell>
                    <SketchPicker
                      color={visitorTextColor}
                      onChangeComplete={(color) => setVisitorTextColor(color.hex)}
                    />
                  </TableCell>
                  <TableCell>
                    <SketchPicker color={botTextColor} onChangeComplete={(color) => setBotTextColor(color.hex)} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default Edit;
