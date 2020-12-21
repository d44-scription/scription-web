import React, { useState } from "react";
import InlineEditor from "../inline_editor.component";
import Button from "react-bootstrap/Button";
import NotebookDataService from "../../services/notebook.service";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name, setName] = useState(null);

  const saveNotebook = () => {
    return NotebookDataService.create("notebook", "name", name);
  };
  // OnCreateAction - Set state in parent props to reflect new addition
  const updatePage = (id) => {
    props.setNewRecord(false);
    props.setId(id);
    props.retrieveNotebooks(id);
  };

  return (
    <div>
      <InlineEditor
        value={name}
        setValue={setName}
        action={saveNotebook}
        onSubmitActions={updatePage}
        placeholder="Enter Name"
        fontSize="2rem"
      ></InlineEditor>

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
