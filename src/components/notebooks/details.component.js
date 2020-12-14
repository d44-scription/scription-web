import React, { useState } from "react";
import Edit from "./edit.component";
import New from "./new.component";
import Button from "react-bootstrap/Button";

function Details(props) {
  const [newRecord, setNewRecord] = useState(false);

  if (props.id) {
    return (
      <div className="col-md-6">
        <h1>Edit Notebook</h1>
        <Edit id={props.id} retrieveNotebooks={props.retrieveNotebooks} />
      </div>
    );
  } else if (newRecord) {
    return (
      <div className="col-md-6">
        <h1>Add new notebook</h1>
        <New id={0} setNewRecord={setNewRecord} />
      </div>
    );
  } else {
    return (
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
