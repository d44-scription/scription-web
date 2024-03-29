import React, { useState, useCallback, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "scss/inline-editor.scss";
import Messages from "./messages.component";
import PropTypes from "prop-types";

function InlineEditor(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [atRest, setAtRest] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  // Define callbacks for GETting and SETting the cached value & error message
  // The error appears below the component when a request fails
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // The cache value stores the "value to return to" when a request is cancelled
  const [cacheValue, setCacheValue] = useState("");

  // Store reference to the input field
  const inputRef = useRef(null);

  // Destructure props that don't change
  const action = props.action;
  const onSubmitAction = props.onSubmitAction;
  const setValue = props.setValue;

  // Function to submit data & return to rest state
  const saveAndExit = useCallback(() => {
    setAtRest(true);
    setIsBusy(true);

    // Carry out submit action
    action()
      .then((response) => {
        // If response is successful return to rest state
        setIsBusy(false);
        setError("");
        setSuccess("Successfully saved.");
        setCacheValue(props.value);

        // If any additional actions need to be carried out, carry them out
        if (onSubmitAction) {
          onSubmitAction(response);
        }
      })
      .catch((e) => {
        // If response is unsuccessful, return to rest state and display error
        setIsBusy(false);
        setError(e.response.data.join(", "));
        setSuccess("");
      });
  }, [
    props.value,
    action,
    onSubmitAction,
    setIsBusy,
    setError,
    setSuccess,
    setCacheValue,
  ]);

  const exitWithoutSaving = useCallback(() => {
    setAtRest(true);
    setSuccess("");
    setValue(cacheValue);
  }, [setAtRest, setValue, cacheValue]);

  // Callback(/event handler) for when text is changed
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // If component is at rest and span has focus, enter/space should simulate clicking the span
  const spanKeyDown = (e) => {
    if ([" ", "Enter"].includes(e.key) && atRest) {
      onSpanClick();
    }
  };

  // If component is not at rest and input has focus...
  const inputKeyDown = (e) => {
    if (!atRest) {
      if (e.key === "Escape") {
        // Escape key should exit without saving
        exitWithoutSaving();
      } else if (e.key === "Enter" && !e.shiftKey) {
        // And enter key should save and exit
        saveAndExit();
      }
    }
  };

  // Set focus to the text field when shown
  useEffect(() => {
    if (!atRest) {
      inputRef.current.focus();
      inputRef.current.value = props.value;
    }
  }, [atRest, props.value]);

  // Callback to update the rest state when the text span is clicked
  const onSpanClick = useCallback(() => {
    setAtRest(false);
    setCacheValue(props.value);
  }, [setAtRest, props.value]);

  // Reset error & success messages when props change
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [props.value, setError]);

  const renderSpan = () => {
    return (
      <section
        className={`inline-label w-100 ${props.value ? "" : "placeholder"}`}
        onClick={onSpanClick}
        onKeyDown={spanKeyDown}
        hidden={!atRest}
        role="switch"
        aria-checked={!atRest}
        tabIndex="0"
      >
        <span
          role="complementary"
          className="inline-text-label"
          style={{ fontSize: props.fontSize || "1rem" }}
        >
          {props.value || props.placeholder || "Click here to edit"}
        </span>
      </section>
    );
  };

  const renderInput = () => {
    return (
      <Form.Control
        as={props.multiline ? "textarea" : "input"}
        name={props.formLabel}
        id={props.formLabel}
        rows={4}
        style={{ fontSize: props.fontSize || "1rem" }}
        ref={inputRef}
        value={props.value || ""}
        onChange={onChange}
        onKeyDown={inputKeyDown}
        className="inline-input"
        disabled={isBusy}
        hidden={atRest}
      />
    );
  };

  return (
    <span>
      <div className="d-inline-flex justify-content-start align-items-center w-100">
        <Form.Group className="w-100">
          <Form.Label htmlFor={props.formLabel} className="inline-form-label">
            {props.formLabel}
          </Form.Label>

          {renderSpan()}
          {renderInput()}
        </Form.Group>

        <Spinner
          animation="border"
          role="status"
          className="ml-3"
          title="Saving changes"
          hidden={!isBusy}
          size="sm"
        />
      </div>

      <Messages
        hideHelpText={atRest}
        saveAction={saveAndExit}
        cancelAction={exitWithoutSaving}
        help={props.helpText}
        error={error}
        success={success}
      />
    </span>
  );
}

InlineEditor.propTypes = {
  // The action to complete when data changed
  action: PropTypes.func.isRequired,

  // Optional callback to carry out after changes submitted
  onSubmitAction: PropTypes.func,

  // Manage the displayed value
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,

  // Text or textarea
  multiline: PropTypes.bool,

  // Elements visible to users; a label shown above the
  // field and the placeholder shown when no data added
  formLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,

  fontSize: PropTypes.string,
  helpText: PropTypes.string,
};

export default InlineEditor;
