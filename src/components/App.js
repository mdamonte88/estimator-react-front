import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import history from '../utils/history';
import RouteFromPath from './routes/RouteFromPath';
import routes from '../routes';

const App = ({ authenticated, checked }) => (
  <Fragment>
    <Helmet>
      <title>RM Do it Yourself</title>
      <link rel="icon" type="image/png" href="https://www.rootstrap.com/img/icons/favicons/rootstrap-favicon.ico" sizes="16x16" />
    </Helmet>
    <ConnectedRouter history={history}>
      {checked &&
        <Switch>
          {routes.map((route, index) =>
            <RouteFromPath
              key={`route${index}`}
              {...route}
              authenticated={authenticated}
            />)
          }
        </Switch>
      }
    </ConnectedRouter>
  </Fragment>
);

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = state => ({
  checked: state.getIn(['session', 'checked']),
  authenticated: state.getIn(['session', 'authenticated'])
});

export default connect(mapState)(App);
