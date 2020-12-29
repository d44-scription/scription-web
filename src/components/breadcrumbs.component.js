import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Breadcrumbs(props) {
  const location = useLocation();

  const getBreadcrumbs = () => {
    let paths = location.pathname.split("/");

    let crumbs = paths.map((path, index) => {
      var url = `${paths.slice(0, index + 1).join("/")}`;

      if (index === 0) {
        return <Breadcrumb.Item href="/">Scription</Breadcrumb.Item>;
      } else if (index + 1 === paths.length) {
        return (
          <Breadcrumb.Item active key={index}>
            {path}
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item href={url} key={index}>
            {path}
          </Breadcrumb.Item>
        );
      }
    });

    return <Breadcrumb>{crumbs}</Breadcrumb>;
  };

  return getBreadcrumbs();
}

export default Breadcrumbs;
