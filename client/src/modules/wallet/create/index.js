import React, { useState, useContext } from 'react';

import { Wallet } from '../../../utils/wallet';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '../../global/Modal';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import { AppContext } from '../../Main/context/Context';
import { DataService } from '../../../services/db';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import { APP_CONSTANTS } from '../../../constants';
import { useHistory } from 'react-router-dom';

const { PASSCODE_LENGTH } = APP_CONSTANTS;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  confirmStage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingBottom: '1rem',
  },
  confirmStageText: {
    margin: '1rem 0',
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
  const history = useHistory();

  const { setWallet, wallet } = useContext(AppContext);
  const [showWalletActions, setShowWalletActions] = useState(false);

  const [openModal, setModalOpen] = useState(false);
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passCodeMatch, setPasscodeMatch] = useState(true);
  const [privateKey, setPrivateKey] = useState(null);
  const [currentAction, setCurrentAction] = useState('setup_wallet');

  const resetPasscodes = () => {
    setPasscode('');
    setConfirmPasscode('');
    setShowWalletActions(false);
  };

  const togglePasscodeModal = (action) => {
    resetPasscodes();
    setModalOpen(!openModal);
    if (action) setCurrentAction(action);
  };
  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleConfirmPasscodeChange = async (e) => {
    const { value } = e.target;
    setConfirmPasscode(value);
    if (value.length === PASSCODE_LENGTH) {
      if (value !== passcode) {
        setPasscodeMatch(false);
        setConfirmPasscode('');
        return;
      }
      if (currentAction === 'restore_wallet') {
        setShowWalletActions(true);
        return;
      }

      if (currentAction === 'setup_wallet') setShowWalletActions(true);
      return;
    }
    setShowWalletActions(false);
  };

  const handleWalletCreate = async () => {
    try {
      togglePasscodeModal();

      const res = await Wallet.create(passcode);
      if (res) {
        const { wallet, encryptedWallet } = res;
        await DataService.save('wallet', encryptedWallet);
        setWallet(wallet);
      }
    } catch (err) {
      console.log('Something went wrong');
    }
  };
  const handleWalletRestore = async () => {
    if (!privateKey) return;

    try {
      togglePasscodeModal();

      const res = await Wallet.loadFromPrivateKey(privateKey);
      if (res) {
        const encryptedWallet = await res.encrypt(passcode.toString());

        await DataService.save('wallet', encryptedWallet);
        await setWallet(wallet);
      }
    } catch (err) {
      console.log('Something went wrong');
    }
  };
  return (
    <>
      <Modal
        open={openModal}
        toggle={togglePasscodeModal}
        actionButtons={false}
        title="Wallet Setup"
      >
        {passcode.length < PASSCODE_LENGTH && !showWalletActions && (
          <Input
            autoFocus
            type="number"
            margin="dense"
            label="Pascode"
            onChange={handlePasscodeChange}
            maxLength={PASSCODE_LENGTH}
            value={passcode ? passcode : ''}
          />
        )}
        {passcode && passcode.length === PASSCODE_LENGTH && !showWalletActions && (
          <>
            <Input
              onChange={handleConfirmPasscodeChange}
              autoFocus
              type="number"
              margin="dense"
              label="Pascode"
              maxLength={PASSCODE_LENGTH}
              autoComplete="false"
              value={confirmPasscode ? confirmPasscode : ''}
            />
            <Box>
              {passCodeMatch === true ? (
                <Typography variant="caption">Please enter passcode again</Typography>
              ) : (
                <Typography variant="caption">Please type correct confirm passcode</Typography>
              )}
            </Box>
          </>
        )}
        {showWalletActions && currentAction === 'setup_wallet' && (
          <Box className={classes.confirmStage}>
            <Typography variant="caption" className={classes.confirmStageText}>
              Create New Wallet
            </Typography>
            <Button onClick={handleWalletCreate} variant="outlined" size="small" color="primary">
              Proceed
            </Button>
          </Box>
        )}
        {showWalletActions && currentAction === 'restore_wallet' && (
          <Box className={classes.confirmStage}>
            <Typography variant="caption">Restore Wallet from your private key.</Typography>

            <TextField
              id="standard-basic"
              label="Private Key"
              value={privateKey ? privateKey : ''}
              onChange={(e) => setPrivateKey(e.target.value)}
              className={classes.confirmStageText}
              fullWidth
            />
            <Button
              onClick={() => handleWalletRestore()}
              variant="outlined"
              size="small"
              color="secondary"
            >
              Proceed
            </Button>
          </Box>
        )}
      </Modal>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <Typography variant="h6">Welcome , setup your wallet first!!!</Typography>
          <Typography variant="body2">Seems like you dont have your Wallet setted up.</Typography>

          <Box className={classes.content}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.buttonMargin}
              onClick={() => togglePasscodeModal()}
            >
              Create New Wallet
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className={classes.buttonMargin}
              onClick={() => togglePasscodeModal('restore_wallet')}
            >
              Restore Wallet
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default CreateWallet;
