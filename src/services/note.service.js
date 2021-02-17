import http from "http-common";

class NoteDataService {
  get(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notes/${id}`);
  }

  create(notebookId, value) {
    let params = {};
    params["note"] = {};
    params["note"]["content"] = value;

    return http.post(`/notebooks/${notebookId}/notes`, params);
  }

  update(notebookId, id, param, value) {
    let params = {};
    params["note"] = {};
    params["note"][param] = value;

    return http.put(`/notebooks/${notebookId}/notes/${id}`, params);
  }

  delete(notebookId, id) {
    return http.delete(`/notebooks/${notebookId}/notes/${id}`);
  }
}

export default new NoteDataService();
