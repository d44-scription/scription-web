import React, { useState } from "react";
import InlineEditor from "../inline_editor.component";
import Button from "react-bootstrap/Button";
import NotableDataService from "../../services/notable.service";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name, setName] = useState(null);

  return (
    <div>
      <h2>Enter name</h2>

      <InlineEditor
        value={name}
        setValue={setName}
        placeholder="Enter Name"
        fontSize="2rem"
      />

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
