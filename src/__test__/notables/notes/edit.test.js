import { render, screen } from "@testing-library/react";
import Edit from "components/notables/notes/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const helpText =
    "Use @ to reference a character, : to reference an item, and # to reference a location";
  const successMessage = "Test message";

  const notebookId = 1;
  const noteId = 2;

  const fakeNote = {
    content: "Note that mentions @[Wheaty](@1).",
    id: noteId,
  };

  const successfulResponse = {
    code: 200,
    success_message: successMessage,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNote,
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

    await act(async () => {
      render(
        <BrowserRouter>
          <Edit id={noteId} notebookId={notebookId} retrieveNotes={() => {}} />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given note", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Note that mentions Wheaty.")).toBeVisible();
    expect(screen.getByText(helpText)).toBeVisible();
    expect(screen.getByText("Delete Note")).toBeVisible();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Note"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete note?")).toBeVisible();

    expect(
      screen.getByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Cancel delete
    await act(async () => {
      userEvent.click(screen.getByText("Cancel"));
    });

    expect(http.delete).not.toHaveBeenCalled();

    // Confirm modal is hidden
    expect(screen.queryByText("Delete note?")).toBeNull();

    expect(
      screen.queryByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeNull();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Note"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete note?")).toBeVisible();

    expect(
      screen.getByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Confirm delete
    await act(async () => {
      userEvent.click(screen.getByText("OK"));
    });

    expect(http.delete).toHaveBeenCalledWith(
      `/notebooks/${notebookId}/notes/${noteId}`
    );

    // Confirm modal is hidden
    expect(screen.queryByText("Delete note?")).toBeNull();

    expect(
      screen.queryByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeNull();
  });

  test("responding to tab", () => {
    const deleteButton = screen.getByText("Delete Note");

    // Confirm that delete button gains focus from tab
    userEvent.tab({ shift: true });
    expect(deleteButton).toHaveFocus();

    // Press space to trigger button
    userEvent.type(deleteButton, "{space}");

    // Confirm modal is shown
    expect(screen.getByText("Delete note?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });

  test("Rendering success messages correctly", async () => {
    const textField = screen.getByText("Note that mentions Wheaty.");

    // Submit message
    await act(async () => {
      userEvent.type(textField, "{enter}");
    });

    expect(http.put).toHaveBeenCalledWith(
      `/notebooks/${notebookId}/notes/${noteId}`,
      {
        note: { content: "Note that mentions @[Wheaty](@1)." },
      }
    );

    // Confirm success message shows
    expect(
      screen.getByText(`Successfully saved. ${successMessage}`)
    ).toBeVisible();
  });
});
