import React, { useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import MentionableReadonly from "./editors/mentionable_readonly.component";
import "scss/list.scss";
import PropTypes from "prop-types";

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
              style={{ padding: "1rem" }}
              variant="primary"
              key={item.id}
              active={item.id === props.currentId}
              onClick={() => setActiveItem(item.id)}
              onDoubleClick={() => navigateToItem(item.id)}
              onKeyDown={(e) => onKeyDown(e, item.id)}
              tabIndex="0"
            >
              {props.mentionable ? (
                <MentionableReadonly value={truncate(item[props.label])} />
              ) : (
                truncate(item[props.label])
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

List.defaultProps = {
  label: "name",
};

List.propTypes = {
  // Required for base functionality
  setCurrentId: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,

  // Currently selected - can be null
  currentId: PropTypes.number,

  // Optional action when an item is doubleClicked
  doubleClickAction: PropTypes.func,

  // Are mentions expected?
  mentionable: PropTypes.bool,

  // Which attribute of list items to render
  label: PropTypes.string,
};

export default List;
