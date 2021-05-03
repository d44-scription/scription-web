import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "http-common";
import { MemoryRouter, Route } from "react-router-dom";
import Index from "components/notes/index.component";
import userEvent from "@testing-library/user-event";

describe("Index component", () => {
  const notebookId = 1;
  const notableId = 2;

  describe("With notes", () => {
    const placeholderText = "Click here to edit";
    const formLabel = "Note Contents";
    const helpText =
      "Use @ to reference a character, : to reference an item, and # to reference a location";
    const deleteText = "Delete Note";
    const cancelText = "Cancel";

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
            initialEntries={[
              `/notebooks/${notebookId}/characters/${notableId}`,
            ]}
          >
            <Route path="/notebooks/:notebookId/characters/:id">
              <Index />
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
      const addButton = screen.getByText("Add Note");

      // Confirm elements with mentions are rendered in a user-friendly format
      const listItem1 = screen
        .getByText("Note 1 mentions Wheaty")
        .closest("aside");
      const listItem2 = screen
        .getByText("Note 2 mentions Wheaty and Diskworld")
        .closest("aside");
      const listItem3 = screen
        .getByText("Note 3 mentions Wheaty, Diskworld, and Luggage")
        .closest("aside");

      // Confirm all list elements are rendered
      expect(listItem1).toBeVisible();
      expect(listItem2).toBeVisible();
      expect(listItem3).toBeVisible();

      // Confirm that, by default, no list items are selected
      expect(listItem1).not.toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");
      expect(listItem3).not.toHaveClass("active");

      // Edit page not shown when no items selected
      expect(screen.queryByText(deleteText)).toBeNull();

      // New page not shown before "Add" button is clicked
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull();
      expect(screen.queryByText(cancelText)).toBeNull();

      // Confirm help text is only visible when on new or edit pages
      expect(screen.queryByText(helpText)).toBeNull();

      // Confirm add button is persistent
      expect(addButton).toBeVisible();

      // Click add button
      await act(async () => {
        userEvent.click(addButton);
      });

      // Edit page not shown when no items selected
      expect(screen.queryByText(deleteText)).toBeNull();

      // New page shown
      expect(screen.getByPlaceholderText(placeholderText)).toBeVisible();
      expect(screen.getByText(cancelText)).toBeVisible();

      // Confirm help text is only visible when on new or edit pages
      expect(screen.getByText(helpText)).toBeVisible();

      // Confirm add button is persistent
      expect(addButton).toBeVisible();

      // Click cancel button, confirm return to rest state
      await act(async () => {
        userEvent.click(screen.getByText(cancelText));
      });

      // Edit page not shown when no items selected
      expect(screen.queryByText(deleteText)).toBeNull();

      // New page not shown
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull();
      expect(screen.queryByText(cancelText)).toBeNull();

      // Confirm help text is only visible when on new or edit pages
      expect(screen.queryByText(helpText)).toBeNull();

      // Confirm add button is persistent
      expect(addButton).toBeVisible();

      // Click add button
      await act(async () => {
        userEvent.click(addButton);
      });

      // Click first list item
      await act(async () => {
        userEvent.click(listItem1);
      });

      // When clicked, only target element should be active
      expect(listItem1).toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");
      expect(listItem3).not.toHaveClass("active");

      // Edit page shows
      expect(screen.getByPlaceholderText(placeholderText)).toBeVisible();
      expect(screen.getByText(deleteText)).toBeVisible();

      // New page not shown before "Add" button is clicked
      expect(screen.queryByText(cancelText)).toBeNull();

      // Confirm help text is visible on new or edit pages
      expect(screen.getByText(helpText)).toBeVisible();

      // Confirm add button is persistent
      expect(addButton).toBeVisible();

      // Click first list item again
      await act(async () => {
        userEvent.click(listItem1);
      });

      // Confirm that item has been deselected
      expect(listItem1).not.toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");
      expect(listItem3).not.toHaveClass("active");

      // Edit page not shown when no items selected
      expect(screen.queryByText(deleteText)).toBeNull();

      // New page not shown
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull();
      expect(screen.queryByText(cancelText)).toBeNull();

      // Confirm help text is only visible when on new or edit pages
      expect(screen.queryByText(helpText)).toBeNull();

      // Confirm add button is persistent
      expect(addButton).toBeVisible();
    });
  });

  describe("Without notes", () => {
    beforeEach(async () => {
      // In each test, stub any GET requests made through the http module with fake notables
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: [],
        })
      );

      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(
          <MemoryRouter
            initialEntries={[
              `/notebooks/${notebookId}/characters/${notableId}`,
            ]}
          >
            <Route path="/notebooks/:notebookId/characters/:id">
              <Index />
            </Route>
          </MemoryRouter>
        );
      });
    });

    afterEach(() => {
      http.get.mockRestore();
    });

    test("does not render search bar", async () => {
      const searchBar = screen.queryByPlaceholderText("Type here to search...");
      expect(searchBar).toBeNull();
    });
  });
});
