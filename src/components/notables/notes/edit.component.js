import React, { useState, useCallback, useEffect } from "react";
import NoteDataService from "../../../services/note.service";

function Edit (props) {
  const [content, setContent] = useState(null);

  // Callback to update the displayed note
  const retrieveNote = useCallback(() => {
    NoteDataService.get(props.notebookId, props.id)
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setContent, props.id]);

  // Update note when the given id prop changes
  useEffect(() => {
    retrieveNote(props.id);
  }, [props.id, retrieveNote]);

  return <p>{content}</p>;
}

export default Edit;
