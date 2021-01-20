import React, { useCallback } from "react";
import { MentionsInput, Mention } from "react-mentions";
import NotableDataService from "../services/notable.service";

function Mentionable(props) {
  const fetchNotables = useCallback(
    (query, callback, type) => {
      if (!query) return;

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

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.onSubmit();
    }
  }

  return (
    <MentionsInput
      value={props.value}
      onChange={props.onChange}
      a11ySuggestionsListLabel={"Suggested notables to mention"}
      placeholder="Click here to add a note"
      className="mentions"
      onKeyDown={onKeyDown}
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
    </MentionsInput>
  );
}

export default Mentionable;
