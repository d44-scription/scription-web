import React, { useState, useCallback, useRef, useEffect } from "react";
import useKeypress from "../../hooks/useKeypress"
import NotebookDataService from "../../services/notebook.service";
import "../../css/inline-editor.css"

function InlineEditor(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [atRest, setAtRest] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  // Define callbacks for GETting and SETting the input value & error message
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState('');

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
      setValue(props.value)
    }
  }, [atRest, setAtRest, setValue]);

  // Callback for enter key - save & exit (*only if the textbox is focused)
  useKeypress('Enter', () => {
    if (document.activeElement === inputRef.current) {
      saveAndExit()
    }
  }, [atRest, setAtRest, value]);

  // Callback for when text input is blurred
  const onBlur = useCallback(() => {
    if(!atRest) {
      saveAndExit()
    }
  }, [setAtRest, value, atRest]);

  // Function to submit data & return to rest state
  const saveAndExit = useCallback(() => {
    const { id, model, param } = props
    setAtRest(true)
    setIsBusy(true)

    // NotebookDataService.update(id, model, param, value)
    //   .then(() => {
        setIsBusy(false)
        setError('')
      // })
      // .catch(e => {
      //   setIsBusy(false)
      //   setError(e.response.data.join(', '))
      // });
  }, [value, props, setIsBusy, setError]);

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
      <div className={`inline-label ${atRest ? '' : 'hidden'}`}>
        <span
          className={"inline-textarea-label"}
          onClick={onSpanClick}
        >
          {value || props.value}
        </span>
      </div>

      <textarea
        ref={inputRef}
        type={"text"}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={`inline-input form-control ${atRest ? 'hidden' : ''}`}
        disabled={isBusy ? true : false}
      />

      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className={`bi bi-hourglass-split ${isBusy ? '' : 'hidden'}`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z" />
      </svg>

      <p className="error">
        {error}
      </p>
    </span>
  );
}

export default InlineEditor;
