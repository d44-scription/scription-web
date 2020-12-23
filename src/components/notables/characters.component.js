import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../list.component";
import NotableDataService from "../../services/notable.service"

function Show(props) {
  const { notebookId } = useParams();

  const [characters, setCharacters] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  // Callback to update the list of chars
  useEffect(() => {
    NotableDataService.index(notebookId, "characters")
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setCharacters, notebookId]);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h1>Characters</h1>

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={characters}
          label="name"
        />
      </div>
    </div>
  );
}

export default Show;
