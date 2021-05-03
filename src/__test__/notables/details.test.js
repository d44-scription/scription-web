import { render, screen } from "@testing-library/react";
import Details from "components/notables/details.component";
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
    expect(screen.queryByText("Name Character")).toBeNull();
    expect(screen.queryByText("Click here to edit")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Character 1")).toBeNull();
    expect(screen.queryByText("Mock Description")).toBeNull();
    expect(screen.queryByText("View Character")).toBeNull();
    expect(screen.queryByText("Delete Character")).toBeNull();
  };

  const confirmNewNotableState = () => {
    // Confirm new fields are shown
    expect(screen.getByText("Name Character")).toBeVisible();
    expect(screen.getByText("Click here to edit")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Character 1")).toBeNull();
    expect(screen.queryByText("Mock Description")).toBeNull();
    expect(screen.queryByText("View Character")).toBeNull();
    expect(screen.queryByText("Delete Character")).toBeNull();
  };

  const confirmViewNotableState = () => {
    // Confirm new fields are not shown
    expect(screen.queryByText("Click here to edit")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are shown
    expect(screen.getByText("Name Character")).toBeVisible();
    expect(screen.getByText("Character 1")).toBeVisible();
    expect(screen.getAllByText("Mock Description")[1]).toBeVisible();
    expect(screen.getByText("View Character")).toBeVisible();
    expect(screen.getByText("Delete Character")).toBeVisible();
  };

  test("rendering details pane when no ID given", async () => {
    const { rerender } = render(
      <BrowserRouter>
        <Details
          type="characters"
          newRecord={newRecord}
          setNewRecord={setNewRecord}
        />
      </BrowserRouter>
    );

    // Confirm we start at rest state
    confirmRestState();

    // Update "new Record" prop
    setNewRecord(true);

    // Simulate clicking "add new"
    rerender(
      <BrowserRouter>
        <Details
          type="characters"
          newRecord={newRecord}
          setNewRecord={setNewRecord}
        />
      </BrowserRouter>
    );

    // Confirm we navigate to "New notable" page
    confirmNewNotableState();

    // Click "Cancel" button
    userEvent.click(screen.getByText("Cancel"));

    // Confirm we would return to rest state
    expect(newRecord).toBe(false);
  });

  describe("When given an ID", () => {
    const fakeNotable = {
      name: "Character 1",
      id: 1,
      description: "Mock Description",
    };

    beforeEach(() => {
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: fakeNotable,
        })
      );
    });

    test("correctly viewing notable page", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Details id={1} type="characters" />
          </BrowserRouter>
        );
      });

      // Confirm edit page is shown correctly
      confirmViewNotableState();
    });
  });
});
