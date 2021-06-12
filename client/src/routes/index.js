import { lazy } from 'react';

const UnlockWallet = lazy(() => import('../modules/wallet/unlock'));

const Home = lazy(() => import('../modules/Main/Home'));
export const AppRoutes = [
  {
    name: 'Unlock Wallet',
    path: '/unlock-wallet',
    walletRequired: false,
    component: UnlockWallet,
  },
  {
    name: 'Home',
    path: '/',
    walletRequired: true,
    component: Home,
  },
];
