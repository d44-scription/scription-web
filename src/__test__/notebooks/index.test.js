import { render, screen } from "@testing-library/react";
import Index from "../../components/notebooks/index.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Index component", () => {
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
    const listItem1 = screen.getByText("Notebook 1").closest("li");
    const listItem2 = screen.getByText("Notebook 2").closest("li");

    // Confirm all list elements are rendered
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();

    // Confirm that, by default, no list items are selected
    expect(listItem1).not.toHaveClass("active")
    expect(listItem2).not.toHaveClass("active")

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
  });
});
