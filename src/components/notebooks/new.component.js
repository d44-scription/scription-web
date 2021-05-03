import React, { useState } from "react";
import InlineEditor from "components/editors/inline_editor.component";
import Button from "react-bootstrap/Button";
import NotebookDataService from "services/notebook.service";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name, setName] = useState("");

  const saveNotebook = () => {
    return NotebookDataService.create(name);
  };
  // OnCreateAction - Set state in parent props to reflect new addition
  const updatePage = (response) => {
    props.setNewRecord(false);
    props.retrieveNotebooks(response.data.id);
  };

  return (
    <div>
      <InlineEditor
        value={name}
        setValue={setName}
        action={saveNotebook}
        onSubmitAction={updatePage}
        fontSize="2rem"
        formLabel="Notebook Name"
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
