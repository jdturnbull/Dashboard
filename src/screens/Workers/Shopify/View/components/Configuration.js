import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Grid,
  Card,
  TextField,
  Typography,
  Button,
  CardContent,
  Chip,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ExpandMore } from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import { TwitterPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { update } from '../../../../../stores/shopify';

const action_items = ['RETURN AN ITEM', 'FIND AN ORDER', 'ITEM IS DAMAGED', 'ITEM NEVER ARRIVED', 'CANCEL AN ORDER'];

const Indicator = ({ color }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        backgroundColor: color,
        marginRight: '20px',
        height: '5px',
        borderRadius: '10px',
        marginTop: '10px',
        marginLeft: '10px',
      }}
    />
  );
};

const Summary = ({ color, label }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography sx={{ width: '33%', flexShrink: 0 }}>{label}</Typography>
      <Indicator color={color} />
    </AccordionSummary>
  );
};

const TextSummary = ({ label, text }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography sx={{ width: '33%', flexShrink: 0 }}>{label}</Typography>
      <Typography
        sx={{
          marginRight: '20px',
          marginLeft: '10px',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
        }}>
        {text}
      </Typography>
    </AccordionSummary>
  );
};

const lables = {
  RETURN_AN_ITEM: 'Returns',
  FIND_AN_ORDER: 'Find order',
  ITEM_IS_DAMAGED: 'Damaged orders',
  ITEM_NEVER_ARRIVED: 'Missing orders',
  CANCEL_AN_ORDER: 'Cancellations',
};
const ActionItem = ({ item, selected, onClick }) => {
  const handleClick = () => onClick(item);

  return (
    <Grid item>
      <Chip
        label={lables[item.replaceAll(' ', '_')]}
        onClick={handleClick}
        clickable
        icon={selected ? <DoneIcon /> : null}
      />
    </Grid>
  );
};

const Configuration = ({ worker, refresh }) => {
  const [primaryColor, setPrimaryColor] = useState(worker.configuration.primaryColor);
  const [visitorTextColor, setVisitorTextColor] = useState(worker.configuration.visitorTextColor);
  const [headingTextColor, setHeadingTextColor] = useState(worker.configuration.headingTextColor);
  const [subHeadingTextColor, setSubHeadingTextColor] = useState(worker.configuration.subHeadingTextColor);
  const [heading, setHeading] = useState(worker.configuration.heading);
  const [subHeading, setSubHeading] = useState(worker.configuration.subHeading);
  const [firstMessage, setFirstMessage] = useState(worker.configuration.firstMessage);
  const [enabledActions, setEnabledActions] = useState(worker.enabledActions);

  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleActionClick = (item) => {
    if (enabledActions.includes(item)) {
      setEnabledActions([...enabledActions.filter((a) => a !== item)]);
    } else {
      setEnabledActions([...enabledActions, item]);
    }
  };

  const handleSubmit = async () => {
    dispatch(
      update({
        id: worker.id,
        enabledActions,
        data: {
          primaryColor,
          visitorTextColor,
          headingTextColor,
          subHeadingTextColor,
          heading,
          subHeading,
          firstMessage,
          enabledActions,
        },
      }),
    );
    await refresh();
  };

  const Chatbot = () => {
    return (
      <Box
        sx={{
          height: '430px',
          width: '300px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '5px 8px 15px 0px rgba(0,0,0,0.15)',
        }}>
        <Box
          sx={{
            height: '100px',
            width: '100%',
            backgroundColor: primaryColor,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            padding: '15px',
          }}>
          <Typography sx={{ color: headingTextColor, fontWeight: 500, fontSize: '18px' }}>{heading}</Typography>
          <Typography sx={{ color: subHeadingTextColor, fontWeight: 500, fontSize: '15px' }}>{subHeading}</Typography>
        </Box>
        <Box sx={{ padding: '20px' }}>
          <Box sx={{ width: '80%' }}>
            <Box sx={{ backgroundColor: '#e9e9e9', padding: '8px 10px', borderRadius: '20px' }}>
              <Typography sx={{ color: '#000' }}>{firstMessage}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: '0px 20px' }}>
          <Box sx={{ marginLeft: '57px', width: '80%' }}>
            <Box sx={{ backgroundColor: primaryColor, padding: '8px 10px', borderRadius: '20px' }}>
              <Typography sx={{ color: visitorTextColor }}>
                This is what a response from a customer will look like.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <PerfectScrollbar>
      <Box>
        <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item lg={4} md={12} xl={12} xs={12}>
            <Box>
              <Accordion expanded={expanded === 'heading'} onChange={handleChange('heading')}>
                <TextSummary label="Header Text" text={heading} />
                <AccordionDetails>
                  <TextField sx={{ width: '100%' }} value={heading} onChange={(e) => setHeading(e.target.value)} />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'subHeading'} onChange={handleChange('subHeading')}>
                <TextSummary label="Subheader Text" text={subHeading} />
                <AccordionDetails>
                  <TextField
                    sx={{ width: '100%' }}
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'firstMessage'} onChange={handleChange('firstMessage')}>
                <TextSummary label="First message" text={firstMessage} />
                <AccordionDetails>
                  <TextField
                    sx={{ width: '100%' }}
                    value={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.value)}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'primaryColor'} onChange={handleChange('primaryColor')}>
                <Summary color={primaryColor} label="Primary color" />
                <AccordionDetails>
                  <TwitterPicker color={primaryColor} onChange={(v) => setPrimaryColor(v.hex)} />
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'visitorTextColor'} onChange={handleChange('visitorTextColor')}>
                <Summary color={visitorTextColor} label="Visitor text color" />
                <AccordionDetails>
                  <TwitterPicker color={visitorTextColor} onChange={(v) => setVisitorTextColor(v.hex)} />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'headingTextColor'} onChange={handleChange('headingTextColor')}>
                <Summary color={headingTextColor} label="Header text color" />
                <AccordionDetails>
                  <TwitterPicker color={headingTextColor} onChange={(v) => setHeadingTextColor(v.hex)} />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'subHeadingTextColor'} onChange={handleChange('subHeadingTextColor')}>
                <Summary color={subHeadingTextColor} label="Subheader text color" />
                <AccordionDetails>
                  <TwitterPicker color={subHeadingTextColor} onChange={(v) => setSubHeadingTextColor(v.hex)} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} xl={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Chatbot />
          </Grid>
          <Grid item lg={4} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader title="Enabled Actions" />
              <CardContent sx={{ pt: 0 }}>
                <Grid container spacing={2}>
                  {action_items.map((i, index) => (
                    <ActionItem
                      key={index}
                      item={i}
                      selected={enabledActions.includes(i)}
                      onClick={handleActionClick}
                    />
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PerfectScrollbar>
  );
};

export default Configuration;
