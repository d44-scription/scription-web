import { render, screen } from "@testing-library/react";
import New from "components/notes/new.component";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("New component", () => {
  let setNewRecordTestValue = false;
  let retrieveNotesTestValue = false;

  const successfulResponse = {
    code: 200,
  };

  const fakeNotable = {
    text_code: "@[Wheaty](@1)",
  };

  beforeEach(() => {
    setNewRecordTestValue = false;
    retrieveNotesTestValue = false;

    jest.spyOn(http, "post").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotable,
      })
    );
  });

  afterEach(() => {
    http.post.mockRestore();
  });

  const confirmRestState = () => {
    // Confirm default button is not shown
    expect(screen.getByText("Note Contents")).toBeVisible();

    expect(
      screen.getByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
  };

  test("rendering correct fields", async () => {
    await act(async () => {
      render(
        <New
          notebookId={1}
          notableId="2"
          setNewRecord={() => {
            setNewRecordTestValue = true;
          }}
          retrieveNotes={() => {
            retrieveNotesTestValue = true;
          }}
        />
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Confirm text code is automatically added to text field
    expect(screen.getAllByText("Wheaty")[0]).toBeVisible();

    // Sanity check
    expect(setNewRecordTestValue).toBe(false);
    expect(retrieveNotesTestValue).toBe(false);

    // "Create" a new note
    userEvent.click(screen.getByPlaceholderText("Click here to edit"));
    userEvent.type(screen.getByRole("textbox"), "Note");

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm `postCreateActions` are run correctly
    expect(setNewRecordTestValue).toBe(true);
    expect(retrieveNotesTestValue).toBe(true);

    expect(http.post).toBeCalledWith("/notebooks/1/notes", {
      note: { content: "@[Wheaty](@1) Note" },
    });
  });

  test("rendering correctly without a notable", async () => {
    await act(async () => {
      render(
        <New
          notebookId={1}
          setNewRecord={() => {
            setNewRecordTestValue = true;
          }}
          retrieveNotes={() => {
            retrieveNotesTestValue = true;
          }}
        />
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Confirm text code is automatically added to text field
    expect(screen.queryByText("Wheaty")).toBeNull();

    // Sanity check
    expect(setNewRecordTestValue).toBe(false);
    expect(retrieveNotesTestValue).toBe(false);

    // "Create" a new note
    userEvent.click(screen.getByPlaceholderText("Click here to edit"));
    userEvent.type(screen.getByRole("textbox"), "Note");

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm `postCreateActions` are run correctly
    expect(setNewRecordTestValue).toBe(true);
    expect(retrieveNotesTestValue).toBe(true);

    expect(http.post).toBeCalledWith("/notebooks/1/notes", {
      note: { content: "Note" },
    });
  });
});
