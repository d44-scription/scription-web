import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Details from "./details.component";
import ListGroup from "react-bootstrap/ListGroup";
import useKeypress from "../../hooks/useKeypress";
import "../../scss/list.scss";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [notebooks, setNotebooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentId, setCurrentId] = useState(null);

  // Callback to update the displayed notebooks
  const retrieveNotebooks = useCallback((id) => {
    NotebookDataService.index()
      .then((response) => {
        setNotebooks(response.data);
        setCurrentId(id || null);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotebooks, setCurrentId]);

  // Fetch list of notebooks on load
  useEffect(() => {
    retrieveNotebooks();
  }, [retrieveNotebooks]);

  // Callback triggered when list items are clicked
  const setActiveNotebook = useCallback(
    (id, index) => {
      if (currentId === id) {
        setCurrentId(null);
        setCurrentIndex(-1);
      } else {
        setCurrentId(id);
        setCurrentIndex(index);
      }
    },
    [setCurrentId, setCurrentIndex, currentId]
  );

  const setActiveNotebookFromFocus = useCallback(() => {
    const el = document.activeElement;
    const id = el.getAttribute("listid");
    const index = el.getAttribute("listindex");

    if (id && index) {
      setActiveNotebook(id, index);
    }
  }, [setActiveNotebook]);

  // Callback for enter key
  useKeypress(
    "Enter",
    () => {
      setActiveNotebookFromFocus();
    },
    [setActiveNotebook]
  );

  // Callback for space key
  useKeypress(
    " ",
    () => {
      setActiveNotebookFromFocus();
    },
    [setActiveNotebook]
  );

  return (
    <div className="list row">
      <div className="col-md-6">
        <h1>Notebooks</h1>

        <ListGroup as="ul">
          {notebooks &&
            notebooks.map((notebook, index) => (
              <ListGroup.Item
                as="li"
                variant="primary"
                key={index}
                active={index === currentIndex}
                onClick={() => setActiveNotebook(notebook.id, index)}
                tabIndex="0"
                listid={notebook.id}
                listindex={index}
              >
                <p style={{ margin: "0.75rem" }}>{notebook.name}</p>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>

      <Details
        id={currentId}
        retrieveNotebooks={retrieveNotebooks}
        setId={setCurrentId}
      />
    </div>
  );
}

export default Index;
