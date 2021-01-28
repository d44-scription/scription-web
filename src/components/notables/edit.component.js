import react, { useCallback, useState, useEffect } from "react";
import NotableDataService from "../../services/notable.service";
import InlineEditor from "../editors/inline_editor.component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Edit(props) {
  // State management for name & description fields for target notable
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  // Function to retrieve target notable
  const retrieveNotable = useCallback(
    (id) => {
      NotableDataService.get(props.notebookId, id)
        .then((response) => {
          const notable = response.data;

          setName(notable.name);
          setDescription(notable.description);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setName, setDescription]
  );

  // Update notable when the given id prop changes
  useEffect(() => {
    retrieveNotable(props.id);
  }, [props.id, retrieveNotable]);

  // Functions to submit data to API when inline editor dictates
  const saveName = () => {
    return NotableDataService.update(props.notebookId, props.id, "name", name);
  };

  const saveDescription = () => {
    return NotableDataService.update(
      props.notebookId,
      props.id,
      "description",
      description
    );
  };

  return (
    <div>
      <InlineEditor
        value={name}
        setValue={setName}
        action={saveName}
        placeholder="No name saved"
        fontSize="2rem"
      />

      <InlineEditor
        value={description}
        type="textarea"
        setValue={setDescription}
        action={saveDescription}
        placeholder="No description saved"
        helpText="Use shift+enter to add a new line"
      />

      <Link
        to={`/notebooks/${props.notebookId}/${props.type}/${props.id}`}
        tabIndex="-1"
      >
        <Button variant="primary" className="mt-5 w-100">
          View {props.singularType}
        </Button>
      </Link>
    </div>
  );
}

export default Edit;
