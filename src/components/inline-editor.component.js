import React, { useState, useCallback, useRef, useEffect } from "react";
import useKeypress from "../hooks/useKeypress"
import NotebookDataService from "../services/notebook.service";
import "../css/inline-editor.css"

function InlineEditor(props) {
  // Define callbacks for GETting and SETting the text and rest state of the component
  const [atRest, setAtRest] = useState(true);
  const [value, setValue] = useState(props.value);

  const inputRef = useRef(null);

  // Callback(/event handler) for when text is changed
  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue]
  );

  // Callback for escape key - exit without saving (*only if the textbox is focused)
  useKeypress('Escape', () => {
    if (document.activeElement === inputRef.current) {
      setAtRest(true)
    }
  }, [atRest, setAtRest]);

  // Callback for enter key - save & exit (*only if the textbox is focused)
  useKeypress('Enter', () => {
    if (document.activeElement === inputRef.current) {
      saveAndExit()
    }
  }, [atRest, setAtRest, value]);

  // Callback for when text input is blurred
  const onBlur = useCallback(() => {
    saveAndExit()
  }, [setAtRest, value]);

  const saveAndExit = useCallback(() => {
    const { id, model, param } = props
    setAtRest(true)

    NotebookDataService.update(id, model, param, value)
  }, [value, props]);

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
        {value || props.value}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value || props.value || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={`inline-input ${atRest ? 'hidden' : ''}`}
      />
    </span>
  );
}

export default InlineEditor;
