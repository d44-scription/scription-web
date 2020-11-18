import React, { useState, useCallback, useEffect } from "react";
import NotebookDataService from "../../services/notebook.service";
import Text from "../inline-editors/text.component";
import TextArea from "../inline-editors/textarea.component";

function Notebook(props) {
  // Define callbacks for GETting and SETting the rest & busy states of the component
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);
  const [notes, setNotes] = useState([]);

  // Update notebook when the given id prop changes
  useEffect(() => {
    retrieveNotebook(props.id)
  }, [props.id])

  // Callback to update the displayed notebook
  const retrieveNotebook = useCallback((id) => {
    NotebookDataService.get(id)
      .then(response => {
        const notebook = response.data

        setName(notebook.name)
        setSummary("MOCK SUMMARY\nOn multiple lines\n\nFin")
        setNotes(notebook.notes)
      })
      .catch(e => {
        console.log(e);
      });
  }, [setName, setSummary, setNotes]);

  return (
    <div>
      <Text
        value={name}
        id={props.id}
        model="notebook"
        param="name"
        fontSize="2rem">
      </Text>

      <TextArea
        value={summary}
        id={props.id}
        model="notebook"
        param="summary">
      </TextArea>

      {notes &&
        notes.map((note, index) => (
          <li
            key={index}
          >
            {note.content}
          </li>
        ))}
    </div>
  );
}

export default Notebook;
