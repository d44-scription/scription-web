import React, { useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useKeypress from "../hooks/useKeypress";
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

  // Used on keypress - checks for list element focus, then sets active id from that
  const setActiveItemFromFocus = useCallback(() => {
    const id = document.activeElement.getAttribute("listid");

    if (id) {
      setActiveItem(id);
    }
  }, [setActiveItem]);

  // Callback for enter key
  useKeypress(
    "Enter",
    () => {
      setActiveItemFromFocus();
    },
    [setActiveItemFromFocus]
  );

  // Callback for space key
  useKeypress(
    " ",
    () => {
      setActiveItemFromFocus();
    },
    [setActiveItemFromFocus]
  );

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
            tabIndex="0"
            listid={item.id}
          >
            <p style={{ margin: "0.75rem" }}>{item[props.label]}</p>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default List;
