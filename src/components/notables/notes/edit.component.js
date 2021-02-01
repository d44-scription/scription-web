import React, { useState, useCallback, useEffect } from "react";
import NoteDataService from "../../../services/note.service";
import Mentionable from "../../editors/mentionable.component";

function Edit(props) {
  const [content, setContent] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Callback to update the displayed note
  const retrieveNote = useCallback(() => {
    NoteDataService.get(props.notebookId, props.id)
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setContent, props.id, props.notebookId]);

  // Update note when the given id prop changes
  useEffect(() => {
    retrieveNote(props.id);
  }, [props.id, retrieveNote]);

  // Send PUT request
  const submit = (response) => {
    NoteDataService.update(props.notebookId, props.id, "content", content)
      .then((response) => {
        setErrorMessage(null);
        setSuccessMessage(
          `Note has been updated. ${response.data.success_message}`
        );
      })
      .catch((e) => {
        setErrorMessage(e.response.data.join(", "));
      });
  };

  // When content is changed, reset success message
  useEffect(() => {
    setSuccessMessage(null);
  }, [content]);

  return (
    <Mentionable
      value={content}
      setValue={setContent}
      notebookId={props.notebookId}
      onSubmit={submit}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
}

export default Edit;
