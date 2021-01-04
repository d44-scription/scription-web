import React, { useCallback, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import "../scss/list.scss";

function List(props) {
  const [queriedItems, setQueriedItems] = useState([]);
  const [query, setQuery] = useState("");

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-search m-1"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>

        <Form.Control
          placeholder="Search list"
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
              <p style={{ margin: "0.75rem" }}>{item[props.label || "name"]}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default List;
