import React, { useCallback, useState, useEffect } from "react";
import NotableDataService from "../../services/notable.service";
import InlineEditor from "../editors/inline_editor.component";
import Mentionable from "../editors/mentionable.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../modal.component";
import Helper from "../../helpers/notable_helper";
import { Link } from "react-router-dom";

function Edit(props) {
  // State management for name & description fields for target notable
  const [name, setName] = useState(null);
  const [description, setDescription] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to retrieve target notable
  const retrieveNotable = useCallback(
    (id) => {
      NotableDataService.get(props.notebookId, id)
        .then((response) => {
          const notable = response.data;

          setName(notable.name);
          setDescription(notable.description || "");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [setName, setDescription, props.notebookId]
  );

  // Callback used when the delete is confirmed
  const deleteNotable = useCallback(() => {
    NotableDataService.delete(props.notebookId, props.id)
      .then(() => {
        setIsModalVisible(false);
        props.retrieveNotables();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props, setIsModalVisible]);

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

      <Mentionable
        value={description}
        setValue={setDescription}
        notebookId={props.notebookId}
        action={saveDescription}
      />

      <Link
        to={`/notebooks/${props.notebookId}/${props.type}/${props.id}`}
        tabIndex="-1"
      >
        <Button variant="primary" className="mt-5 w-100">
          View {Helper.singular(props.type)}
        </Button>
      </Link>

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
