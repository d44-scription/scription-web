import { render, screen } from "@testing-library/react";
import Details from "../../components/notebooks/details.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import http from "../../http-common";

describe("Details component", () => {
  const confirmRestState = () => {
    // Confirm default button is shown
    expect(screen.getByText("Add new notebook")).toBeInTheDocument();

    // Confirm new notebook fields are not shown
    expect(screen.queryByText("Name notebook")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm view notebook fields are not shown
    expect(screen.queryByText("Notebook 1")).toBeNull();
    expect(screen.queryByText("Mock summary")).toBeNull();
    expect(screen.queryByText("Delete notebook")).toBeNull();
  };

  const confirmNewNotebookState = () => {
    // Confirm default button is not shown
    expect(screen.queryByText("Add new notebook")).not.toBeInTheDocument();

    // Confirm new notebook fields are shown
    expect(screen.getByText("Name notebook")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // Confirm view notebook fields are not shown
    expect(screen.queryByText("Notebook 1")).toBeNull();
    expect(screen.queryByText("Mock summary")).toBeNull();
    expect(screen.queryByText("Delete notebook")).toBeNull();
  };

  const confirmViewNotebookState = () => {
    // Confirm default button is not shown
    expect(screen.queryByText("Add new notebook")).not.toBeInTheDocument();

    // Confirm new notebook fields are not shown
    expect(screen.queryByText("Name notebook")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm view notebook fields are shown
    expect(screen.getByText("Notebook 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock summary")[0]).toBeInTheDocument();
    expect(screen.getByText("Delete notebook")).toBeInTheDocument();
  };

  test("rendering details pane when no ID given", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Click "Add notebook" button
    await act(async () => {
      userEvent.click(screen.getByText("Add new notebook"));
    });

    // Confirm we navigate to "New notebook" page
    confirmNewNotebookState();

    // Click "Cancel" button
    await act(async () => {
      userEvent.click(screen.getByText("Cancel"));
    });

    // Confirm we return to rest state
    confirmRestState();
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
