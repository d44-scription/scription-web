import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import List from "../list.component";
import NotableDataService from "../../services/notable.service";
import Edit from "./notes/edit.component";

function Show(props) {
  const { notebookId, id } = useParams();

  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const retrieveNotes = useCallback(() => {
    NotableDataService.notes(notebookId, id)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotes, notebookId, id]);

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotes();
  }, [retrieveNotes]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">Notes</h2>

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={notes}
          label="content"
          mentionable
        />
      </div>

      <div className="col-md-6">
        {currentId ? <Edit id={currentId} /> : <p>no id</p>}
      </div>
    </div>
  );
}

export default Show;
