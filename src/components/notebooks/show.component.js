import React, { useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NotebookDataService from "services/notebook.service";
import Button from "react-bootstrap/Button";
import NoteDataService from "services/note.service";
import Person from "components/icons/person.component";
import House from "components/icons/house.component";
import Gem from "components/icons/gem.component";
import "scss/show.scss";
import Mentionable from "components/editors/mentionable.component";

function Show(props) {
  // ID of notebook to show, taken from params
  const { id } = useParams();

  // Define callbacks for GETting and SETting the component state
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [previewId, setPreviewId] = useState(0);
  const [preview, setPreview] = useState("");

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

  // Send POST request
  const submitNote = () => {
    return NoteDataService.create(id, content);
  };

  // Programmatically handle navigation to support accessible buttons
  const viewNotables = (type) => {
    history.push(`/notebooks/${id}/${type}`);
  };

  const onSubmitAction = (response) => {
    setPreviewId(response.data.id)
    setPreview(response.data.content)
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2>{name}</h2>

        <Mentionable
          value={content}
          setValue={setContent}
          notebookId={id}
          action={submitNote}
          onSubmitAction={onSubmitAction}
          placeholder="Click here to add a note"
          clearOnCancel
          clearOnSubmit
        />

        <section className={`mt-5 ${preview ? "" : "d-none"}`}>
          <h2>Recently Added</h2>

          <Mentionable
            value={preview}
            setValue={setPreview}
            notebookId={id}
            placeholder="No content to show"
          />
        </section>
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
