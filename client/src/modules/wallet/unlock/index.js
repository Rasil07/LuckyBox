import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { APP_CONSTANTS } from '../../../constants';
import { DataService } from '../../../services/db';
import { Wallet } from '../../../utils/wallet';
import { AppContext } from '../../Main/context/Context';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';

const { PASSCODE_LENGTH } = APP_CONSTANTS;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  card: {
    marginTop: '1rem',
    padding: '1.5rem',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function Unlock() {
  const { setWallet } = useContext(AppContext);
  let history = useHistory();
  const classes = useStyles();

  const [pincode, setPincode] = useState('');

  const [unlockError, setUnlockError] = useState(false);

  const handleChangePincode = (e) => {
    const { value } = e.target;
    setPincode(value);
    if (value.length === PASSCODE_LENGTH) {
      fetchWalletDataAndUnlock(value);
    }
  };

  const fetchWalletDataAndUnlock = async (passcode) => {
    try {
      let encryptedWallet = await DataService.getWallet();
      const wallet = await Wallet.loadFromJson(passcode, encryptedWallet);
      setWallet(wallet);

      history.push('/');
    } catch (e) {
      setPincode('');
      setUnlockError(true);
    }
  };
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h6">Unlock Your Wallet!!!</Typography>

        <Box className={classes.content}>
          <Input
            onChange={handleChangePincode}
            autoFocus
            type="number"
            margin="dense"
            label="Pascode"
            maxLength={PASSCODE_LENGTH}
            autoComplete="false"
            value={pincode ? pincode : ''}
            disabled={pincode && pincode.length === PASSCODE_LENGTH}
          />

          {unlockError && (
            <Typography variant="caption">
              Passcode did not match. Please enter correct passcode
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
}

export default Unlock;
