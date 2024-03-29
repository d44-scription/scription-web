import React, { useCallback, useState, useEffect } from "react";
import NotableDataService from "services/notable.service";
import InlineEditor from "components/editors/inline_editor.component";
import Mentionable from "components/editors/mentionable.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "components/confirm-modal.component";
import Helper from "helpers/notable_helper";
import { Link } from "react-router-dom";

function Edit(props) {
  // State management for name & description fields for target notable
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const retrieveNotables = props.retrieveNotables;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to retrieve target notable
  const retrieveNotable = useCallback(
    (id) => {
      NotableDataService.get(props.notebookId, id).then((response) => {
        const notable = response.data;

        setName(notable.name);
        setDescription(notable.description || "");
      });
    },
    [setName, setDescription, props.notebookId]
  );

  // Callback used when the delete is confirmed
  const deleteNotable = useCallback(() => {
    NotableDataService.delete(props.notebookId, props.id).then(() => {
      setIsModalVisible(false);
      retrieveNotables();
    });
  }, [props.notebookId, props.id, retrieveNotables, setIsModalVisible]);

  // Update notable when the given id prop changes
  useEffect(() => {
    retrieveNotable(props.id);
  }, [props.id, retrieveNotable]);

  // Functions to submit data to API when inline editor dictates
  const saveName = () => {
    return NotableDataService.update(props.notebookId, props.id, "name", name);
  };

  // Sync list of notes after edit
  const syncList = () => {
    props.retrieveNotables(props.id);
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
        onSubmitAction={syncList}
        formLabel={`${Helper.singular(props.type)} Name`}
        fontSize="2rem"
      />

      <Mentionable
        value={description}
        setValue={setDescription}
        notebookId={props.notebookId}
        action={saveDescription}
        placeholder="No description saved"
        formLabel={`${Helper.singular(props.type)} Description`}
      />

      <Button
        to={`/notebooks/${props.notebookId}/${props.type}/${props.id}`}
        as={Link}
        variant="primary"
        className="mt-5 w-100"
      >
        View {Helper.singular(props.type)}
      </Button>

      <Button
        variant="danger"
        className="mt-2 w-100"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Delete {Helper.singular(props.type)}
      </Button>

      <ConfirmModal
        visible={isModalVisible}
        title={`Delete ${Helper.singular(props.type)}?`}
        text={`This will delete ${name} and all associated notes. Are you sure you wish to continue?`}
        confirmAction={deleteNotable}
        closeAction={() => setIsModalVisible(false)}
      />
    </div>
  );
}

export default Edit;
