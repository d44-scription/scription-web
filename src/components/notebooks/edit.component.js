import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Text from "../inline-editors/text.component";
import TextArea from "../inline-editors/textarea.component";
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
  }, [props, props.id, props.retrieveNotebooks, setIsModalVisible]);

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotebook(props.id);
  }, [props.id, retrieveNotebook]);

  return (
    <div>
      <Text
        value={name}
        id={props.id}
        model="notebook"
        param="name"
        fontSize="2rem"
      ></Text>

      <TextArea
        value={summary}
        id={props.id}
        model="notebook"
        param="summary"
      ></TextArea>

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
