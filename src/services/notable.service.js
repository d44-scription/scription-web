import http from "../http-common";

class NotableDataService {
  index(notebookId, notableType, query) {
    let url = `/notebooks/${notebookId}/${notableType}.json`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    return http.get(url);
  }

  notes(notebookId, notableId) {
    return http.get(`/notebooks/${notebookId}/notables/${notableId}/notes.json`);
  }

  get(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notables/${id}.json`);
  }

  create(notebookId, name, type) {
    let params = {};
    params["notable"] = {};
    params["notable"]["name"] = name;
    params["notable"]["type"] = type;

    return http.post(`/notebooks/${notebookId}/notables.json`, params);
  }

  update(notebookId, id, param, value) {
    let params = {};
    params["notable"] = {};
    params["notable"][param] = value;

    return http.put(`/notebooks/${notebookId}/notables/${id}.json`, params);
  }

  delete(notebookId, id) {
    return http.delete(`/notebooks/${notebookId}/notables/${id}.json`);
  }
}

export default new NotableDataService();
