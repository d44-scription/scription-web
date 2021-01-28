import react, { useCallback, useState, useEffect } from "react";
import NotableDataService from "../../services/notable.service";
import InlineEditor from "../editors/inline_editor.component";

function Edit(props) {
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);

  const retrieveNotable = useCallback(
    (id) => {
      NotableDataService.get(props.notebookId, id)
        .then((response) => {
          const notable = response.data;

          setName(notable.name);
          setSummary(notable.summary);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setName, setSummary]
  );

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotable(props.id);
  }, [props.id, retrieveNotable]);

  const saveName = () => {
    return NotableDataService.update(props.notebookId, props.id, "name", name);
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
    </div>
  );
}

export default Edit;
