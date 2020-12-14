import React, { useState } from "react";
import Text from "../inline-editors/text.component";
import TextArea from "../inline-editors/textarea.component";
import Button from "react-bootstrap/Button";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);

  return (
    <div>
      <Text
        value={name}
        id={props.id}
        model="notebook"
        param="name"
        fontSize="2rem"
      ></Text>

      <TextArea
        value={summary}
        id={props.id}
        model="notebook"
        param="summary"
      ></TextArea>

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
