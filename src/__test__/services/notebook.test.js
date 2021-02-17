import http from "http-common";
import NotebookDataService from "services/notebook.service";

describe("Notebook service", () => {
  const successfulResponse = {
    code: 200,
  };

  const notebookId = 2;
  const param = "attribute";
  const name = "name";

  beforeEach(() => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "post").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "put").mockImplementation(() =>
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
    http.get.mockRestore();
    http.post.mockRestore();
    http.put.mockRestore();
    http.delete.mockRestore();
  });

  test("index", () => {
    NotebookDataService.index();

    expect(http.get).toBeCalledWith("/notebooks");

    expect(http.get).toBeCalledTimes(1);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("get", () => {
    NotebookDataService.get(notebookId);

    expect(http.get).toBeCalledWith(`/notebooks/${notebookId}`);

    expect(http.get).toBeCalledTimes(1);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("create", () => {
    NotebookDataService.create(name);

    expect(http.post).toBeCalledWith(`/notebooks`, {
      notebook: { name: name },
    });

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(1);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("update", () => {
    NotebookDataService.update(notebookId, param, name);

    expect(http.put).toBeCalledWith(`/notebooks/${notebookId}`, {
      notebook: { attribute: name },
    });

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(1);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("delete", () => {
    NotebookDataService.delete(notebookId);

    expect(http.delete).toBeCalledWith(`/notebooks/${notebookId}`);

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(1);
  });
});
