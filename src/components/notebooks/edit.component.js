import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Text from "../inline_editor.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../modal.component";

function Edit(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback to update the displayed notebook
  const retrieveNotebook = useCallback(
    (id) => {
      NotebookDataService.get(id)
        .then((response) => {
          const notebook = response.data;

          setName(notebook.name);
          setSummary(notebook.summary);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setName, setSummary]
  );

  // Callback used when the delete icon is clicked
  const deleteNotebook = useCallback(() => {
    NotebookDataService.delete(props.id)
      .then(() => {
        setIsModalVisible(false);
        props.retrieveNotebooks();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props, setIsModalVisible]);

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotebook(props.id);
  }, [props.id, retrieveNotebook]);

  const saveName = () => {
    return NotebookDataService.update(props.id, "notebook", "name", name);
  };

  const saveSummary = () => {
    return NotebookDataService.update(props.id, "notebook", "name", name);
  };

  return (
    <div>
      <Text
        value={name}
        setValue={setName}
        action={saveName}
        placeholder="No name saved"
        fontSize="2rem"
      ></Text>

      <Text
        value={summary}
        type="textarea"
        setValue={setSummary}
        action={saveSummary}
        placeholder="No summary saved"
        helpText="Use shift+enter to add a new line"
      ></Text>

      <Button
        variant="danger"
        className="mt-5"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Delete notebook
      </Button>

      <ConfirmModal
        visible={isModalVisible}
        title="Delete notebook?"
        text={`This will delete ${name} and all associated notes. Are you sure you wish to continue?`}
        confirmAction={deleteNotebook}
        closeAction={() => setIsModalVisible(false)}
      ></ConfirmModal>
    </div>
  );
}

export default Edit;
