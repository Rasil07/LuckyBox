import ACTIONS from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.APP_INIT:
      return {
        ...state,
        address: action.data.address,
        network: action.data.network,
        hasWallet: action.data.hasWallet,
      };
    case ACTIONS.SET_NETWORK:
      return {
        ...state,
        network: action.data,
      };
    case ACTIONS.SET_LOADING: {
      return {
        ...state,
        isLoading: action.data,
      };
    }

    case ACTIONS.SET_WALLET:
      return {
        ...state,
        wallet: action.data,
      };

    case ACTIONS.SET_WALLET_PRESENT:
      return {
        ...state,
        hasWallet: action.data,
      };

    default:
      return state;
  }
}
