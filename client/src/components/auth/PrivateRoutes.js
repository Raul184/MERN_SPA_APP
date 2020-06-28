import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ render: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props => {
        if ('cookie') {
          return <Component {...props} />;
        } 
        else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;