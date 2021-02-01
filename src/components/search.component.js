import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function Search(props) {
  const [query, setQuery] = useState("");
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
  }, [query, props.items, props.label, setQueriedItems]);

  // Event handler for search bar input change
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <span className="w-100">
      <Form.Control
        placeholder="Search list..."
        className="search-field"
        value={query}
        onChange={onChange}
      />

      <p hidden={props.queriedItems.length > 0 || query === ""}>
        No search results found
      </p>
    </span>
  );
}

export default Search;
