import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../list.component";
import NotableDataService from "../../services/notable.service";

function Show(props) {
  const { notebookId } = useParams();

  const [notables, setNotables] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  // Callback to update the list of chars
  useEffect(() => {
    NotableDataService.index(notebookId, props.type)
      .then((response) => {
        setNotables(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotables, notebookId, props.type]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">{props.type}</h2>

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={notables}
          label="name"
        />
      </div>
    </div>
  );
}

export default Show;
