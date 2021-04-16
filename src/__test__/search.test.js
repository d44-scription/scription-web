import { render, screen } from "@testing-library/react";
import Search from "components/search.component";
import userEvent from "@testing-library/user-event";

describe("Search component", () => {
  let queriedItems = [];
  const setQueriedItems = (items) => {
    queriedItems = items;
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

  beforeEach(() => {
    render(
      <Search
        items={items}
        queriedItems={queriedItems}
        setQueriedItems={setQueriedItems}
      />
    );
  });

  test("searching items", async () => {
    const searchBar = screen.getByPlaceholderText("Type here to search...");

    // Confirm that, by default, all items are included
    expect(queriedItems).toEqual(items);
    expect(screen.getByText("No search results found")).not.toBeVisible();

    userEvent.type(searchBar, "item");

    // Confirm all items still show, as they all match
    expect(queriedItems).toEqual(items);
    expect(screen.getByText("No search results found")).not.toBeVisible();

    // Type "Item 1" into search bar
    userEvent.type(searchBar, " 1");

    // Confirm only first item is returned
    expect(queriedItems).toEqual([
      {
        id: 1,
        name: "Item 1",
        label: "Label 1",
      },
    ]);
    expect(screen.getByText("No search results found")).not.toBeVisible();

    // Type "Item 1-----" into search bar
    userEvent.type(searchBar, "-----");

    // Confirm error message is shown
    expect(queriedItems).toEqual([]);
    expect(screen.getByText("No search results found")).toBeVisible();

    // Clear search bar
    userEvent.type(searchBar, "{selectall}{backspace}");

    // Confirm returned to un-searched state
    expect(queriedItems).toEqual(items);
    expect(screen.getByText("No search results found")).not.toBeVisible();
  });
});
