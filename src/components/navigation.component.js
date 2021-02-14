import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs.component";
import Nav from "react-bootstrap/Nav";
import AuthenticationDataService from "../services/authentication.service";

function Navigation(props) {
  return (
    <Nav className="bg-primary">
      <Breadcrumbs />

      {AuthenticationDataService.loggedIn() ? (
        <p className="text-dark">Signed in</p>
      ) : (
        <p className="text-dark">Signed out</p>
      )}
    </Nav>
  );
}

export default Navigation;
