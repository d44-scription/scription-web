import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Notebook from "./notebook.component";
import ConfirmModal from "../modal.component";
import ListGroup from "react-bootstrap/ListGroup";
import useKeypress from "../../hooks/useKeypress";
import "../../scss/list.scss";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [notebooks, setNotebooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentId, setCurrentId] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  // Callback to update the displayed notebooks
  const retrieveNotebooks = useCallback(() => {
    NotebookDataService.index()
      .then((response) => {
        setNotebooks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotebooks]);

  // Fetch list of notebooks on load
  useEffect(() => {
    retrieveNotebooks();
  }, [retrieveNotebooks]);

  const showModal = useCallback(
    (id, name) => {
      setIsModalVisible(true);
      setCurrentId(id);
      setModalText(
        `This will delete ${name} and all it's associated notes. Are you sure you wish to continue?`
      );
    },
    [setIsModalVisible, setCurrentId, setModalText]
  );

  // Callback used when the delete icon is clicked
  const deleteNotebook = useCallback(
    (id) => {
      let sliced_notebooks = notebooks.slice();
      let remainingNotebooks = sliced_notebooks.filter((nb) => nb.id !== id);

      NotebookDataService.delete(id)
        .then(() => {
          setNotebooks(remainingNotebooks);
          setCurrentIndex(-1);
          setCurrentId(null);

          setIsModalVisible(false);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [notebooks, setNotebooks, setCurrentIndex, setCurrentId]
  );

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

  // Callback for enter key
  useKeypress(
    "Enter",
    () => {
      const el = document.activeElement
      const id = el.getAttribute("listid");
      const index = el.getAttribute("listindex");

      if (id && index) {
        setActiveNotebook(id, index)
      }
    },
    []
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
                <section className="d-inline-flex justify-content-between w-100 align-items-center">
                  <p style={{ margin: "0.75rem" }}>{notebook.name}</p>

                  <svg
                    onClick={() => showModal(notebook.id, notebook.name)}
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-archive link"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby={`title${index}`}
                  >
                    <title id={`title${index}`}>Delete {notebook.name}</title>
                    <path
                      fillRule="evenodd"
                      d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </section>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>

      <div className="col-md-6">
        {currentId ? (
          <Notebook id={currentId}></Notebook>
        ) : (
          <div>
            <br />
            <p>Please click on a Notebook...</p>
          </div>
        )}
      </div>

      <ConfirmModal
        visible={isModalVisible}
        title="Delete notebook?"
        text={modalText}
        confirmAction={() => {
          deleteNotebook(currentId);
        }}
        closeAction={() => setIsModalVisible(false)}
      ></ConfirmModal>
    </div>
  );
}

export default Index;
