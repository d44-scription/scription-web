import http from "../http-common";

class NotebookDataService {
  index() {
    return http.get("/notebooks.json");
  }

  get(id) {
    return http.get(`/notebooks/${id}.json`);
  }

  create(data) {
    return http.post("/notebooks.json", data);
  }

  update(id, data) {
    return http.put(`/notebooks/${id}.json`, data);
  }

  delete(id) {
    return http.delete(`/notebooks/${id}.json`);
  }
}

export default new NotebookDataService();
