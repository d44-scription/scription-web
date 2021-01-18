import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import List from "../list.component";
import Button from "react-bootstrap/Button";
import NotableDataService from "../../services/notable.service";
import New from "./new.component";

function Show(props) {
  const { notebookId } = useParams();

  const [notables, setNotables] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [newRecord, setNewRecord] = useState(false);

  const retrieveNotables = useCallback(() => {
    NotableDataService.index(notebookId, props.type)
      .then((response) => {
        setNotables(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setNotables, notebookId, props.type]);

  // Callback to update the list of chars
  useEffect(() => {
    retrieveNotables();
  }, [retrieveNotables]);

  // In some use cases the singular of the `type` prop (ie "item" instead of "items") is needed
  // This removes the last character from and capitalises the string. While not perfect, it works
  // for the available notable types.
  const singularType = () => {
    return `${props.type.charAt(0).toUpperCase()}${props.type.slice(1, -1)}`;
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h2 className="capitalise">{props.type}</h2>

        <List
          currentId={currentId}
          setCurrentId={setCurrentId}
          items={notables}
          label="name"
        />
      </div>

      <div className="col-md-6">
        {newRecord ? (
          <New
            setNewRecord={setNewRecord}
            retrieveNotables={retrieveNotables}
            notebookId={notebookId}
            type={singularType()}
          />
        ) : (
          <Button
            onClick={() => {
              setNewRecord(true);
            }}
            className="w-100"
          >
            Add {singularType()}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Show;
