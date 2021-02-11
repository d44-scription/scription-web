import http from "../http-common";

class AuthenticationDataService {
  login(email, password) {
    let params = {};
    params["user"] = {};

    params["user"]["email"] = email;
    params["user"]["password"] = password;

    return http.post("/users/login", params).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(displayName, email, password, passwordConfirmation) {
    let params = {};
    params["user"] = {};

    params["user"]["display_name"] = displayName;
    params["user"]["email"] = email;
    params["user"]["password"] = password;
    params["user"]["password_confirmation"] = passwordConfirmation;

    return http.post("/api/v1/users", params);
  }

  currentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  signedIn() {
    return (localStorage.getItem("user") !== null)
  }
}

export default new AuthenticationDataService();
