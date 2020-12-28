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

  beforeEach(() => {
    // In each test, stub any GET requests made through the http module with fake notables
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: notables,
      })
    );
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering full notables", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/notebooks/${notebookId}/characters`]}>
          <Route path="/notebooks/:notebookId/characters">
            <Index />
          </Route>
        </MemoryRouter>
      );
    });

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
  });
});
