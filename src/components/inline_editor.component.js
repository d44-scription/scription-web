import React, { useState, useCallback, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import useKeypress from "../hooks/useKeypress";
import "../scss/inline-editor.scss";

function InlineEditor(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [atRest, setAtRest] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  // Define callbacks for GETting and SETting the cached value & error message
  // The error appears below the component when a request fails
  const [error, setError] = useState("");
  // The cache value stores the "value to return to" when a request is cancelled
  const [cacheValue, setCacheValue] = useState("");

  // Store references to the input field and span
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  // Function to submit data & return to rest state
  const saveAndExit = useCallback(() => {
    setAtRest(true);
    setIsBusy(true);

    // Carry out submit action
    props
      .action()
      .then((response) => {
        // If response is successful return to rest state
        setIsBusy(false);
        setError("");
        setCacheValue(props.value);

        // If any additional actions need to be carried out, carry them out
        if (props.onSubmitAction) {
          props.onSubmitAction(response.data.id);
        }
      })
      .catch((e) => {
        // If response is unsuccessful, return to rest state and display error
        setIsBusy(false);
        setError(e.response.data.join(", "));
      });
  }, [props, setIsBusy, setError, setCacheValue]);

  const exitWithoutSaving = useCallback(() => {
    setAtRest(true);
    props.setValue(cacheValue);
  }, [setAtRest, props, cacheValue]);

  // Callback(/event handler) for when text is changed
  const onChange = useCallback(
    (e) => {
      props.setValue(e.target.value);
    },
    [props]
  );

  // Callback for escape key - exit without saving (*only if the textbox is focused)
  useKeypress(
    "Escape",
    () => {
      if (document.activeElement === inputRef.current) {
        exitWithoutSaving();
      }
    },
    [atRest, setAtRest, props.setValue]
  );

  // Callback for enter key
  useKeypress(
    "Enter",
    () => {
      if (atRest) {
        if (document.activeElement === spanRef.current) {
          // If component is at rest and span has focus, enter should simulate clicking the span
          onSpanClick();
        }
      } else {
        if (document.activeElement === inputRef.current) {
          // If component is not at rest and text field has focus, enter should save and exit
          saveAndExit();
        }
      }
    },
    [atRest, setAtRest]
  );

  // Callback for space key
  useKeypress(
    " ",
    () => {
      if (atRest && document.activeElement === spanRef.current) {
        // If component is at rest and span has focus, space should simulate clicking the span
        onSpanClick();
      } else if (!atRest && document.activeElement === inputRef.current) {
        // Otherwise add a space
        props.setValue(`${inputRef.current.value || ""} `);
      }
    },
    [atRest, props.setValue]
  );

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

  // Reset error when props change
  useEffect(() => {
    setError("");
  }, [props.value, setError]);

  return (
    <span>
      <div className="d-inline-flex justify-content-start align-items-center w-100">
        {props.type === "textarea" ? (
          <section
            className={`inline-label w-100 ${props.value ? "" : "placeholder"}`}
            onClick={onSpanClick}
            hidden={!atRest}
            role="switch"
            aria-checked={!atRest}
            tabIndex="0"
            ref={spanRef}
          >
            <span
              role="complementary"
              className="inline-textarea-label"
              style={{ fontSize: props.fontSize || "1rem" }}
            >
              {props.value || props.placeholder || "No data saved."}
            </span>
          </section>
        ) : (
          <span
            style={{ fontSize: props.fontSize || "1rem" }}
            className={`inline-text-label inline-label w-100 ${
              props.value ? "" : "placeholder"
            }`}
            onClick={onSpanClick}
            hidden={!atRest}
            tabIndex="0"
            ref={spanRef}
          >
            {props.value || props.placeholder || "No data saved."}
          </span>
        )}

        <Form.Control
          as={props.type === "textarea" ? "textarea" : "input"}
          rows={4}
          style={{ fontSize: props.fontSize || "1rem" }}
          ref={inputRef}
          value={props.value || ""}
          onChange={onChange}
          className="inline-input"
          disabled={isBusy}
          hidden={atRest}
        />

        <Spinner
          animation="border"
          role="status"
          className="ml-3"
          title="Saving changes"
          hidden={!isBusy}
          size="sm"
        />
      </div>

      <p className="help-text" hidden={atRest}>
        Press{" "}
        <Button variant="link" onClick={saveAndExit}>
          enter
        </Button>{" "}
        to save &middot; Press{" "}
        <Button variant="link" onClick={exitWithoutSaving}>
          escape
        </Button>{" "}
        to cancel
      </p>

      <p className="help-text">{props.helpText}</p>
      <p className="error">{error}</p>
    </span>
  );
}

export default InlineEditor;
