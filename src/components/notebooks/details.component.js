import React from "react";
import Edit from "./edit.component";
import New from "./new.component";

// Middle-man component to assess state of index page and decide which sub-component to show
function Details(props) {
  const setNewRecord = props.setNewRecord;

  // Decide which panel to show
  if (props.id) {
    return (
      // If a notebook has been selected, show the notebook
      <div className="col-md-6">
        <h2>Edit Notebook</h2>
        <Edit id={props.id} retrieveNotebooks={props.retrieveNotebooks} />
      </div>
    );
  } else if (props.newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add Notebook" button, render the new notebook form
      <div className="col-md-6">
        <h2>Name notebook</h2>
        <New
          setNewRecord={setNewRecord}
          retrieveNotebooks={props.retrieveNotebooks}
        />
      </div>
    );
  }

  return null;
}

export default Details;
