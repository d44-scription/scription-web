import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import NotableDataService from "services/notable.service";

function Recents(props) {
  const history = useHistory();

  const [notables, setNotables] = useState([]);

  // Navigate to notable page
  const showItem = (id, type) => {
    history.push(`/notebooks/${props.notebookId}/${type}s/${id}`);
  };

  // Sets navigate to target item
  const onKeyDown = (e, id, type) => {
    if (e.key === " " || e.key === "Enter") {
      showItem(id, type);
    }
  };

  // Callback to update the list of notables
  useEffect(() => {
    NotableDataService.recents(props.notebookId).then((response) => {
      setNotables(response.data);
    });
  }, [setNotables, props.notebookId]);

  return (
    <div className="list row mt-5">
      <h2>Recently Accessed</h2>

      <ListGroup as="ul">
        {notables &&
          notables.map((item) => (
            <ListGroup.Item
              as="li"
              variant="primary"
              key={item.id}
              onClick={() => showItem(item.id, item.type)}
              onKeyDown={(e) => onKeyDown(e, item.id, item.type)}
              tabIndex="0"
            >
              <p style={{ margin: "0.75rem" }}>{item.name}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default Recents;
