import { render, screen } from "@testing-library/react";
import Details from "../../components/notebooks/details.component";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("Details component", () => {
  const confirmRestState = () => {
    // Confirm default button is only thing rendered
    expect(screen.getByText("Add new notebook")).toBeInTheDocument();
    expect(screen.queryByText("Name notebook")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();
  }

  const confirmNewNotebookState = () => {
    expect(screen.queryByText("Add new notebook")).not.toBeInTheDocument();
    expect(screen.getByText("Name notebook")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  }

  test("rendering details pane when no ID given", async () => {
    await act(async () => {
      render(<Details />);
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
});
