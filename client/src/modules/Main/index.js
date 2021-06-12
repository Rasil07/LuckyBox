import React, { useEffect, useContext } from 'react';
import { AppContext } from './context/Context';
import { AppRoutes } from '../../routes';
import PrivateRoute from '../../routes/PrivateRoutes';
import Navbar from '../../layouts/Navbar';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
function Main() {
  const { initApp, wallet } = useContext(AppContext);
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
        <Switch>
          {AppRoutes.map((prop, key) => {
            return (
              <PrivateRoute
                exact={true}
                path={prop.path}
                key={key}
                component={prop.component}
                wallet={wallet}
                walletRequired={prop.walletRequired}
              />
            );
          })}
        </Switch>
      </Router>
    </Container>
  );
}

export default Main;
