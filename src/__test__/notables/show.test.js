import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import { MemoryRouter, Route } from "react-router-dom";
import Show from "../../components/notables/show.component";
import userEvent from "@testing-library/user-event";

describe("Show component", () => {
  const notebookId = 1;
  const notableId = 2;

  const notes = [
    {
      content: "Note 1 mentions @[Wheaty](@1)",
      id: 1,
    },
    {
      content: "Note 2 mentions @[Wheaty](@1) and #[Diskworld](#1)",
      id: 2,
    },
    {
      content:
        "Note 3 mentions @[Wheaty](@1), #[Diskworld](#1), and :[Luggage](:1)",
      id: 3,
    },
  ];

  beforeEach(async () => {
    // In each test, stub any GET requests made through the http module with fake notables
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: notes,
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter
          initialEntries={[`/notebooks/${notebookId}/characters/${notableId}`]}
        >
          <Route path="/notebooks/:notebookId/characters/:id">
            <Show />
          </Route>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering full list of notes", async () => {
    // Confirm elements with mentions are rendered in a user-friendly format
    const listItem1 = screen.getByText("Note 1 mentions Wheaty").closest("li");
    const listItem2 = screen
      .getByText("Note 2 mentions Wheaty and Diskworld")
      .closest("li");
    const listItem3 = screen
      .getByText("Note 3 mentions Wheaty, Diskworld, and Luggage")
      .closest("li");

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
});
