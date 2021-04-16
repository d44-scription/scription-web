import React, { useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import MentionableReadonly from "./editors/mentionable_readonly.component";
import "scss/list.scss";

function List(props) {
  const setCurrentId = props.setCurrentId;
  const doubleClickAction = props.doubleClickAction;

  // Callback triggered when list items are clicked
  const setActiveItem = useCallback(
    (id) => {
      if (props.currentId === id) {
        setCurrentId(null);
      } else {
        setCurrentId(id);
      }
    },
    [props.currentId, setCurrentId]
  );

  const navigateToItem = useCallback(
    (id) => {
      if (doubleClickAction) {
        doubleClickAction(id);
      }
    },
    [doubleClickAction]
  );

  // Sets active id from focussed item
  const onKeyDown = (e, id) => {
    if (e.key === " " || e.key === "Enter") {
      setActiveItem(id);
    }
  };

  // Shorten long text
  const truncate = (text) => {
    if (text.length > 200) {
      return `${text.substr(0, 200)}...`;
    } else {
      return text;
    }
  };

  return (
    <div>
      <ListGroup as="ul">
        {props.items &&
          props.items.map((item) => (
            <ListGroup.Item
              as="aside"
              style={{padding: "1rem"}}
              variant="primary"
              key={item.id}
              active={item.id === props.currentId}
              onClick={() => setActiveItem(item.id)}
              onDoubleClick={() => navigateToItem(item.id)}
              onKeyDown={(e) => onKeyDown(e, item.id)}
              tabIndex="0"
            >
              {props.mentionable ? (
                <MentionableReadonly
                  value={truncate(item[props.label || "name"])}
                />
              ) : (
                truncate(item[props.label || "name"])
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default List;
