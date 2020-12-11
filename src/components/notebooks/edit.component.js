import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Text from "../inline-editors/text.component";
import TextArea from "../inline-editors/textarea.component";

function Edit(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);

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
    </div>
  );
}

export default Edit;
