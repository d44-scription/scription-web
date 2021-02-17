import React, { useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import MentionableReadonly from "./editors/mentionable_readonly.component";
import "scss/list.scss";

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
              as="li"
              variant="primary"
              key={item.id}
              active={item.id === props.currentId}
              onClick={() => setActiveItem(item.id)}
              onKeyDown={onKeyDown}
              tabIndex="0"
              listid={item.id}
            >
              {props.mentionable ? (
                <MentionableReadonly
                  value={truncate(item[props.label || "name"])}
                />
              ) : (
                <p style={{ margin: "0.75rem" }}>
                  {truncate(item[props.label || "name"])}
                </p>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default List;
