import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Breadcrumbs(props) {
  const location = useLocation();
  const paths = location.pathname.split("/");

  let crumbs = paths.map((path, index) => {
    var url = `${paths.slice(0, index + 1).join("/")}`;

    if (index === 0) {
      // First breadcrumb returns a brand link
      return (
        <Breadcrumb.Item key={index} href="/">
          Scription
        </Breadcrumb.Item>
      );
    } else {
      // Otherwise return a breadcrumb where the last one in the list is active
      return (
        <Breadcrumb.Item
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
