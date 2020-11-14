import React, { useState, useCallback } from "react";
import NotebookDataService from "../services/notebook.service";
import "../css/inline-editor.css"

function InlineEditor(props) {
  const [atRest, setAtRest] = useState(true);
  const [value, setValue] = useState(props.displayValue);

  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const onBlur = useCallback(
    () => setAtRest(true), [
    setAtRest
  ]);

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
        type="text"
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={`inline-input ${atRest ? 'hidden' : ''}`}
      />
    </span>
  );
}

export default InlineEditor;
