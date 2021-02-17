import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationDataService from "services/authentication.service";

function SecureRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!AuthenticationDataService.loggedIn()) {
          // When not logged in, redirect to login page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // When authorised, return component
        return <Component {...props} />;
      }}
    />
  );
}

export default SecureRoute;
