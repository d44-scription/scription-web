import React from "react";
import Select from "react-select/async";
import NotableDataService from "services/notable.service";
import { useHistory } from "react-router-dom";

function NotableSearch(props) {
  const history = useHistory();

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#fdf0d9" }),
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
    <Select
      loadOptions={fetchNotables}
      onChange={onChange}
      placeholder="Search notables"
      styles={customStyles}
      aria-label="Search notables"
    />
  );
}

export default NotableSearch;
