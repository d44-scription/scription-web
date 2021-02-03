import React, { useCallback, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import NotableDataService from "../../services/notable.service";
import "../../scss/mentionable.scss";
import Messages from "./messages.component";

function Mentionable(props) {
  // Store reference to the input field
  const inputRef = useRef(null);

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

  // Event to cancel input - removes focus, clears text box
  const cancel = useCallback(() => {
    inputRef.current.blur();

    if (props.clearOnCancel) {
      props.setValue("");
    }
  }, [props, inputRef]);

  // Keydown event handler for enter and escape actions
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        props.onSubmit();
      } else if (e.key === "Escape") {
        cancel();
      }
    },
    [props, cancel]
  );

  // Standard function to update state when user types
  const onChange = (e) => {
    props.setValue(e.target.value);
  };

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
        success={props.successMessage}
        error={props.errorMessage}
        saveAction={props.onSubmit}
        cancelAction={cancel}
      />
    </div>
  );
}

export default Mentionable;
