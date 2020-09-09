import React from 'react';
import { Route } from 'react-router-dom';

import { object } from 'prop-types';
import PrivateRoute from './PrivateRoute';

const RouteFromPath = route => (
  route.private ?
    <PrivateRoute
      {...route}
      authenticated={route.authenticated}
    /> :
    <Route
      {...route}
    />
);

RouteFromPath.propTypes = {
  route: object
};

export default RouteFromPath;
