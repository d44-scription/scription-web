import http from "../http-common";

class NoteDataService {
  get(notebookId, id) {
    return http.get(`/notebooks/${notebookId}/notes/${id}.json`);
  }

  create(value, notebookId) {
    let params = {};
    params["note"] = {};
    params["note"]["content"] = value;

    return http.post(`/notebooks/${notebookId}/notes.json`, params);
  }
}

export default new NoteDataService();
