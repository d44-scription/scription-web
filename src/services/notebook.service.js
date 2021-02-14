import http from "../http-common";

class NotebookDataService {
  index() {
    return http.get("/notebooks.json", { withCredentials: true });
  }

  get(id) {
    return http.get(`/notebooks/${id}.json`, { withCredentials: true });
  }

  create(param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.post(`/notebooks.json`, { withCredentials: true });
  }

  update(id, param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.put(`/notebooks/${id}.json`, { withCredentials: true });
  }

  delete(id) {
    return http.delete(`/notebooks/${id}.json`, { withCredentials: true });
  }
}

export default new NotebookDataService();
