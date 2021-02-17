import { render, screen } from "@testing-library/react";
import Details from "components/notables/notes/details.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import http from "http-common";

describe("Details component", () => {
  let newRecord = false;
  let setNewRecord = (val) => {
    newRecord = val;
  };

  const confirmRestState = () => {
    // Confirm new fields are not shown
    expect(
      screen.queryByPlaceholderText("Click here to add a note")
    ).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Note for Wheaty")).toBeNull();
    expect(screen.queryByText("Delete Note")).toBeNull();

    // Help text present in both new and edit states
    expect(
      screen.queryByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeNull();
  };

  const confirmNewNoteState = () => {
    // Confirm new fields are shown
    expect(
      screen.getByPlaceholderText("Click here to add a note")
    ).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Note for Wheaty")).toBeNull();
    expect(screen.queryByText("Delete Note")).toBeNull();

    // Help text present in both new and edit states
    expect(
      screen.getByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeVisible();
  };

  const confirmViewNoteState = () => {
    // Confirm new fields are not shown
    expect(
      screen.queryByPlaceholderText("Click here to add a note")
    ).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are shown
    expect(screen.getByText("Note for Wheaty")).toBeVisible();
    expect(screen.getByText("Delete Note")).toBeVisible();

    // Help text present in both new and edit states
    expect(
      screen.getByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeVisible();
  };

  test("rendering details pane when no ID given", async () => {
    const { rerender } = render(
      <BrowserRouter>
        <Details newRecord={newRecord} setNewRecord={setNewRecord} />
      </BrowserRouter>
    );

    // Confirm we start at rest state
    confirmRestState();

    // Update "new Record" prop
    setNewRecord(true);

    // Simulate clicking "add new"
    rerender(
      <BrowserRouter>
        <Details newRecord={newRecord} setNewRecord={setNewRecord} />
      </BrowserRouter>
    );

    // Confirm we navigate to "New note" page
    confirmNewNoteState();

    // Click "Cancel" button
    userEvent.click(screen.getByText("Cancel"));

    // Confirm we would return to rest state
    expect(newRecord).toBe(false);
  });

  describe("When given an ID", () => {
    const fakeNote = {
      content: "Note for @[Wheaty](@1)",
      id: 1,
    };

    beforeEach(() => {
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: fakeNote,
        })
      );
    });

    test("correctly viewing edit note page", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Details id={1} />
          </BrowserRouter>
        );
      });

      // Confirm edit page is shown correctly
      confirmViewNoteState();
    });
  });
});
