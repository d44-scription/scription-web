import http from "../http-common";
class AuthenticationDataService {
  login(email, password) {
    let params = {};
    params["user"] = {};

    params["user"]["email"] = email;
    params["user"]["password"] = password;

    return http.post("/users/login", params, { withCredentials: true });
  }

  logout() {
    return http.delete("/users/logout", { withCredentials: true });
  }

  register(displayName, email, password, passwordConfirmation) {
    let params = {};
    params["user"] = {};

    params["user"]["display_name"] = displayName;
    params["user"]["email"] = email;
    params["user"]["password"] = password;
    params["user"]["password_confirmation"] = passwordConfirmation;

    return http.post("/users", params);
  }
}

export default new AuthenticationDataService();
