import React, { useState, useContext } from 'react';

import { Wallet } from '../../../utils/wallet';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import { AppContext } from '../../Main/context/Context';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonMargin: {
    margin: theme.spacing(1),
    width: 'fit-content',
  },
  card: {
    marginTop: '1rem',
    padding: '1.5rem',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
function CreateWallet() {
  const classes = useStyles();
  const { hasWallet, setWallet, network, wallet } = useContext(AppContext);

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h6">Welcome , setup your wallet first!!!</Typography>
        <Typography variant="body2">Seems like you dont have your Wallet setted up.</Typography>

        <Box className={classes.content}>
          <Button variant="contained" color="primary" size="small" className={classes.buttonMargin}>
            Create New Wallet
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.buttonMargin}
          >
            Restore Wallet
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default CreateWallet;
