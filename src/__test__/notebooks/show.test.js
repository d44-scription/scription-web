import { render, screen } from "@testing-library/react";
import Show from "components/notebooks/show.component";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Show component", () => {
  const id = 1;
  const placeholder = "Click here to add a note";
  const successMessage = "Test success message";

  const fakeNotebook = {
    name: "Notebook 1",
    id: id,
  };

  const successfulResponse = {
    code: 200,
    success_message: successMessage,
    id: id,
  };

  const unsuccessfulResponse = {
    response: { data: ["Error message"] },
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation((url) => {
      switch (url) {
        case `/notebooks/${id}/notables/recents`:
          return Promise.resolve({ data: [] });
        default:
          return Promise.resolve({
            data: fakeNotebook,
          });
      }
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/notebooks/${id}`]}>
          <Route path="/notebooks/:id">
            <Show />
          </Route>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  const confirmRestState = () => {
    expect(screen.getByText("Notebook 1")).toBeVisible();
    expect(screen.getByPlaceholderText(placeholder)).toBeVisible();
    expect(
      screen.getAllByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )[0]
    ).toBeVisible();

    expect(screen.getByText("Type here to search...")).toBeVisible();

    expect(
      screen.getByTitle("View characters for Notebook 1")
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("View locations for Notebook 1")
    ).toBeInTheDocument();

    expect(screen.getByTitle("View items for Notebook 1")).toBeInTheDocument();

    expect(
      screen.getByTitle("View unlinked notes for Notebook 1")
    ).toBeInTheDocument();

    expect(screen.getByText("Recently Accessed")).toBeVisible();
  };

  test("notable links respond to tab correctly", () => {
    // Confirm we start at rest state
    confirmRestState();

    const charButton = screen
      .getByTitle("View characters for Notebook 1")
      .closest("button");

    const locationButton = screen
      .getByTitle("View locations for Notebook 1")
      .closest("button");

    const itemButton = screen
      .getByTitle("View items for Notebook 1")
      .closest("button");

    const unlinkedButton = screen
      .getByTitle("View unlinked notes for Notebook 1")
      .closest("button");

    // Skip note editors, this is tested at src/__test__/editors/inline_editor.test.js
    for (let i = 0; i < 5; i++) {
      userEvent.tab();
    }

    // Confirm SVG buttons are focusable
    expect(charButton).toHaveFocus();
    userEvent.type(charButton, "{enter}", { skipClick: true });

    userEvent.tab();
    expect(locationButton).toHaveFocus();
    userEvent.type(locationButton, "{enter}", { skipClick: true });

    userEvent.tab();
    expect(itemButton).toHaveFocus();
    userEvent.type(itemButton, "{enter}", { skipClick: true });

    userEvent.tab();
    expect(unlinkedButton).toHaveFocus();
    userEvent.type(unlinkedButton, "{enter}", { skipClick: true });
  });

  describe("when successfully adding note", () => {
    beforeEach(async () => {
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
    });

    afterEach(() => {
      http.post.mockRestore();
      http.put.mockRestore();
    });

    test("displaying success messages", async () => {
      // Confirm we start at rest state
      confirmRestState();

      const addNoteField = screen.getAllByRole("textbox")[0];

      // Add a new note
      await act(async () => {
        userEvent.type(addNoteField, "{enter}");
      });

      // Confirm we have returned to rest state with a success message
      expect(
        screen.getByText(`Successfully saved. ${successMessage}`)
      ).toBeVisible();

      expect(http.post).toBeCalledTimes(1);
      expect(http.post).toBeCalledWith(`/notebooks/${id}/notes`, {
        note: { content: "" },
      });

      confirmRestState();

      // Type another note
      await act(async () => {
        userEvent.type(addNoteField, "A");
      });

      // Confirm success message disappears
      expect(
        screen.queryByText(`Successfully saved. ${successMessage}`)
      ).toBeNull();

      expect(http.post).toBeCalledTimes(1);
    });

    test("previewing recently added notes", async () => {
      const addNoteField = screen.getAllByRole("textbox")[0];

      expect(addNoteField).toBeVisible();

      // Add a new note
      await act(async () => {
        userEvent.type(addNoteField, "{enter}");
      });

      expect(http.post).toBeCalledTimes(1);
      expect(http.post).toBeCalledWith(`/notebooks/${id}/notes`, {
        note: { content: "" },
      });

      const editPreviewField = screen.getAllByRole("textbox")[1];
      expect(editPreviewField).toBeVisible();

      expect(screen.getByText("Recently Added")).toBeVisible();

      // Edit note preview
      await act(async () => {
        userEvent.type(editPreviewField, "{enter}");
      });

      expect(http.post).toBeCalledTimes(1);
      expect(http.put).toBeCalledTimes(1);
      expect(http.put).toBeCalledWith(`/notebooks/${id}/notes/${id}`, {
        note: { content: undefined },
      });
    });
  });

  describe("when unsuccessfully adding note", () => {
    beforeEach(async () => {
      jest
        .spyOn(http, "post")
        .mockImplementation(() => Promise.reject(unsuccessfulResponse));
    });

    afterEach(() => {
      http.post.mockRestore();
    });

    test("previewing does not show", async () => {
      const addNoteField = screen.getAllByRole("textbox")[0];

      expect(addNoteField).toBeVisible();

      // Add a new note
      await act(async () => {
        userEvent.type(addNoteField, "{enter}");
      });

      expect(http.post).toBeCalledTimes(1);
      expect(http.post).toBeCalledWith(`/notebooks/${id}/notes`, {
        note: { content: "" },
      });

      // Confirm only one editor field shown - other is search field
      expect(screen.getAllByRole("textbox").length).toBe(2);
      expect(screen.getByText("Recently Added")).not.toBeVisible();
    });
  });
});
