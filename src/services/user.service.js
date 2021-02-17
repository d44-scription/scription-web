import http from "../http-common";

class UserDataService {
  get(id) {
    return http.get(`/users/${id}`);
  }

  update(id, param, value) {
    let params = {};
    params["user"] = {};
    params["user"][param] = value;

    return http.put(`/users/${id}`, params);
  }
}

export default new UserDataService();
