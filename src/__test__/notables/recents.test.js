import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "http-common";
import { MemoryRouter, Route } from "react-router-dom";
import Recents from "components/notables/recents.component";
import userEvent from "@testing-library/user-event";

describe("Recents component", () => {
  const notebookId = 1;

  describe("With notables", () => {
    const notables = [
      {
        name: "Notable 1",
        type: "Item",
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

      await act(async () => {
        render(
          <MemoryRouter initialEntries={[`/notebooks/${notebookId}`]}>
            <Route path="/notebooks/:notebookId">
              <Recents notebookId={notebookId} />
            </Route>

            <Route path={`/notebooks/${notebookId}/items/1`}>Item Page</Route>
          </MemoryRouter>
        );
      });
    });

    afterEach(() => {
      // To ensure atomic testing, remove mock functionality after each test
      http.get.mockRestore();
    });

    test("rendering full list of notables", async () => {
      expect(http.get).toBeCalledWith(
        `/notebooks/${notebookId}/notables/recents`
      );

      // Confirm list renders
      expect(screen.queryByText("Item Page")).toBeNull();
      expect(screen.getByText("Recently Accessed")).toBeVisible();

      const listItem1 = screen.getByText("Notable 1");
      const listItem2 = screen.getByText("Notable 2");
      const listItem3 = screen.getByText("Notable 3");

      // Confirm all list elements are rendered
      expect(listItem1).toBeVisible();
      expect(listItem2).toBeVisible();
      expect(listItem3).toBeVisible();

      userEvent.click(listItem1);

      expect(screen.getByText("Item Page")).toBeVisible();
    });

    test("responding to enter", async () => {
      expect(http.get).toBeCalledWith(
        `/notebooks/${notebookId}/notables/recents`
      );

      // Confirm list renders
      expect(screen.queryByText("Item Page")).toBeNull();
      expect(screen.getByText("Recently Accessed")).toBeVisible();

      const listItem1 = screen.getByText("Notable 1");

      // Confirm all list elements are rendered
      expect(listItem1).toBeVisible();

      userEvent.tab();
      userEvent.type(listItem1, "{enter}", { skipClick: true });

      expect(screen.getByText("Item Page")).toBeVisible();
    });

    test("responding to space", async () => {
      expect(http.get).toBeCalledWith(
        `/notebooks/${notebookId}/notables/recents`
      );

      // Confirm list renders
      expect(screen.queryByText("Item Page")).toBeNull();
      expect(screen.getByText("Recently Accessed")).toBeVisible();

      const listItem1 = screen.getByText("Notable 1");

      // Confirm all list elements are rendered
      expect(listItem1).toBeVisible();

      userEvent.tab();
      userEvent.type(listItem1, " ", { skipClick: true });

      expect(screen.getByText("Item Page")).toBeVisible();
    });
  });
});
