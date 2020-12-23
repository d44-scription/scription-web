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

        <Link to={`/notebooks/${id}/locations`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="currentColor"
            className="bi bi-house-door"
            viewBox="0 0 16 16"
          >
            <title>View locations for {name}</title>
            <path
              fillRule="evenodd"
              d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
            />
            <path
              fill-rule="evenodd"
              d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </Link>

        <Link to={`/notebooks/${id}/items`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="currentColor"
            className="bi bi-gem"
            viewBox="0 0 16 16"
          >
            <title>View items for {name}</title>
            <path
              fillRule="evenodd"
              d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z"
            />
          </svg>
        </Link>

        <h1>Unlinked Notes</h1>
      </div>
    </div>
  );
}

export default Show;
