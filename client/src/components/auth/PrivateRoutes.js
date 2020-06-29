import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
const PrivateRoute = ({auth, component: Component, ...rest}) => {
  const isAuthenticated = useSelector(state => state.user.isAuth)
  return (
      <Route {...rest} render={props => (
          isAuthenticated ?
              <Component {...props} />
          : <Redirect to="/signin" />
      )} />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.object, 
}
export default PrivateRoute;