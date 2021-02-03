import { render, screen } from "@testing-library/react";
import Edit from "../../components/notables/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const fakeNotable = {
    name: "Character 1",
    id: 1,
    description: "Mock description",
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotable,
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Edit id="1" type="characters" singularType="Character" />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notable", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock description")[0]).toBeInTheDocument();

    expect(screen.getByText("View Character")).toBeInTheDocument();
    expect(screen.getByText("Delete Character")).toBeInTheDocument();

    // Click delete button for first item
    await act(async () => {
      userEvent.click(screen.getByText("Delete Character"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete Character?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });

  test("responding to tab", () => {
    const deleteButton = screen.getByText("Delete Character");

    // Confirm that delete button gains focus from tab
    userEvent.tab({ shift: true });
    expect(deleteButton).toHaveFocus();

    // Press space to trigger button
    userEvent.type(deleteButton, "{space}");

    // Confirm modal is shown
    expect(screen.getByText("Delete Character?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });
});
