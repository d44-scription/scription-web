import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Notebook from "./notebook.component";

function Notebooks(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [notebooks, setNotebooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentId, setCurrentId] = useState(null);

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotebooks();
  }, [])

  // Callback to update the displayed notebook
  const retrieveNotebooks = useCallback(() => {
    NotebookDataService.index()
      .then(response => {
        setNotebooks(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [setNotebooks]);

  const deleteNotebook = useCallback((id) => {
    let sliced_notebooks = notebooks.slice();
    let remainingNotebooks = sliced_notebooks.filter(nb => (nb.id !== id));

    NotebookDataService.delete(id)
      .then(() => {
        setNotebooks(remainingNotebooks);
        setCurrentIndex(-1);
        setCurrentId(null);
      })
      .catch((e) => {
        console.log(e)
      });
  }, [notebooks, setNotebooks, setCurrentIndex, setCurrentIndex])

  const setActiveNotebook = useCallback((id, index) => {
    setCurrentId(id);
    setCurrentIndex(index);
  }, [setCurrentId, setCurrentIndex]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h1>Notebooks</h1>
        <ul className="list-group">
          {notebooks &&
            notebooks.map((notebook, index) => (
              <li
                key={index}
                className={`list-group-item d-inline-flex justify-content-between ${(index === currentIndex ? "active" : "")}`}
                onClick={() => setActiveNotebook(notebook.id, index)}
              >
                <p>
                  {notebook.name}
                </p>

                <p>
                  <svg
                    onClick={() => deleteNotebook(notebook.id)}
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-archive"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </p>
              </li>
            ))}
        </ul>
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
    </div>
  );
}

export default Notebooks;
