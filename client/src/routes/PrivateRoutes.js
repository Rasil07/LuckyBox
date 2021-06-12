import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, wallet, walletRequired, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!walletRequired) {
          return <Component {...props} {...rest} />;
        } else if (wallet != null) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to={{ pathname: '/unlock-wallet', state: { from: props.location } }} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
