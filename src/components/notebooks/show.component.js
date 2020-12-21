import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotebookDataService from "../../services/notebook.service";

function Show(props) {
  const { id } = useParams();

  // Define callbacks for GETting and SETting the component state
  const [name, setName] = useState([]);

  // Callback to update the displayed notebook
  const retrieveNotebook = useCallback(
    () => {
      NotebookDataService.get(id)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setName, id]
  );

  // Fetch list of notebook on load
  useEffect(() => {
    retrieveNotebook();
  }, [retrieveNotebook]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h1>{name || "Notebook"}</h1>
      </div>
    </div>
  );
}

export default Show;
