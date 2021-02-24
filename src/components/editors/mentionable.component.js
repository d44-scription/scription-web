import React, { useCallback, useRef, useState, useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import NotableDataService from "services/notable.service";
import "scss/mentionable.scss";
import Messages from "./messages.component";

function Mentionable(props) {
  // Store reference to the input field
  const inputRef = useRef(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const action = props.action;
  const setValue = props.setValue;
  const onSubmitAction = props.onSubmitAction;

  // Data retrieval function for when a trigger character is typed
  const fetchNotables = useCallback(
    (query, callback, type) => {
      NotableDataService.index(props.notebookId, type, query)
        // Transform response data to what react-mentions expects
        .then((response) => {
          return response.data.map((notable) => ({
            display: notable.name,
            id: notable.id,
          }));
        })
        .then(callback);
    },
    [props.notebookId]
  );

  // Send request
  const saveAndExit = useCallback(() => {
    action()
      .then((response) => {
        inputRef.current.blur();

        setError(null);
        setSuccess(
          `Successfully saved. ${
            response && response.data.success_message
              ? response.data.success_message
              : ""
          }`
        );

        if (props.clearOnSubmit) {
          setValue("");
        }

        if (onSubmitAction) {
          onSubmitAction(response);
        }
      })
      .catch((e) => {
        setError(e.response.data.join(", "));
      });
  }, [
    setError,
    setSuccess,
    action,
    setValue,
    onSubmitAction,
    props.clearOnSubmit,
  ]);

  // Event to cancel input - removes focus, clears text box
  const cancel = useCallback(() => {
    inputRef.current.blur();

    setSuccess("");
    setError("");

    if (props.clearOnCancel) {
      setValue("");
    }
  }, [setValue, props.clearOnCancel, inputRef]);

  // Keydown event handler for enter and escape actions
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveAndExit();
      } else if (e.key === "Escape") {
        cancel();
      }
    },
    [saveAndExit, cancel]
  );

  // Standard function to update state when user types
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // When value is changed away from null state, reset error message
  useEffect(() => {
    if (props.value !== "") {
      setSuccess("");
    }
  }, [props.value]);

  return (
    <div>
      <MentionsInput
        value={props.value}
        onChange={onChange}
        a11ySuggestionsListLabel={"Suggested notables to mention"}
        placeholder={props.placeholder || "No content"}
        className="mentions"
        onKeyDown={onKeyDown}
        inputRef={inputRef}
      >
        <Mention
          trigger="@"
          data={(query, callback) => {
            fetchNotables(query, callback, "characters");
          }}
          markup="@[__display__](@__id__)"
          className="characters"
        />

        <Mention
          trigger=":"
          data={(query, callback) => {
            fetchNotables(query, callback, "items");
          }}
          markup=":[__display__](:__id__)"
          className="items"
        />

        <Mention
          trigger="#"
          data={(query, callback) => {
            fetchNotables(query, callback, "locations");
          }}
          markup="#[__display__](#__id__)"
          className="locations"
        />
      </MentionsInput>

      {/* TODO: Make help text render when element has focus */}
      <Messages
        help="Use @ to reference a character, : to reference an item, and # to reference a location"
        success={success}
        error={error}
        saveAction={saveAndExit}
        cancelAction={cancel}
      />
    </div>
  );
}

export default Mentionable;
