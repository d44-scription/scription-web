import http from "../http-common";
import authenticationHeader from "./helpers/authentication-header";

class NotebookDataService {
  index() {
    return http.get("/notebooks.json", { headers: authenticationHeader() });
  }

  get(id) {
    return http.get(`/notebooks/${id}.json`, {
      headers: authenticationHeader(),
    });
  }

  create(param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.post(`/notebooks.json`, params, {
      headers: authenticationHeader(),
    });
  }

  update(id, param, value) {
    let params = {};
    params["notebook"] = {};
    params["notebook"][param] = value;

    return http.put(`/notebooks/${id}.json`, params, {
      headers: authenticationHeader(),
    });
  }

  delete(id) {
    return http.delete(`/notebooks/${id}.json`, {
      headers: authenticationHeader(),
    });
  }
}

export default new NotebookDataService();
