import React from "react";
import Button from "react-bootstrap/Button";
import "../../scss/messages.scss";

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

      <p className="error-text">{props.error}</p>
      <p className="success-text">{props.success}</p>
      <p className="help-text">{props.help}</p>
    </div>
  );
}

export default Messages;
