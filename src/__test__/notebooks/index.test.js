import { render, screen } from "@testing-library/react";
import Index from "../../components/notebooks/index.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
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
      const searchBar = screen.getByPlaceholderText("Search list...");
      const listItem1 = screen.getByText("Notebook 1").closest("li");
      const listItem2 = screen.getByText("Notebook 2").closest("li");

      // Confirm all list elements are rendered
      expect(searchBar).toBeInTheDocument();
      expect(listItem1).toBeInTheDocument();
      expect(listItem2).toBeInTheDocument();

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
      expect(screen.getByText("No name saved")).toBeInTheDocument();
      expect(screen.getByText("No summary saved")).toBeInTheDocument();

      // Click first list item again
      await act(async () => {
        userEvent.click(listItem1);
      });

      // When confirm item has been deselected
      expect(listItem1).not.toHaveClass("active");
      expect(listItem2).not.toHaveClass("active");

      // Confirm notebook component is shown
      expect(screen.queryByText("No name saved")).toBeNull();
      expect(screen.queryByText("No summary saved")).toBeNull();
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
      const searchBar = screen.queryByPlaceholderText("Search list...");
      expect(searchBar).toBeNull();
    });
  });
});
