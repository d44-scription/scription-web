import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function ConfirmModal(props) {
  return (
    <Modal show={props.visible} onHide={props.closeAction}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.text}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeAction}>
          Cancel
        </Button>

        <Button variant="primary" onClick={props.confirmAction}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  // Visibility of modal
  visible: PropTypes.bool.isRequired,

  // Actions to be completed
  closeAction: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,

  // Text to show
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConfirmModal;
