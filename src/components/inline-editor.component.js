import React, { useState, useCallback, useRef, useEffect } from "react";
import NotebookDataService from "../services/notebook.service";
import "../css/inline-editor.css"

function InlineEditor(props) {
  // Define callbacks for GETting and SETting the text and rest state of the component
  const [atRest, setAtRest] = useState(true);
  const [value, setValue] = useState(props.displayValue);

  const inputRef = useRef(null);

  // Callback(/event handler) for when text is changed
  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue]
  );

  // Callback for when text input is blurred
  const onBlur = useCallback(
    () => setAtRest(true), [
    setAtRest
  ]);

  // Set focus to the text field when shown
  useEffect(() => {
    if (!atRest) {
      inputRef.current.focus();
    }
  }, [atRest]);

  // Callback to update the rest state when the text span is clicked
  const onSpanClick = useCallback(
    () => setAtRest(false), [
    setAtRest
  ]);

  return (
    <span>
      <span
        className={`inline-label ${atRest ? '' : 'hidden'}`}
        onClick={onSpanClick}
      >
        {value || props.displayValue}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value || props.displayValue || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={`inline-input ${atRest ? 'hidden' : ''}`}
      />
    </span>
  );
}

export default InlineEditor;
