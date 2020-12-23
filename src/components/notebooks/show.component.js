import React, { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

      <div className="col-md-6">
        <h1>Notables</h1>

        <Link to={`/notebooks/${id}/characters`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <title>View characters for {name}</title>
            <path
              fillRule="evenodd"
              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
          </svg>
        </Link>

        <h1>Unlinked Notes</h1>
      </div>
    </div>
  );
}

export default Show;
