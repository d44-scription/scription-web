import { render, screen } from "@testing-library/react";
import NotableSearch from "components/notebooks/notable-search.component";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Notable search component", () => {
  const notebookId = 1;
  const fakeNotables = [
    {
      name: "Notable 1",
      type: "Character",
      id: 1,
    },
    {
      name: "Notable 2",
      type: "Item",
      id: 2,
    },
    {
      name: "Notable 3",
      type: "Location",
      id: 2,
    },
  ];

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotables,
      })
    );
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering elements & making query requests correctly", async () => {
    render(<NotableSearch notebookId={notebookId} />);

    const textField = screen.getByText("Type here to search...");

    expect(screen.queryByText("Notable 1")).toBeNull();
    expect(screen.queryByText("Notable 2")).toBeNull();
    expect(screen.queryByText("Notable 3")).toBeNull();

    await act(async () => {
      userEvent.type(textField, "X");
    });

    expect(http.get).toBeCalledWith(`/notebooks/${notebookId}/notables?q=X`);

    expect(screen.getByText("Notable 1")).toBeVisible();
    expect(screen.getByText("Notable 2")).toBeVisible();
    expect(screen.getByText("Notable 3")).toBeVisible();
  });
});
