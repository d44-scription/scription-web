import http from "../http-common";

class NoteDataService {
  create(value, notebookId) {
    let params = {};
    params["note"] = {};
    params["note"]["content"] = value;

    return http.post(`/notebooks/${notebookId}/notes.json`, params);
  }
}

export default new NoteDataService();
