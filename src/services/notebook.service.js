import http from "../http-common";

class NotebookDataService {
  index() {
    return http.get("/notebooks.json");
  }

  get(id) {
    return http.get(`/notebooks/${id}.json`);
  }

  create(model, param, value) {
    let params = {};
    params[model] = {};
    params[model][param] = value;

    return http.post(`/notebooks.json`, params);
  }

  update(id, model, param, value) {
    let params = {};
    params[model] = {};
    params[model][param] = value;

    return http.put(`/notebooks/${id}.json`, params);
  }

  delete(id) {
    return http.delete(`/notebooks/${id}.json`);
  }
}

export default new NotebookDataService();
