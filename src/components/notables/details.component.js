import React, { useEffect, useState } from "react";
import New from "./new.component";
import Edit from "./edit.component";
import Button from "react-bootstrap/Button";

// Middle-man component to assess state of index page and decide which sub-component to show
function Details(props) {
  const [newRecord, setNewRecord] = useState(false);

  // In some use cases the singular of the `type` prop (ie "item" instead of "items") is needed
  // This removes the last character from and capitalises the string. While not perfect, it works
  // for the available notable types.
  const singularType = () => {
    return `${props.type.charAt(0).toUpperCase()}${props.type.slice(1, -1)}`;
  };

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
      <div className="col-md-6">
        <Edit
          notebookId={props.notebookId}
          retrieveNotables={props.retrieveNotables}
          id={props.id}
          type={props.type}
          singularType={singularType()}
        />
      </div>
    );
  } else if (newRecord) {
    return (
      // Otherwise, if the user has clicked the "Add new notable" button, render the new notable form
      <div className="col-md-6">
        <New
          setNewRecord={setNewRecord}
          retrieveNotables={props.retrieveNotables}
          notebookId={props.notebookId}
          type={singularType()}
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
          Add {singularType()}
        </Button>
      </div>
    );
  }
}

export default Details;
