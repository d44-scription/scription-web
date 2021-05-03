import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import List from "components/list.component";
import Search from "components/search.component";
import NotableDataService from "services/notable.service";
import Button from "react-bootstrap/Button";
import Details from "./details.component";

function Show(props) {
  const { notebookId, id } = useParams();

  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [newRecord, setNewRecord] = useState(false);

  // Filtered notes
  const [queriedNotes, setQueriedNotes] = useState([]);

  const retrieveNotes = useCallback(
    (noteId) => {
      NotableDataService.notes(notebookId, id).then((response) => {
        setNotes(response.data);
        setCurrentId(noteId || null);
      });
    },
    [setNotes, notebookId, id]
  );

  const renderSearch = () => {
    if (notes.length) {
      return (
        <Search
          items={notes}
          queriedItems={queriedNotes}
          setQueriedItems={setQueriedNotes}
          label="content"
        />
      );
    }
  };

  const showNew = () => {
    setNewRecord(true);
    setCurrentId(null);
  };

  const showNote = (id) => {
    setNewRecord(false);
    setCurrentId(id);
  };

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotes();
  }, [retrieveNotes]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">Notes</h2>

        {renderSearch()}

        <Button onClick={showNew} className="w-100 mb-3">
          Add Note
        </Button>

        <List
          currentId={currentId}
          setCurrentId={showNote}
          items={queriedNotes}
          label="content"
          mentionable
        />
      </div>

      <Details
        id={currentId}
        notebookId={parseInt(notebookId)}
        notableId={id}
        retrieveNotes={retrieveNotes}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
    </div>
  );
}

export default Show;
