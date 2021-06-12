import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, wallet, hasWallet, walletRequired, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!walletRequired) {
          return <Component {...props} {...rest} />;
        } else if (wallet != null) {
          return <Component {...props} {...rest} />;
        } else if (hasWallet && walletRequired && wallet === null) {
          return <Redirect to={{ pathname: '/unlock-wallet', state: { from: props.location } }} />;
        } else {
          return <Redirect to={{ pathname: '/create-wallet', state: { from: props.location } }} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
