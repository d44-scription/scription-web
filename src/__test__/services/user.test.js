import http from "http-common";
import UserDataService from "services/user.service";

describe("User service", () => {
  const successfulResponse = {
    code: 200,
  };

  const userId = 1;
  const param = "attribute";
  const name = "name";

  beforeEach(() => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "put").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );
  });

  afterEach(() => {
    http.get.mockRestore();
    http.put.mockRestore();
  });

  test("get", () => {
    UserDataService.get(userId);

    expect(http.get).toBeCalledWith(`/users/${userId}`);

    expect(http.get).toBeCalledTimes(1);
    expect(http.put).toBeCalledTimes(0);
  });

  test("update", () => {
    UserDataService.update(userId, param, name);

    expect(http.put).toBeCalledWith(`/users/${userId}`, {
      user: { attribute: name },
    });

    expect(http.get).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(1);
  });
});
