import http from "../http-common";

class UserDataService {
  get(id) {
    return http.get(`/users/${id}`, { withCredentials: true });
  }

  update(id, param, value) {
    let params = {};
    params["user"] = {};
    params["user"][param] = value;

    return http.put(`/users/${id}`, params, { withCredentials: true });
  }
}

export default new UserDataService();
