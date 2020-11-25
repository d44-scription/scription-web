import React, { useState, useCallback, useRef, useEffect } from "react";
import useKeypress from "../../hooks/useKeypress"
import NotebookDataService from "../../services/notebook.service";
import "../../css/inline-editor.css"

function Text(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [atRest, setAtRest] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  // Define callbacks for GETting and SETting the input value & error message
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState('');

  const inputRef = useRef(null);

  // Function to submit data & return to rest state
  const saveAndExit = useCallback(() => {
    const { id, model, param } = props
    setAtRest(true)
    setIsBusy(true)

    NotebookDataService.update(id, model, param, value)
      .then(() => {
        setIsBusy(false)
        setError('')
      })
      .catch(e => {
        setIsBusy(false)
        setError(e.response.data.join(', '))
      });
  }, [value, props, setIsBusy, setError]);

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
  }, [atRest, saveAndExit]);

  // Set focus to the text field when shown
  useEffect(() => {
    if (!atRest) {
      inputRef.current.focus();
      inputRef.current.value = value || props.value;
    }
  }, [atRest, value, props]);

  // Update value when the given prop changes
  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  // Callback to update the rest state when the text span is clicked
  const onSpanClick = useCallback(
    () => setAtRest(false), [
    setAtRest
  ]);

  return (
    <span>
      <div
        className="d-inline-flex justify-content-start align-items-center w-100">
        <span
          style={{fontSize: props.fontSize || '1rem'}}
          className={`inline-text-label inline-label ${props.value && value ? '' : 'placeholder' }`}
          onClick={onSpanClick}
          hidden={!atRest}
        >
          {value || props.value || `No ${props.param} saved.`}
        </span>

        <input
          style={{ fontSize: props.fontSize || '1rem' }}
          ref={inputRef}
          type={"text"}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          className={`inline-input form-control`}
          disabled={isBusy}
          hidden={atRest}
        />

        <svg
          title="Saving changes"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className='bi bi-arrow-repeat busy-svg'
          hidden={!isBusy}
          fill="#a0a0a0"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
          <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
        </svg>
      </div>

      <p className="error">
        {error}
      </p>
    </span>
  );
}

export default Text;
