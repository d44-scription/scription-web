import http from "http-common";

class NotableDataService {
  index(notebookId, type, query) {
    let url = `/notebooks/${notebookId}/${type}`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    return http.get(url);
  }

  notes(notebookId, id) {
    if (id) {
      return http.get(`/notebooks/${notebookId}/notables/${id}/notes`);
    }

    return http.get(`/notebooks/${notebookId}/notes/unlinked`);
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
