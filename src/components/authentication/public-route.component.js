import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationDataService from "services/authentication.service";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthenticationDataService.loggedIn()) {
          // When logged in, redirect to notebooks index
          return <Redirect to={{ pathname: "/notebooks" }} />;
        }

        // When authorised, return component
        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
