import http from "../http-common";

class NoteDataService {
  get(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notes/${id}.json`);
  }

  create(notebookId, value) {
    let params = {};
    params["note"] = {};
    params["note"]["content"] = value;

    return http.post(`/notebooks/${notebookId}/notes.json`, params);
  }

  update(notebookId, id, param, value) {
    let params = {};
    params["note"] = {};
    params["note"][param] = value;

    return http.put(`/notebooks/${notebookId}/notes/${id}.json`, params);
  }

  delete(notebookId, id) {
    return http.delete(`/notebooks/${notebookId}/notes/${id}.json`);
  }
}

export default new NoteDataService();
