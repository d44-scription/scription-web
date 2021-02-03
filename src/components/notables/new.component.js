import React, { useState } from "react";
import InlineEditor from "../editors/inline_editor.component";
import Button from "react-bootstrap/Button";
import NotableDataService from "../../services/notable.service";
import Helper from "../../helpers/notable_helper";

function New(props) {
  // Define callbacks for GETting and SETting the values used by component
  const [name, setName] = useState("");

  const saveNotable = () => {
    return NotableDataService.create(
      props.notebookId,
      name,
      Helper.singular(props.type)
    );
  };

  // OnCreateAction - Set state in parent props to reflect new addition
  const updatePage = (response) => {
    props.setNewRecord(false);
    props.retrieveNotables(response.data.id);
  };

  return (
    <div>
      <h2>Name {Helper.singular(props.type)}</h2>

      <InlineEditor
        value={name}
        setValue={setName}
        action={saveNotable}
        onSubmitAction={updatePage}
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
