import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Search from "../search.component";
import List from "../list.component";
import NotableDataService from "../../services/notable.service";
import Details from "./details.component";
import Button from "react-bootstrap/Button";
import Helper from "../../helpers/notable_helper";

function Show(props) {
  const { notebookId } = useParams();

  const [notables, setNotables] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  // Manage state of new page
  const [newRecord, setNewRecord] = useState(false);

  // Filtered notables
  const [queriedNotables, setQueriedNotables] = useState([]);

  const retrieveNotables = useCallback(
    (id) => {
      NotableDataService.index(notebookId, props.type)
        .then((response) => {
          setNotables(response.data);
          setCurrentId(id || null);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setNotables, notebookId, props.type]
  );

  // Conditionally render search bar
  const renderSearch = () => {
    if (notables.length) {
      return (
        <Search
          items={notables}
          queriedItems={queriedNotables}
          setQueriedItems={setQueriedNotables}
        />
      );
    }
  };

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotables();
  }, [retrieveNotables]);

  // Event handler for switching to "New" page
  const showNew = () => {
    setNewRecord(true);
    setCurrentId(null);
  };

  // Set current ID & reset new page view
  const showItem = (id) => {
    setNewRecord(false);
    setCurrentId(id);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">{props.type}</h2>

        {renderSearch()}

        <div className="col-md-6">
          <Button
            onClick={showNew}
            className="w-100"
          >
            Add {Helper.singular(props.type)}
          </Button>
        </div>

        <List
          currentId={currentId}
          setCurrentId={showItem}
          items={queriedNotables}
          label="name"
        />
      </div>

      <Details
        id={currentId}
        retrieveNotables={retrieveNotables}
        type={props.type}
        notebookId={notebookId}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
    </div>
  );
}

export default Show;
