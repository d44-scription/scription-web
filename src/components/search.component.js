import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function Search(props) {
  const [query, setQuery] = useState("");
  const [hideMessage, setHideMessage] = useState(true);

  const setQueriedItems = props.setQueriedItems;

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
    setHideMessage(searchedItems.length || query === "");
  }, [query, props.items, props.label, setQueriedItems]);

  // Event handler for search bar input change
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Form.Group controlId="Search" className="w-100">
      <Form.Label className="mb-0">Search List</Form.Label>

      <Form.Control
        placeholder="Type here to search..."
        className="search-field"
        value={query}
        onChange={onChange}
      />

      <p hidden={hideMessage}>No search results found</p>
    </Form.Group>
  );
}

export default Search;
