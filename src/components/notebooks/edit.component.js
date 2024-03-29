import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "services/notebook.service";
import InlineEditor from "components/editors/inline_editor.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "components/confirm-modal.component";
import { Link } from "react-router-dom";

function Edit(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  const retrieveNotebooks = props.retrieveNotebooks;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback to update the displayed notebook
  const retrieveNotebook = useCallback(
    (id) => {
      NotebookDataService.get(id).then((response) => {
        const notebook = response.data;

        setName(notebook.name);
        setSummary(notebook.summary);
      });
    },
    [setName, setSummary]
  );

  // Callback used when the delete icon is clicked
  const deleteNotebook = useCallback(() => {
    NotebookDataService.delete(props.id).then(() => {
      setIsModalVisible(false);
      retrieveNotebooks();
    });
  }, [props.id, retrieveNotebooks, setIsModalVisible]);

  // Sync list of notes after edit
  const syncList = () => {
    retrieveNotebooks(props.id);
  };

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotebook(props.id);
  }, [props.id, retrieveNotebook]);

  const saveName = () => {
    return NotebookDataService.update(props.id, "name", name);
  };

  const saveSummary = () => {
    return NotebookDataService.update(props.id, "summary", summary);
  };

  return (
    <div>
      <InlineEditor
        value={name}
        setValue={setName}
        action={saveName}
        onSubmitAction={syncList}
        fontSize="2rem"
        formLabel="Notebook Name"
      />

      <InlineEditor
        value={summary}
        multiline
        setValue={setSummary}
        action={saveSummary}
        placeholder="No summary saved"
        helpText="Use shift+enter to add a new line"
        formLabel="Notebook Summary"
      />

      <Button
        variant="primary"
        className="mt-5 w-100"
        to={`/notebooks/${props.id}`}
        as={Link}
      >
        Open Notebook
      </Button>

      <Button
        variant="danger"
        className="mt-2 w-100"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Delete Notebook
      </Button>

      <ConfirmModal
        visible={isModalVisible}
        title="Delete Notebook?"
        text={`This will delete ${name} and all associated notes. Are you sure you wish to continue?`}
        confirmAction={deleteNotebook}
        closeAction={() => setIsModalVisible(false)}
      />
    </div>
  );
}

export default Edit;
