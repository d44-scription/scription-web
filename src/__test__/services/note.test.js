import http from "http-common";
import NoteDataService from "services/note.service";

describe("Note service", () => {
  const successfulResponse = {
    code: 200,
  };

  const notebookId = 1;
  const noteId = 2;
  const param = "attribute";
  const content = "Content";

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

  test("get", () => {
    NoteDataService.get(notebookId, noteId);

    expect(http.get).toBeCalledWith(
      `/notebooks/${notebookId}/notes/${noteId}.json`
    );

    expect(http.get).toBeCalledTimes(1);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("create", () => {
    NoteDataService.create(notebookId, content);

    expect(http.post).toBeCalledWith(`/notebooks/${notebookId}/notes.json`, {
      note: { content: content },
    });

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(1);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("update", () => {
    NoteDataService.update(notebookId, noteId, param, content);

    expect(http.put).toBeCalledWith(
      `/notebooks/${notebookId}/notes/${noteId}.json`,
      {
        note: { attribute: content },
      }
    );

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(1);
    expect(http.delete).toBeCalledTimes(0);
  });

  test("delete", () => {
    NoteDataService.delete(notebookId, noteId);

    expect(http.delete).toBeCalledWith(
      `/notebooks/${notebookId}/notes/${noteId}.json`
    );

    expect(http.get).toBeCalledTimes(0);
    expect(http.post).toBeCalledTimes(0);
    expect(http.put).toBeCalledTimes(0);
    expect(http.delete).toBeCalledTimes(1);
  });
});
