import React, { useState } from 'react';
import { Card, CardHeader, Divider, CardContent, Container, Grid, TextField, Button } from '@mui/material';
import { QuestionAnswer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import WorkerCard from '../../../../components/WorkerCard';
import { integrate } from '../../../../stores/shopify';

const chatbot = {
  id: 'CHATBOT',
  name: 'Shopify Chatbot',
  icon: QuestionAnswer,
  description: 'An AI chatbot to handle product QA and customer support!',
};

const Shopify = ({ onClick }) => {
  const [stage, setStage] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => setStage(stage + 1);

  const handleClick = () => onClick({ id: 'CHATBOT', value: storeName, description });

  if (stage === 0) {
    return (
      <Grid sx={{ display: 'flex', flexDirection: 'column', width: '70%' }} item>
        <TextField
          sx={{ marginBottom: '10px' }}
          label="Describe your company, the more detail the better"
          multiline={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleNext} variant="contained" sx={{ color: 'main.primary' }}>
            Next
          </Button>
        </div>
      </Grid>
    );
  }

  if (stage === 1) {
    return (
      <Grid sx={{ display: 'flex', flexDirection: 'column', width: '70%' }} item>
        <TextField
          sx={{ marginBottom: '10px' }}
          label="Shopify store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClick} variant="contained" sx={{ color: 'main.primary' }}>
            Integrate
          </Button>
        </div>
      </Grid>
    );
  }
};

const Create = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);
  const workerTypes = useSelector((state) => state.user.workers.map((w) => w.id));

  const [selected, setSelected] = useState();

  const handleClick = (id) => {
    setSelected(id);
  };

  const handleSelectedClick = async (props) => {
    if (props.id === 'CHATBOT') {
      dispatch(integrate({ email: session.email, shop: props.value, description: props.description }));
    }
  };

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Create a new agent" />
      <Divider />
      <CardContent>
        <Container maxWidth={false}>
          {selected ? (
            <Grid container spacing={3}>
              {selected === 'CHATBOT' && <Shopify onClick={handleSelectedClick} />}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {!workerTypes.includes('CHATBOT') && (
                <Grid item>
                  <WorkerCard worker={chatbot} onClick={handleClick} />
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </CardContent>
    </Card>
  );
};

export default Create;
