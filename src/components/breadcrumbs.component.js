import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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

  return <Breadcrumb>{crumbs}</Breadcrumb>;
}

export default Breadcrumbs;
