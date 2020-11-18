import React, { useState, useCallback, useEffect } from "react";

function Modal(props) {
  // Define callbacks for GETting and SETting the visibility of component
  const [visible, setVisible] = useState(false);

  // Set focus to the text field when shown
  useEffect(() => {
    setVisible(props.visible)
    console.log(props.visible)
  }, [setVisible, props.visible]);

  return (
    <div
      className="modal fade show"
      style={visible ? { display: 'block' } : {}}
      tabIndex="-1"
      role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.title || 'Are you sure?'}
            </h5>
            <button type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <p>{ props.text }</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-primary">OK</button>
            <button type="button" className="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
