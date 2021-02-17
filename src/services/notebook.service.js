import http from "http-common";

class NotebookDataService {
  index() {
    return http.get("/notebooks.json");
  }

  get(id) {
    return http.get(`/notebooks/${id}.json`);
  }

  create(value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"]["name"] = value;

    return http.post(`/notebooks.json`, params);
  }

  update(id, param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.put(`/notebooks/${id}.json`, params);
  }

  delete(id) {
    return http.delete(`/notebooks/${id}.json`);
  }
}

export default new NotebookDataService();
