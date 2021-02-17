import http from "http-common";

class NotebookDataService {
  index() {
    return http.get("/notebooks");
  }

  get(id) {
    return http.get(`/notebooks/${id}`);
  }

  create(value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"]["name"] = value;

    return http.post(`/notebooks`, params);
  }

  update(id, param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.put(`/notebooks/${id}`, params);
  }

  delete(id) {
    return http.delete(`/notebooks/${id}`);
  }
}

export default new NotebookDataService();
