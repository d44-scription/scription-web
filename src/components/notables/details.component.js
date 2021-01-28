import React, { useEffect, useState } from "react";
import New from "./new.component";
import Button from "react-bootstrap/Button";

// Middle-man component to assess state of index page and decide which sub-component to show
function Details(props) {
  const [newRecord, setNewRecord] = useState(false);

  // When selected ID is changed, default to regular view
  // If a user starts creating a new notable, then selects & deselects an existing one,
  // this stops them from returning to an empty form
  useEffect(() => {
    setNewRecord(false);
  }, [props.id]);

  // Decide which panel to show
  if (props.id) {
    return (
      // If a notable has been selected, show the notable
      <div className="col-md-6">Edit char form</div>
    );
  } else if (newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add new notable" button, render the new notable form
      <div className="col-md-6">
        <New
          setNewRecord={setNewRecord}
          retrieveNotables={props.retrieveNotables}
          notebookId={props.notebookId}
          type={props.type}
        />
      </div>
    );
  } else {
    return (
      // By default, just show a button to add a new notable
      <div className="col-md-6">
        <Button
          onClick={() => {
            setNewRecord(true);
          }}
          className="w-100"
        >
          Add {props.type}
        </Button>
      </div>
    );
  }
}

export default Details;
