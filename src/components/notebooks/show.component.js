import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotebookDataService from "../../services/notebook.service";
import NoteDataService from "../../services/note.service";
import InlineEditor from "../inline_editor.component";

function Show(props) {
  const { id } = useParams();

  // Define callbacks for GETting and SETting the component state
  const [name, setName] = useState("");
  const [content, setContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Callback to update the displayed notebook
  const retrieveNotebook = useCallback(() => {
    NotebookDataService.get(id)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setName, id]);

  // Fetch target notebook on load
  useEffect(() => {
    retrieveNotebook();
  }, [retrieveNotebook]);

  // When content is changed away from null state, reset error message
  useEffect(() => {
    if (content !== null) {
      setSuccessMessage(null);
    }
  }, [content]);

  // Send POST request
  const submitNote = () => {
    return NoteDataService.create(content, id);
  };

  const clearContent = (response) => {
    setContent(null);

    // TODO: Retrieve success message from response
    setSuccessMessage("Your note has been added");
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h1>{name}</h1>

        <InlineEditor
          value={content}
          type="textarea"
          setValue={setContent}
          action={submitNote}
          onSubmitAction={clearContent}
          fontSize="1.5rem"
          placeholder="Click here to add a note"
          helpText="Use @ to reference a character, : to reference an item, and # to reference a location"
        ></InlineEditor>

        <p className="success">{successMessage}</p>
      </div>
    </div>
  );
}

export default Show;
