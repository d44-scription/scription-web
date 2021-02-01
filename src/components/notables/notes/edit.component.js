import React, { useState, useCallback, useEffect } from "react";
import NoteDataService from "../../../services/note.service";
import Mentionable from "../../editors/mentionable.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../../modal.component";

function Edit(props) {
  const [content, setContent] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback to update the displayed note
  const retrieveNote = useCallback(() => {
    NoteDataService.get(props.notebookId, props.id)
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setContent, props.id, props.notebookId]);

  // Update note when the given id prop changes
  useEffect(() => {
    retrieveNote(props.id);
  }, [props.id, retrieveNote]);

  // Send PUT request
  const submitNote = useCallback(() => {
    NoteDataService.update(props.notebookId, props.id, "content", content)
      .then((response) => {
        setErrorMessage(null);
        setSuccessMessage(
          `Note has been updated. ${response.data.success_message}`
        );
      })
      .catch((e) => {
        setErrorMessage(e.response.data.join(", "));
      });
  }, [content, props.id, props.notebookId]);

  // Send DELETE request
  const deleteNote = useCallback(() => {
    NoteDataService.delete(props.notebookId, props.id)
      .then(() => {
        setIsModalVisible(false);
        props.retrieveNotes();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props, setIsModalVisible]);

  // When content is changed, reset success message
  useEffect(() => {
    setSuccessMessage(null);
  }, [content]);

  return (
    <div className="col-md-6">
      <Mentionable
        value={content}
        setValue={setContent}
        notebookId={props.notebookId}
        onSubmit={submitNote}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <Button
        variant="danger"
        className="mt-2 w-100"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Delete Note
      </Button>

      <ConfirmModal
        visible={isModalVisible}
        title="Delete note?"
        text="This note will be deleted. Are you sure you wish to continue?"
        confirmAction={deleteNote}
        closeAction={() => setIsModalVisible(false)}
      />
    </div>
  );
}

export default Edit;
