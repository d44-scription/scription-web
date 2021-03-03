import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Search from "components/search.component";
import List from "components/list.component";
import NotableDataService from "services/notable.service";
import Details from "./details.component";
import Button from "react-bootstrap/Button";
import Helper from "helpers/notable_helper";

function Index(props) {
  const history = useHistory();
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

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotables();
  }, [retrieveNotables]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">{props.type}</h2>

        {renderSearch()}

        <Button onClick={showNew} className="w-100 mb-3">
          Add {Helper.singular(props.type)}
        </Button>

        <List
          currentId={currentId}
          setCurrentId={showItem}
          items={queriedNotables}
          doubleClickAction={(id) => {
            history.push(`/notebooks/${notebookId}/${props.type}/${id}`);
          }}
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

export default Index;
