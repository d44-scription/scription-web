import React, { useEffect, useState } from "react";
import Mentionable from "components/editors/mentionable.component";
import Button from "react-bootstrap/Button";
import NoteDataService from "services/note.service";
import NotableDataService from "services/notable.service";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [content, setContent] = useState("");

  // Onload retrieve notable from API to allow use of text code
  useEffect(() => {
    if (props.notableId) {
      NotableDataService.get(props.notebookId, props.notableId).then(
        (response) => {
          setContent(`${response.data.text_code} `);
        }
      );
    }
  }, [props.notebookId, props.notableId]);

  const submitNote = () => {
    return NoteDataService.create(props.notebookId, content);
  };

  // OnCreateAction - Set state in parent props to reflect new addition
  const updatePage = (response) => {
    props.setNewRecord(false);
    props.retrieveNotes(response.data.id);
  };

  return (
    <div>
      <Mentionable
        value={content}
        setValue={setContent}
        notebookId={props.notebookId}
        action={submitNote}
        onSubmitAction={updatePage}
        placeholder="Note contents"
        clearOnCancel
      />

      <Button
        variant="secondary"
        onClick={() => {
          props.setNewRecord(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default New;
