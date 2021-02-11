import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Nav from "react-bootstrap/Nav";
import AuthenticationDataService from "../services/authentication.service";

function Breadcrumbs(props) {
  const location = useLocation();
  const history = useHistory();

  let paths = location.pathname.split("/");

  // At root of website, second path is an empty string
  // Remove this to correctly make root link "active"
  paths = paths[1] === "" ? paths.slice(1) : paths;

  const onKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      history.push(e.target.pathname);
    }
  };

  const crumbs = paths.map((path, index) => {
    // Replace first path ('') with root link & branding
    var url = index === 0 ? "/" : `${paths.slice(0, index + 1).join("/")}`;
    var label = index === 0 ? "Scription" : path;

    return (
      <Breadcrumb.Item
        className="capitalise"
        href={url}
        key={index}
        active={index + 1 === paths.length}
        onKeyDown={onKeyDown}
      >
        {label}
      </Breadcrumb.Item>
    );
  });

  return (
    <Nav className="bg-primary">
      <Breadcrumb>{crumbs}</Breadcrumb>

      {AuthenticationDataService.loggedIn() ? <p className="text-dark">Signed in</p> : <p className="text-dark">Signed out</p>}
    </Nav>
  );
}

export default Breadcrumbs;
