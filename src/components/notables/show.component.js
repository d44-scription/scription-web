import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import List from "../list.component";
import NotableDataService from "../../services/notable.service";

function Show(props) {
  const { notebookId, id } = useParams();

  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const retrieveNotes = useCallback(() => {
    NotableDataService.notes(notebookId, id)
      .then((response) => {
        setNotes(response.data);

        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotes, notebookId, id]);

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotes();
  }, [retrieveNotes]);

  const truncate = (text) => {
    if (text.length > 300) {
      return `${text.substr(0, 300)}...`;
    } else {
      return text;
    }
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">{props.type}</h2>

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={notes}
          label="content"
        />
      </div>
    </div>
  );
}

export default Show;
