import http from "http-common";
import AuthenticationDataService from "services/authentication.service";

describe("Authentication service", () => {
  const successfulResponse = {
    code: 200,
  };

  const displayName = "User";
  const email = "test@example.com";
  const password = "superSecret123!";

  beforeEach(() => {
    jest.spyOn(http, "post").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "delete").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );
  });

  afterEach(() => {
    http.post.mockRestore();
    http.delete.mockRestore();

    localStorage.removeItem("id");
  });

  test("login", () => {
    AuthenticationDataService.login(email, password);

    expect(http.post).toBeCalledWith("/users/login", {
      user: { email: email, password: password },
    });

    expect(http.post).toBeCalledTimes(1);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("logout", () => {
    localStorage.setItem("id", 1);

    AuthenticationDataService.logout(email, password);

    expect(http.delete).toBeCalledWith("/users/logout");
    expect(localStorage.getItem("id")).toBeNull();

    expect(http.post).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(1);
  });

  describe("loggedIn", () => {
    test("when logged in", () => {
      localStorage.setItem("id", 1);

      expect(AuthenticationDataService.loggedIn()).toBe(true);
    });

    test("when not logged in", () => {
      expect(AuthenticationDataService.loggedIn()).toBe(false);
    });
  });

  test("register", () => {
    AuthenticationDataService.register(displayName, email, password, password);

    expect(http.post).toBeCalledWith("/users", {
      user: {
        display_name: displayName,
        email: email,
        password: password,
        password_confirmation: password,
      },
    });

    expect(localStorage.getItem("id")).toBeNull();

    expect(http.post).toBeCalledTimes(1);
    expect(http.delete).toBeCalledTimes(0);
  });
});
