import { lazy } from 'react';

const CreateWallet = lazy(() => import('../modules/wallet/create'));

const Home = lazy(() => import('../modules/Main/Home'));
export const AppRoutes = [
  {
    name: 'Create Wallet',
    path: '/create-wallet',
    walletRequired: false,
    component: CreateWallet,
  },

  {
    name: 'Home',
    path: '/home',
    walletRequired: true,
    component: Home,
  },
];
