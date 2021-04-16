import React from "react";
import Select from "react-select/async";
import NotableDataService from "services/notable.service";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

function NotableSearch(props) {
  const history = useHistory();

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "#fdf0d9",
      boxShadow: state.isFocused ? "0 0 0 0.25rem #f5b34240" : "",
    }),
    menu: (styles) => ({ ...styles, backgroundColor: "#fdf0d9" }),
    placeholder: (styles) => ({ ...styles, color: "#525252" }),
    option: (provided, { data, isFocused }) => ({
      ...provided,
      color: "#424242",
      backgroundColor: backgroundColour(data.type, isFocused),
    }),
  };

  const backgroundColour = (type, isFocused) => {
    let colour = "";

    switch (type) {
      case "Item":
        colour = "#d5f78d";
        break;
      case "Location":
        colour = "#a28af3";
        break;
      default:
        colour = "#8afbf4";
        break;
    }

    return isFocused ? `${colour}` : `${colour}50`;
  };

  // Function to retrieve notables for this notebook for the select
  const fetchNotables = async (query) => {
    const response = await NotableDataService.index(
      props.notebookId,
      "notables",
      query
    );

    return response.data.map((item) => {
      return { label: item.name, value: item.id, type: item.type };
    });
  };

  // When selected item changes, navigate to the target
  const onChange = (selected) => {
    history.push(
      `/notebooks/${props.notebookId}/${selected.type}s/${selected.value}`
    );
  };

  return (
    <Form.Group>
      <Form.Label className="mb-0">Search all notables:</Form.Label>

      <Select
        loadOptions={fetchNotables}
        onChange={onChange}
        placeholder="Type here to search..."
        styles={customStyles}
        aria-label="Search notables"
      />
    </Form.Group>
  );
}

export default NotableSearch;
