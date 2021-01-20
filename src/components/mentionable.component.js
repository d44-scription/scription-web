import React, { useCallback } from "react";
import { MentionsInput, Mention } from "react-mentions";
import NotableDataService from "../services/notable.service";

function Mentionable(props) {
  const fetchCharacters = useCallback(
    (query, callback) => {
      if (!query) return;

      NotableDataService.index(props.notebookId, "characters", query)
        // Transform response data to what react-mentions expects
        .then((response) =>
          response.data.map((character) => ({
            display: character.name,
            id: character.id,
          }))
        )
        .then(callback);
    },
    [props.notebookId]
  );

  return (
    <MentionsInput
      value={props.value}
      onChange={props.onChange}
      a11ySuggestionsListLabel={"Suggested notables to mention"}
      placeholder="Click here to add a note"
      className="mentions"
    >
      <Mention
        trigger="@"
        data={fetchCharacters}
        markup="@[__display__](__id__)"
      />
    </MentionsInput>
  );
}

export default Mentionable;
