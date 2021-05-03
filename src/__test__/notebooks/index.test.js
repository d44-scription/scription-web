import { render, screen } from "@testing-library/react";
import Index from "components/notebooks/index.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Index component", () => {
  describe("With notebooks", () => {
    const fakeNotebooks = [
      {
        name: "Notebook 1",
        id: 1,
      },
      {
        name: "Notebook 2",
        id: 2,
      },
    ];

    beforeEach(async () => {
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: fakeNotebooks,
        })
      );

      await act(async () => {
        render(
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        );
      });
    });

    afterEach(() => {
      http.get.mockRestore();
    });

    test("rendering a list of notebooks", async () => {
      const searchBar = screen.getByPlaceholderText("Type here to search...");
      const listItem1 = screen.getByText("Notebook 1");
      const listItem2 = screen.getByText("Notebook 2");

      // Confirm all list elements are rendered
      expect(searchBar).toBeVisible();
      expect(listItem1).toBeVisible();
      expect(listItem2).toBeVisible();

      // Confirm that, by default, no list items are selected
      expect(listItem1).not.toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");

      // Click first list item
      await act(async () => {
        userEvent.click(listItem1);
      });

      // When clicked, only target element should be active
      expect(listItem1).toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");

      // Confirm notebook component is shown
      expect(screen.getByText("Notebook Name")).toBeVisible();
      expect(screen.getByText("Click here to edit")).toBeVisible();
      expect(screen.getByText("No summary saved")).toBeVisible();

      // Click first list item again
      await act(async () => {
        userEvent.click(listItem1);
      });

      // When confirm item has been deselected
      expect(listItem1).not.toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");

      // Confirm notebook component is hidden
      expect(screen.queryByText("Notebook Name")).toBeNull();
      expect(screen.queryByText("Click here to edit")).toBeNull();
      expect(screen.queryByText("No summary saved")).toBeNull();
    });

    test("navigating between new and rest pages", async () => {
      const addButton = screen.getByText("Add Notebook");

      // Confirm new fields are not shown
      expect(screen.queryByText("Notebook Name")).toBeNull();
      expect(screen.queryByText("Click here to edit")).toBeNull();
      expect(screen.queryByText("Cancel")).toBeNull();

      // Confirm Edit page is hidden
      expect(screen.queryByText("Open Notebook")).toBeNull();
      expect(screen.queryByText("Delete Notebook")).toBeNull();

      userEvent.click(addButton);

      // Confirm new fields are shown
      expect(screen.getByText("Notebook Name")).toBeVisible();
      expect(screen.getByText("Click here to edit")).toBeVisible();
      expect(screen.getByText("Cancel")).toBeVisible();

      // Confirm Edit page is hidden
      expect(screen.queryByText("Open Notebook")).toBeNull();
      expect(screen.queryByText("Delete Notebook")).toBeNull();

      // Confirm add button is persistent
      expect(screen.getByText("Add Notebook")).toBeVisible();

      userEvent.click(screen.getByText("Cancel"));

      // Confirm new fields are hidden
      expect(screen.queryByText("Notebook Name")).toBeNull();
      expect(screen.queryByText("Click here to edit")).toBeNull();
      expect(screen.queryByText("Cancel")).toBeNull();

      // Confirm Edit page is hidden
      expect(screen.queryByText("Open Notebook")).toBeNull();
      expect(screen.queryByText("Delete Notebook")).toBeNull();

      // Click first list item
      await act(async () => {
        userEvent.click(screen.getByText("Notebook 1"));
      });

      // Confirm new fields are hidden
      expect(screen.queryByText("Cancel")).toBeNull();

      // Confirm Edit page is shown
      expect(screen.getByText("Click here to edit")).toBeVisible();
      expect(screen.getByText("Notebook Name")).toBeVisible();
      expect(screen.getByText("Open Notebook")).toBeVisible();
      expect(screen.getByText("Delete Notebook")).toBeVisible();

      // Confirm add button is persistent
      expect(screen.getByText("Add Notebook")).toBeVisible();

      // Return to new page
      userEvent.click(addButton);

      // Confirm new fields are shown
      expect(screen.getByText("Notebook Name")).toBeVisible();
      expect(screen.getByText("Click here to edit")).toBeVisible();
      expect(screen.getByText("Cancel")).toBeVisible();

      // Confirm Edit page is hidden
      expect(screen.queryByText("Open Notebook")).toBeNull();
      expect(screen.queryByText("Delete Notebook")).toBeNull();

      // Confirm add button is persistent
      expect(screen.getByText("Add Notebook")).toBeVisible();
    });
  });

  describe("Without notebooks", () => {
    beforeEach(async () => {
      jest.spyOn(http, "get").mockImplementation(() =>
        Promise.resolve({
          data: [],
        })
      );

      await act(async () => {
        render(
          <BrowserRouter>
            <Index />
          </BrowserRouter>
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
