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
      <div className="col-md-6 my-lg-0 my-4">
        <Edit
          id={props.id}
          notebookId={props.notebookId}
          retrieveNotes={props.retrieveNotes}
        />
      </div>
    );
  } else if (props.newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add notable" button, render the new notable form
      <div className="col-md-6 my-lg-0 my-4">
        <New
          setNewRecord={setNewRecord}
          retrieveNotes={props.retrieveNotes}
          notebookId={props.notebookId}
          notableId={props.notableId}
        />
      </div>
    );
  }

  return null;
}

export default Details;
