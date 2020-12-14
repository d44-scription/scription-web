import React, { useState } from "react";
import Edit from "./edit.component";
import New from "./new.component";
import Button from "react-bootstrap/Button";

function Details(props) {
  const [newRecord, setNewRecord] = useState(false);

  // Middle-man component that asses state of index page and decides which sub-component to show
  if (props.id) {
    return (
      // If a notebook has been selected, show the notebook
      <div className="col-md-6">
        <h1>Edit Notebook</h1>
        <Edit id={props.id} retrieveNotebooks={props.retrieveNotebooks} />
      </div>
    );
  } else if (newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add new notebook" button, render the new notebook form
      <div className="col-md-6">
        <h1>Add new notebook</h1>
        <New id={0} setNewRecord={setNewRecord} />
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
