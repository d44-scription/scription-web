import React, { useEffect, useState } from "react";
import Mentionable from "../../editors/mentionable.component";
import Button from "react-bootstrap/Button";
import NoteDataService from "../../../services/note.service";
import NotableDataService from "../../../services/notable.service";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [content, setContent] = useState("");

  // Onload retrieve notable from API to allow use of text code
  useEffect(()=> {
    NotableDataService.get(props.notebookId, props.notableId)
    .then((response) => {
      setContent(`${response.data.text_code} `)
    })
    .catch((e) => {
      console.log(e);
    })
  }, [props.notebookId, props.notableId])

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
      <h2>Note contents</h2>

      <Mentionable
        value={content}
        setValue={setContent}
        notebookId={props.notebookId}
        action={submitNote}
        postSubmitAction={updatePage}
        placeholder="Click here to add a note"
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
