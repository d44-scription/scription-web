import React from "react";
import New from "./new.component";
import Edit from "./edit.component";

// Middle-man component to assess state of index page and decide which sub-component to show
function Details(props) {
  const setNewRecord = props.setNewRecord;

  // Decide which panel to show
  if (props.id) {
    return (
      // If a notable has been selected, show the notable
      <div className="col-md-6">
        <Edit
          notebookId={props.notebookId}
          retrieveNotables={props.retrieveNotables}
          id={props.id}
          type={props.type}
        />
      </div>
    );
  } else if (props.newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add new notable" button, render the new notable form
      <div className="col-md-6">
        <New
          setNewRecord={setNewRecord}
          retrieveNotables={props.retrieveNotables}
          notebookId={props.notebookId}
        />
      </div>
    );
  }

  return null;
}

export default Details;
