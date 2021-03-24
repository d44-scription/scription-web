import React, { useState, useCallback, useEffect } from "react";
import NoteDataService from "services/note.service";
import Mentionable from "components/editors/mentionable.component";
import Button from "react-bootstrap/Button";
import ConfirmModal from "components/modal.component";

function Edit(props) {
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const retrieveNotes = props.retrieveNotes;

  // Callback to update the displayed note
  const retrieveNote = useCallback(() => {
    NoteDataService.get(props.notebookId, props.id).then((response) => {
      setContent(response.data.content);
    });
  }, [setContent, props.id, props.notebookId]);

  // Update note when the given id prop changes
  useEffect(() => {
    retrieveNote(props.id);
  }, [props.id, retrieveNote]);

  // Send PUT request
  const submitNote = useCallback(() => {
    return NoteDataService.update(
      props.notebookId,
      props.id,
      "content",
      content
    );
  }, [content, props.id, props.notebookId]);

  // Send DELETE request
  const deleteNote = useCallback(() => {
    NoteDataService.delete(props.notebookId, props.id).then(() => {
      setIsModalVisible(false);
      retrieveNotes();
    });
  }, [props.notebookId, props.id, retrieveNotes, setIsModalVisible]);

  // Sync list of notes after edit
  const syncList = () => {
    retrieveNotes(props.id);
  };

  return (
    <div>
      <Mentionable
        value={content}
        setValue={setContent}
        notebookId={props.notebookId}
        action={submitNote}
        onSubmitAction={syncList}
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
