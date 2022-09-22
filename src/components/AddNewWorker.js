import React from 'react';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const styles = (theme) => {
  return {
    card: {
      backgroundColor: '#00000008',
      border: '1px solid #00000010',
      '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
        cursor: 'pointer',
      },
    },
  };
};

const AddNewWorker = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/workers/shopify/create');
  };

  return (
    <Card className={props.classes.card} onClick={handleClick}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Agent
            </Typography>
            <Typography color="textPrimary" variant="h6">
              Add New Agent
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'secondary.main',
                height: 46,
                width: 46,
              }}>
              <Add />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(AddNewWorker);
