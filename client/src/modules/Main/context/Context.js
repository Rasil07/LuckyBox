import React, { createContext, useReducer, useCallback } from 'react';

import ACTIONS from './actions';
import appReducer from './reducer';
import { DataService } from '../../../services/db';
import { APP_CONSTANTS, ETH_TOKEN, RBT_TOKEN } from '../../../constants';

const initialState = {
  address: null,
  network: null,
  wallet: null,
  hasWallet: false,
  isLoading: false,
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const initApp = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, data: true });
    await DataService.addDefaultAsset(ETH_TOKEN.SYMBOL, ETH_TOKEN.NAME);
    await DataService.addERCAsset(RBT_TOKEN.SYMBOL, RBT_TOKEN.NAME);
    //TODO: in future check version and add action if the version is different.
    DataService.save('version', APP_CONSTANTS.VERSION);
    let data = await DataService.initAppData();
    data.hasWallet = data.wallet === null ? false : true;
    if (!data.hasWallet) localStorage.removeItem('address');
    dispatch({ type: ACTIONS.APP_INIT, data });
    dispatch({ type: ACTIONS.SET_LOADING, data: false });
  }, [dispatch]);
  function setHasWallet(hasWallet) {
    dispatch({ type: ACTIONS.SET_WALLET_PRESENT, data: hasWallet });
  }

  function setWallet(wallet) {
    dispatch({ type: ACTIONS.SET_WALLET, data: wallet });
  }

  function setNetwork(network) {
    dispatch({ type: ACTIONS.SET_NETWORK, data: network });
  }

  return (
    <AppContext.Provider
      value={{
        address: state.address,
        hasWallet: state.hasWallet,
        network: state.network,
        wallet: state.wallet,
        isLoading: state.isLoading,
        initApp,
        setHasWallet,
        setWallet,
        setNetwork,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
