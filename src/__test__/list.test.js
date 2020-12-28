import { render, screen } from "@testing-library/react";
import List from "../components/list.component";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("Text component", () => {
  var currentId = -1;
  const setCurrentId = (val) => {
    currentId = val;
  };

  const items = [
    {
      id: 1,
      name: "Item 1",
      label: "Label 1",
    },
    {
      id: 2,
      name: "Item 2",
      label: "Label 2",
    },
    {
      id: 3,
      name: "Item 3",
      label: "Label 3",
    },
  ];

  describe("when using a custom label", () => {
    beforeEach(() => {
      render(
        <List
          items={items}
          currentId={currentId}
          setCurrentId={setCurrentId}
          label="label"
        />
      );
    });

    test("rendering all items", () => {
      expect(screen.getByText("Label 1")).toBeInTheDocument();
      expect(screen.getByText("Label 2")).toBeInTheDocument();
      expect(screen.getByText("Label 3")).toBeInTheDocument();
    });
  });

  describe("when using default label", () => {
    beforeEach(() => {
      render(
        <List items={items} currentId={currentId} setCurrentId={setCurrentId} />
      );
    });

    afterEach(() => {
      setCurrentId(-1);
    });

    test("rendering all items", () => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    test("responding to mouse click", async () => {
      expect(currentId).toBe(-1);

      // Click first list item
      await act(async () => {
        userEvent.click(screen.getByText("Item 1"));
      });

      // Confirm item is selected
      expect(currentId).toBe(1);

      // Click second list item
      await act(async () => {
        userEvent.click(screen.getByText("Item 2"));
      });

      // Confirm item is selected
      expect(currentId).toBe(2);

      // Click third list item
      await act(async () => {
        userEvent.click(screen.getByText("Item 3"));
      });

      // Confirm item is selected
      expect(currentId).toBe(3);
    });

    test("responding to tab with space", async () => {
      const listItem1 = screen.getByText("Item 1").closest("li");
      const listItem2 = screen.getByText("Item 2").closest("li");
      const listItem3 = screen.getByText("Item 3").closest("li");

      expect(currentId).toBe(-1);

      // Press tab
      userEvent.tab();
      expect(listItem1).toHaveFocus();

      // Press space
      userEvent.type(listItem1, " ", { skipClick: true });
      expect(currentId).toBe("1");

      // Press tab
      userEvent.tab();
      expect(listItem2).toHaveFocus();

      // Press space
      userEvent.type(listItem2, " ", { skipClick: true });
      expect(currentId).toBe("2");

      // Press tab
      userEvent.tab();
      expect(listItem3).toHaveFocus();

      // Press space
      userEvent.type(listItem3, " ", { skipClick: true });
      expect(currentId).toBe("3");
    });

    test("responding to tab with enter", async () => {
      const listItem1 = screen.getByText("Item 1").closest("li");
      const listItem2 = screen.getByText("Item 2").closest("li");
      const listItem3 = screen.getByText("Item 3").closest("li");

      expect(currentId).toBe(-1);

      // Press tab
      userEvent.tab();
      expect(listItem1).toHaveFocus();

      // Press enter
      userEvent.type(listItem1, "{enter}", { skipClick: true });
      expect(currentId).toBe("1");

      // Press tab
      userEvent.tab();
      expect(listItem2).toHaveFocus();

      // Press enter
      userEvent.type(listItem2, "{enter}", { skipClick: true });
      expect(currentId).toBe("2");

      // Press tab
      userEvent.tab();
      expect(listItem3).toHaveFocus();

      // Press enter
      userEvent.type(listItem3, "{enter}", { skipClick: true });
      expect(currentId).toBe("3");
    });
  });
});
