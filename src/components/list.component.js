import React, { useCallback, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import MentionableReadonly from "./editors/mentionable_readonly.component";
import "../scss/list.scss";

function List(props) {
  const [queriedItems, setQueriedItems] = useState([]);
  const [query, setQuery] = useState("");

  // Callback triggered when list items are clicked
  const setActiveItem = useCallback(
    (id) => {
      console.log("Here");
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

  // When search query changes, update the queriedItems prop with filtered items
  useEffect(() => {
    var searchedItems = props.items;

    if (query !== "") {
      searchedItems = searchedItems.filter((item) => {
        return item[props.label || "name"]
          .toLowerCase()
          .includes(query.toLowerCase());
      });
    }

    setQueriedItems(searchedItems);
  }, [query, props.items, props.label]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <span className="w-100 d-inline-flex align-items-start">
        <Form.Control
          placeholder="Search list..."
          className="search-field"
          value={query}
          onChange={onChange}
        />
      </span>

      <p hidden={queriedItems.length > 0 || query === ""}>
        No search results found
      </p>

      <ListGroup as="ul">
        {queriedItems &&
          queriedItems.map((item) => (
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
                <MentionableReadonly value={item[props.label || "name"]} />
              ) : (
                <p style={{ margin: "0.75rem" }}>
                  {item[props.label || "name"]}
                </p>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default List;
