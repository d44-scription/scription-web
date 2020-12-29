import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Breadcrumbs(props) {
  const location = useLocation();
  let paths = location.pathname.split("/");

  // At root of website, second path is an empty string
  // Remove this to correctly make root link "active"
  paths = paths[1] === "" ? paths.slice(1) : paths;

  const crumbs = paths.map((path, index) => {
    var url = `${paths.slice(0, index + 1).join("/")}`;

    if (index === 0) {
      // First breadcrumb returns a brand link
      return (
        <Breadcrumb.Item
          className="capitalise"
          key={index}
          href="/"
          active={index + 1 === paths.length}
        >
          Scription
        </Breadcrumb.Item>
      );
    } else {
      // Otherwise return a breadcrumb where the last one in the list is active
      return (
        <Breadcrumb.Item
          className="capitalise"
          href={url}
          key={index}
          active={index + 1 === paths.length}
        >
          {path}
        </Breadcrumb.Item>
      );
    }
  });

  return <Breadcrumb>{crumbs}</Breadcrumb>;
}

export default Breadcrumbs;
