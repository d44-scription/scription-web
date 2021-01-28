import { render, screen } from "@testing-library/react";
import Details from "../../components/notables/details.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import http from "../../http-common";

describe("Details component", () => {
  const confirmRestState = () => {
    // Confirm default button is shown
    expect(screen.getByText("Add Character")).toBeInTheDocument();

    // Confirm new fields are not shown
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Character 1")).toBeNull();
    expect(screen.queryByText("Mock Description")).toBeNull();
    expect(screen.queryByText("View Character")).toBeNull();
    expect(screen.queryByText("Delete Character")).toBeNull();
  };

  const confirmNewNotableState = () => {
    // Confirm default button is not shown
    expect(screen.queryByText("Add Character")).not.toBeInTheDocument();

    // Confirm new fields are shown
    expect(screen.getByText("Enter Name")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // Confirm edit fields are not shown
    expect(screen.queryByText("Character 1")).toBeNull();
    expect(screen.queryByText("Mock Description")).toBeNull();
    expect(screen.queryByText("View Character")).toBeNull();
    expect(screen.queryByText("Delete Character")).toBeNull();
  };

  const confirmViewNotableState = () => {
    // Confirm default button is not shown
    expect(screen.queryByText("Add Character")).not.toBeInTheDocument();

    // Confirm new fields are not shown
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Confirm edit fields are shown
    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock Description")[0]).toBeInTheDocument();
    expect(screen.getByText("View Character")).toBeInTheDocument();
    expect(screen.getByText("Delete Character")).toBeInTheDocument();
  };

  test("rendering details pane when no ID given", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Details type="characters" />
        </BrowserRouter>
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Click "Add notable" button
    await act(async () => {
      userEvent.click(screen.getByText("Add Character"));
    });

    // Confirm we navigate to "New notable" page
    confirmNewNotableState();

    // Click "Cancel" button
    await act(async () => {
      userEvent.click(screen.getByText("Cancel"));
    });

    // Confirm we return to rest state
    confirmRestState();
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
