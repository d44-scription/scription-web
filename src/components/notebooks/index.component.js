import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Details from "./details.component";
import List from "../list.component";
import Search from "../search.component";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [notebooks, setNotebooks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  // Filtered notebooks
  const [queriedNotebooks, setQueriedNotebooks] = useState([]);

  // Callback to update the displayed notebooks
  const retrieveNotebooks = useCallback(
    (id) => {
      NotebookDataService.index()
        .then((response) => {
          setNotebooks(response.data);
          setCurrentId(id || null);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setNotebooks, setCurrentId]
  );

  // Fetch list of notebooks on load
  useEffect(() => {
    retrieveNotebooks();
  }, [retrieveNotebooks]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2>Notebooks</h2>

        <Search items={notebooks} queriedItems={queriedNotebooks} setQueriedItems={setQueriedNotebooks} />

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={queriedNotebooks}
        />
      </div>

      <Details id={currentId} retrieveNotebooks={retrieveNotebooks} />
    </div>
  );
}

export default Index;
