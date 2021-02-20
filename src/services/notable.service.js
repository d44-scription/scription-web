import http from "http-common";

class NotableDataService {
  index(notebookId, notableType, query) {
    let url = `/notebooks/${notebookId}/${notableType}`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    return http.get(url);
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
