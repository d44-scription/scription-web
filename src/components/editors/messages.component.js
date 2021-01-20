import React from "react";
import { render } from "react-dom";
import Button from "react-bootstrap/Button";

function Messages(props) {
  return(
    <div>
      <p className="help-text" hidden={props.hideHelpText}>
        Press{" "}
        <Button variant="link" onClick={props.saveAction}>
          enter
        </Button>{" "}
        to save &middot; Press{" "}
        <Button variant="link" onClick={props.cancelAction}>
          escape
        </Button>{" "}
        to cancel
      </p>

      <small className="error-text">{props.error}</small>
      <small className="success-text">{props.success}</small>
      <small className="help-text">{props.help}</small>
    </div>
  );
}

export default Messages;
