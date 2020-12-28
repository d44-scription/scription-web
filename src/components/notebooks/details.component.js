import React, { useEffect, useState } from "react";
import Edit from "./edit.component";
import New from "./new.component";
import Button from "react-bootstrap/Button";

// Middle-man component that asses state of index page and decides which sub-component to show
function Details(props) {
  const [newRecord, setNewRecord] = useState(false);

  // When selected ID is changed, default to regular view
  // If a user starts creating a new notebook, then selects & deselects an existing one,
  // this stops them from returning to an empty form
  useEffect(() => {
    setNewRecord(false);
  }, [props.id]);

  // Decide which panel to show
  if (props.id) {
    return (
      // If a notebook has been selected, show the notebook
      <div className="col-md-6">
        <h2>Edit Notebook</h2>
        <Edit id={props.id} retrieveNotebooks={props.retrieveNotebooks} />
      </div>
    );
  } else if (newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add new notebook" button, render the new notebook form
      <div className="col-md-6">
        <h2>Name notebook</h2>
        <New
          setNewRecord={setNewRecord}
          setId={props.setId}
          retrieveNotebooks={props.retrieveNotebooks}
        />
      </div>
    );
  } else {
    return (
      // By default, just show a button to add a new notebook
      <div className="col-md-6">
        <Button
          onClick={() => {
            setNewRecord(true);
          }}
          className="w-100"
        >
          Add new notebook
        </Button>
      </div>
    );
  }
}

export default Details;
