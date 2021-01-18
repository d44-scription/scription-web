import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import { MemoryRouter, Route } from "react-router-dom";
import Index from "../../components/notables/index.component";
import userEvent from "@testing-library/user-event";

describe("Index component", () => {
  const notebookId = 1;
  const notables = [
    {
      name: "Notable 1",
      id: 1,
    },
    {
      name: "Notable 2",
      id: 2,
    },
    {
      name: "Notable 3",
      id: 3,
    },
  ];

  beforeEach(async () => {
    // In each test, stub any GET requests made through the http module with fake notables
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: notables,
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/notebooks/${notebookId}/characters`]}>
          <Route path="/notebooks/:notebookId/characters">
            <Index type="characters" />
          </Route>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering full list of notables", async () => {
    // Confirm "add new" button is available, and prop has been correctly trimmed & capitalised
    expect(screen.getByText("Add Character")).toBeVisible();

    const listItem1 = screen.getByText("Notable 1").closest("li");
    const listItem2 = screen.getByText("Notable 2").closest("li");
    const listItem3 = screen.getByText("Notable 3").closest("li");

    // Confirm all list elements are rendered
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();

    // Confirm that, by default, no list items are selected
    expect(listItem1).not.toHaveClass("active");
    expect(listItem2).not.toHaveClass("active");
    expect(listItem3).not.toHaveClass("active");

    // Click first list item
    await act(async () => {
      userEvent.click(listItem1);
    });

    // When clicked, only target element should be active
    expect(listItem1).toHaveClass("active");
    expect(listItem2).not.toHaveClass("active");
    expect(listItem3).not.toHaveClass("active");

    // Click first list item again
    await act(async () => {
      userEvent.click(listItem1);
    });

    // Confirm that item has been deselected
    expect(listItem1).not.toHaveClass("active");
    expect(listItem2).not.toHaveClass("active");
    expect(listItem3).not.toHaveClass("active");
  });

  test("accessing 'new' page", () => {
    // Confirm that, at rest, fields are hidden
    expect(screen.getByText("Add Character")).toBeVisible();
    expect(screen.queryByText("Name Character")).toBeNull();
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();

    // Click add button
    userEvent.click(screen.getByText("Add Character"));

    // Confirm that, when active, add button is hidden and fields are shown
    expect(screen.queryByText("Add Character")).toBeNull();
    expect(screen.getByText("Name Character")).toBeVisible();
    expect(screen.getByText("Enter Name")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();

    // Click cancel
    userEvent.click(screen.getByText("Cancel"));

    // Confirm we have returned to rest state
    expect(screen.getByText("Add Character")).toBeVisible();
    expect(screen.queryByText("Name Character")).toBeNull();
    expect(screen.queryByText("Enter Name")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();
  });
});
