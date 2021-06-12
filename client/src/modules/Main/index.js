import React, { useEffect, useContext, lazy } from 'react';
import { AppContext } from './context/Context';
import { AppRoutes } from '../../routes';
import PrivateRoute from '../../routes/PrivateRoutes';
import Navbar from '../../layouts/Navbar';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, useHistory, Route } from 'react-router-dom';

const UnlockWallet = lazy(() => import('../wallet/unlock'));

function Main() {
  const { initApp, wallet, hasWallet, isLoading } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      initApp();
    })();
  }, [initApp]);
  return (
    <Container>
      <Navbar />
      <Router history={history}>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <Switch>
            {!hasWallet ? (
              AppRoutes.map((prop, key) => {
                return (
                  <PrivateRoute
                    exact={true}
                    path={prop.path}
                    key={key}
                    component={prop.component}
                    wallet={wallet}
                    walletRequired={prop.walletRequired}
                    hasWallet={hasWallet}
                  />
                );
              })
            ) : (
              <Route exact path="/" component={UnlockWallet} />
            )}
          </Switch>
        )}
      </Router>
    </Container>
  );
}

export default Main;
