import { render, screen } from "@testing-library/react";
import Details from "../../components/notebooks/details.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import http from "../../http-common";

describe("Details component", () => {
  let newRecord = false;
  let setNewRecord = (val) => {
    newRecord = val;
  };

  const confirmRestState = () => {
    // Confirm new notebook fields are not shown
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm view notebook fields are not shown
    expect(screen.queryByText("Notebook 1")).toBeNull();
    expect(screen.queryByText("Mock summary")).toBeNull();
    expect(screen.queryByText("Open Notebook")).toBeNull();
    expect(screen.queryByText("Delete Notebook")).toBeNull();
  };

  const confirmNewNotebookState = () => {
    // Confirm new notebook fields are shown
    expect(screen.getByText("Enter Name")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // Confirm view notebook fields are not shown
    expect(screen.queryByText("Notebook 1")).toBeNull();
    expect(screen.queryByText("Mock summary")).toBeNull();
    expect(screen.queryByText("Open Notebook")).toBeNull();
    expect(screen.queryByText("Delete Notebook")).toBeNull();
  };

  const confirmViewNotebookState = () => {
    // Confirm new notebook fields are not shown
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm view notebook fields are shown
    expect(screen.getByText("Notebook 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock summary")[0]).toBeInTheDocument();
    expect(screen.getByText("Open Notebook")).toBeInTheDocument();
    expect(screen.getByText("Delete Notebook")).toBeInTheDocument();
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
    setNewRecord(true)

    // Simulate clicking "add new"
    rerender(
      <BrowserRouter>
        <Details newRecord={true} setNewRecord={setNewRecord} />
      </BrowserRouter>
    );

    // Confirm we navigate to "New notebook" page
    confirmNewNotebookState();

    // Click "Cancel" button
    userEvent.click(screen.getByText("Cancel"));

    // Confirm we would return to rest state
    expect(newRecord).toBe(false)
  });

  describe("When given an ID", () => {
    const fakeNotebook = {
      name: "Notebook 1",
      id: 1,
      summary: "Mock summary",
      order_index: 0,
    };

    beforeEach(() => {
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: fakeNotebook,
        })
      );
    });

    test("correctly viewing notebook page", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Details id={1} />
          </BrowserRouter>
        );
      });

      // Confirm edit page is shown correctly
      confirmViewNotebookState();
    });
  });
});
