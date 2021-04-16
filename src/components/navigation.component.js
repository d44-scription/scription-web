import React from "react";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs.component";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import AuthenticationDataService from "services/authentication.service";
import Person from "./icons/person.component";
import Exit from "./icons/exit.component";

function Navigation(props) {
  const history = useHistory();

  const logout = () => {
    AuthenticationDataService.logout();
    window.location.replace("/");
  };

  return (
    <header>
      <Navbar className="bg-primary w-100 d-inline-flex justify-content-between p-0 mb-lg-2">
        <Navbar.Brand>
          <Button className="fs-3" onClick={() => history.push("/")}>
            Scription
          </Button>
        </Navbar.Brand>

        {AuthenticationDataService.loggedIn() ? (
          <span className="d-inline-flex">
            <Button
              onClick={() => {
                history.push("/account");
              }}
            >
              <Person
                title="Account Settings"
                size={36}
                class="text-dark"
                hideTitle
              />
              My Account
            </Button>

            <Button onClick={logout}>
              <Exit title="Logout" size={36} class="text-dark" />
              Log out
            </Button>
          </span>
        ) : (
          <Button onClick={() => history.push("/")}>Log in</Button>
        )}
      </Navbar>

      <Breadcrumbs />
    </header>
  );
}

export default Navigation;
