import { render, screen } from "@testing-library/react";
import Edit from "../../components/notebooks/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const fakeNotebook = {
    name: "Notebook 1",
    id: 1,
    summary: "Mock summary",
    order_index: 0,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotebook,
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Edit id="1" />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notebook", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Notebook 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock summary")[0]).toBeInTheDocument();

    expect(screen.getByText("Open notebook")).toBeInTheDocument();
    expect(screen.getByText("Delete notebook")).toBeInTheDocument();

    // Click delete button for first item
    await act(async () => {
      userEvent.click(screen.getByText("Delete notebook"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete notebook?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });

  test("responding to tab", () => {
    const deleteButton = screen.getByText("Delete notebook");

    // Confirm that delete button gains focus from tab
    userEvent.tab({ shift: true });
    expect(deleteButton).toHaveFocus();

    // Press space to trigger button
    userEvent.type(deleteButton, "{space}");

    // Confirm modal is shown
    expect(screen.getByText("Delete notebook?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });
});
