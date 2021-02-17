import http from "../http-common";

describe("http-common module", () => {
  test("intercepting forbidden requests", () => {
    localStorage.setItem("id", 1);
    expect(localStorage.getItem("id")).toBe("1");

    http.interceptors.response.handlers[0].rejected({
      response: {
        status: 401,
      },
    });

    expect(localStorage.getItem("id")).toBeNull();
  });

  test("permitting other requests", () => {
    localStorage.setItem("id", 1);
    expect(localStorage.getItem("id")).toBe("1");

    http.interceptors.response.handlers[0].rejected({
      response: {
        status: 404,
      },
    });

    expect(localStorage.getItem("id")).toBe("1");
  });
});
