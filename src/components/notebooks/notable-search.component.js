import React from "react";
import Select from "react-select/async";
import NotableDataService from "services/notable.service";
import { useHistory } from "react-router-dom";

function NotableSearch(props) {
  const history = useHistory();

  // Function to retrieve notables for this notebook for the select
  const fetchNotables = async (query) => {
    const response = await NotableDataService.index(props.notebookId, "notables", query);

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
    />
  );
}

export default NotableSearch;
