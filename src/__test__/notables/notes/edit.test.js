import { render, screen } from "@testing-library/react";
import Edit from "../../../components/notables/notes/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../../http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const helpText =
    "Use @ to reference a character, : to reference an item, and # to reference a location";

  const fakeNote = {
    content: "Note that mentions @[Wheaty](@1).",
    id: 1,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNote,
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Edit id="1" notebookId="1" />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notable", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Note that mentions Wheaty.")).toBeVisible();
    expect(screen.getByText(helpText)).toBeVisible();
    expect(screen.getByText("Delete Note")).toBeVisible();

    // Click delete button for first item
    await act(async () => {
      userEvent.click(screen.getByText("Delete Note"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete note?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This note will be deleted. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
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
});
