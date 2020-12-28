import React, { useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NotebookDataService from "../../services/notebook.service";
import Button from "react-bootstrap/Button";
import NoteDataService from "../../services/note.service";
import InlineEditor from "../inline_editor.component";
import Person from "../icons/person.component";
import House from "../icons/house.component";
import Gem from "../icons/gem.component";
import "../../scss/show.scss";

function Show(props) {
  // ID of notebook to show, taken from params
  const { id } = useParams();

  // Define callbacks for GETting and SETting the component state
  const [name, setName] = useState("");
  const [content, setContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const history = useHistory();

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

  // Empty text box when note added and display success message
  const clearContent = (response) => {
    setContent(null);

    // TODO: Retrieve success message from response
    setSuccessMessage("Your note has been added");
  };

  // Programmatically handle navigation to support accessible buttons
  const viewNotables = (type) => {
    history.push(`/notebooks/${id}/${type}`);
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

        <section className="d-inline-flex justify-content-between w-100">
          <Button
            variant="link"
            onClick={() => {
              viewNotables("characters");
            }}
          >
            <Person title={`View characters for ${name}`} />
          </Button>

          <Button
            variant="link"
            onClick={() => {
              viewNotables("locations");
            }}
          >
            <House title={`View locations for ${name}`} />
          </Button>

          <Button
            variant="link"
            onClick={() => {
              viewNotables("items");
            }}
          >
            <Gem title={`View items for ${name}`} />
          </Button>
        </section>

        <h1>Unlinked Notes</h1>
      </div>
    </div>
  );
}

export default Show;
