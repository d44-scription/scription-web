import React from "react";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs.component";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import AuthenticationDataService from "../services/authentication.service";
import Person from "./icons/person.component";

function Navigation(props) {
  const history = useHistory();

  const logout = () => {
    AuthenticationDataService.logout();
    history.push("/");
  };

  return (
    <Nav className="bg-primary w-100 d-inline-flex justify-content-between">
      <Breadcrumbs />

      {AuthenticationDataService.loggedIn() ? (
        <span className="d-inline-flex">
          <Button onClick={() => {}}>
            <Person
              title="Account settings"
              size={36}
              class="text-dark"
              hideTitle
            />
          </Button>

          <Button onClick={logout}>Log out</Button>
        </span>
      ) : (
        <Button onClick={() => history.push("/")}>Log in</Button>
      )}
    </Nav>
  );
}

export default Navigation;
