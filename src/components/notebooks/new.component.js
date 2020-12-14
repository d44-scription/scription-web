import React, { useState } from "react";
import Text from "../inline-editors/text.component";
import Button from "react-bootstrap/Button";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name] = useState(null);

  const saveNotebook = (id) => {
    props.setNewRecord(false);
    props.setId(id);
    props.retrieveNotebooks(id);
  };

  return (
    <div>
      <Text
        value={name}
        id={props.id}
        model="notebook"
        param="name"
        fontSize="2rem"
        onCreateAction={saveNotebook}
      ></Text>

      <Button
        variant="secondary"
        onClick={() => {
          props.setNewRecord(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default New;
