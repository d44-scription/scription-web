import http from "http-common";
import NotableDataService from "services/notable.service";

describe("Notable service", () => {
  const successfulResponse = {
    code: 200,
  };

  const notebookId = 1;
  const notableId = 2;
  const type = "test";
  const param = "attribute";
  const name = "notable";

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

  describe("index", () => {
    test("without a query", () => {
      NotableDataService.index(notebookId, type);

      expect(http.get).toBeCalledWith(`/notebooks/${notebookId}/${type}`);

      expect(http.get).toBeCalledTimes(1);
      expect(http.post).toBeCalledTimes(0);
      expect(http.put).toBeCalledTimes(0);
      expect(http.delete).toBeCalledTimes(0);
    });

    test("with a query", () => {
      NotableDataService.index(notebookId, type, "Test Query");

      expect(http.get).toBeCalledWith(
        `/notebooks/${notebookId}/${type}?q=Test Query`
      );

      expect(http.get).toBeCalledTimes(1);
      expect(http.post).toBeCalledTimes(0);
      expect(http.put).toBeCalledTimes(0);
      expect(http.delete).toBeCalledTimes(0);
    });
  });

  test("notes", () => {
    NotableDataService.notes(notebookId, notableId);

    expect(http.get).toBeCalledWith(
      `/notebooks/${notebookId}/notables/${notableId}/notes`
    );

    expect(http.get).toBeCalledTimes(1);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("get", () => {
    NotableDataService.get(notebookId, notableId);

    expect(http.get).toBeCalledWith(
      `/notebooks/${notebookId}/notables/${notableId}`
    );

    expect(http.get).toBeCalledTimes(1);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("create", () => {
    NotableDataService.create(notebookId, name, type);

    expect(http.post).toBeCalledWith(`/notebooks/${notebookId}/notables`, {
      notable: { name: name, type: type },
    });

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(1);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("update", () => {
    NotableDataService.update(notebookId, notableId, param, name);

    expect(http.put).toBeCalledWith(
      `/notebooks/${notebookId}/notables/${notableId}`,
      {
        notable: { attribute: name },
      }
    );

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(1);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("delete", () => {
    NotableDataService.delete(notebookId, notableId);

    expect(http.delete).toBeCalledWith(
      `/notebooks/${notebookId}/notables/${notableId}`
    );

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(1);
  });
});
