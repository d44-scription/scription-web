import react, { useCallback, useState, useEffect } from "react";
import NotableDataService from "../../services/notable.service";
import InlineEditor from "../editors/inline_editor.component";

function Edit(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

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

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotable(props.id);
  }, [props.id, retrieveNotable]);

  const saveName = () => {
    return NotableDataService.update(props.notebookId, props.id, "name", name);
  };

  const saveDescription = () => {
    return NotableDataService.update(props.notebookId, props.id, "description", description);
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
    </div>
  );
}

export default Edit;
