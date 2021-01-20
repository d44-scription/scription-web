import React, { useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NotebookDataService from "../../services/notebook.service";
import Button from "react-bootstrap/Button";
import NoteDataService from "../../services/note.service";
import Person from "../icons/person.component";
import House from "../icons/house.component";
import Gem from "../icons/gem.component";
import "../../scss/show.scss";
import Mentionable from "../editors/mentionable.component";

function Show(props) {
  // ID of notebook to show, taken from params
  const { id } = useParams();

  // Define callbacks for GETting and SETting the component state
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [errorMessage, setErrorMessage] = useState(null)
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
    if (content !== "") {
      setSuccessMessage(null);
    }
  }, [content]);

  // Send POST request
  const submitNote = () => {
    NoteDataService.create(content, id)
    .then(() => {
      // Empty text box when note added and display success message
      setContent("");

      // TODO: Retrieve success message from response
      // TODO: Refactor this to be part of mentionable
      setSuccessMessage("Your note has been added");
    })
    .catch((e) => {
      // TODO: Error handling the same way inline editors do
      console.log(e)
    });
  };

  // Programmatically handle navigation to support accessible buttons
  const viewNotables = (type) => {
    history.push(`/notebooks/${id}/${type}`);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2>{name}</h2>

        <Mentionable
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          notebookId={id}
          onSubmit={submitNote}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </div>

      <div className="col-md-6">
        <h2>Notables</h2>

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

        <h2>Unlinked Notes</h2>
      </div>
    </div>
  );
}

export default Show;
