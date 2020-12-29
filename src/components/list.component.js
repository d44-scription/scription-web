import React, { useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../scss/list.scss";

function List(props) {
  // Callback triggered when list items are clicked
  const setActiveItem = useCallback(
    (id) => {
      if (props.currentId === id) {
        props.setCurrentId(null);
      } else {
        props.setCurrentId(id);
      }
    },
    [props]
  );

  // Sets active id from focussed item
  const onKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setActiveItem(e.target.getAttribute("listid"));
    }
  };

  return (
    <ListGroup as="ul">
      {props.items &&
        props.items.map((item) => (
          <ListGroup.Item
            as="li"
            variant="primary"
            key={item.id}
            active={item.id === props.currentId}
            onClick={() => setActiveItem(item.id)}
            onKeyDown={onKeyDown}
            tabIndex="0"
            listid={item.id}
          >
            <p style={{ margin: "0.75rem" }}>{item[props.label || "name"]}</p>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default List;
