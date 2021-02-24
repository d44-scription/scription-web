import http from "http-common";

class NotableDataService {
  index(notebookId, notableType, query) {
    let url = `/notebooks/${notebookId}/${notableType}`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    return http.get(url);
  }

  async optionIndex(notebookId, query) {
    // TODO: Retrieve all notables one notable route accepts query
    let url = `/notebooks/${notebookId}/characters`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    const response = await http.get(url);
    return response.data.map((item) => {
      return { label: item.name, value: item.id };
    });
  }

  notes(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notables/${id}/notes`);
  }

  get(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notables/${id}`);
  }

  create(notebookId, name, type) {
    let params = {};
    params["notable"] = {};
    params["notable"]["name"] = name;
    params["notable"]["type"] = type;

    return http.post(`/notebooks/${notebookId}/notables`, params);
  }

  update(notebookId, id, param, value) {
    let params = {};
    params["notable"] = {};
    params["notable"][param] = value;

    return http.put(`/notebooks/${notebookId}/notables/${id}`, params);
  }

  delete(notebookId, id) {
    return http.delete(`/notebooks/${notebookId}/notables/${id}`);
  }
}

export default new NotableDataService();
