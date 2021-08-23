import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

export function PrivateRoute({ children, ...routeProps }) {
  const { user: { loginToken } } = useContext(UserContext);

  return (
    <Route {...routeProps}>
      {loginToken ? children : <Redirect to='/login' />}
    </Route>
  );
}

export function PublicRoute({ children, ...routeProps }) {
  const { user: { loginToken } } = useContext(UserContext);

  return (
    <Route {...routeProps}>
      {!loginToken ? children : <Redirect to='/' />}
    </Route>
  );
}
