import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModal(props) {
  return (
    <Modal
      show={props.visible}
      onHide={props.closeAction}
    >
      <Modal.Header>
        <Modal.Title>{props.title || 'Are you sure?'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.text}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeAction}>
          Close
        </Button>

        <Button variant="primary" onClick={props.confirmAction}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
