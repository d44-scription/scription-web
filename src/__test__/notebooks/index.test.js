import { render, screen } from "@testing-library/react";
import Index from "../../components/notebooks/index.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

it("renders list of notebooks", async () => {
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

  jest.spyOn(http, "get").mockImplementation(() =>
    Promise.resolve({
      data: fakeNotebooks,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Index />);
  });

  // Confirm all list elements are rendered
  expect(screen.getByText("Notebook 1")).toBeInTheDocument();
  expect(screen.getByTitle("Delete Notebook 1")).toBeInTheDocument();

  expect(screen.getByText("Notebook 2")).toBeInTheDocument();
  expect(screen.getByTitle("Delete Notebook 2")).toBeInTheDocument();

  // Confirm that, by default, no list items are selected
  expect(screen.getAllByRole("listitem")[0].className.includes("active")).toBe(
    false
  );
  expect(screen.getAllByRole("listitem")[1].className.includes("active")).toBe(
    false
  );

  // Click first list item
  await act(async () => {
    userEvent.click(screen.getByText("Notebook 1"));
  });

  // When clicked, only target element should be active
  expect(screen.getAllByRole("listitem")[0].className.includes("active")).toBe(
    true
  );
  expect(screen.getAllByRole("listitem")[1].className.includes("active")).toBe(
    false
  );

  // Confirm notebook component is shown
  expect(screen.getByText("No name saved.")).toBeInTheDocument();
  expect(screen.getByText("No summary saved.")).toBeInTheDocument();

  // Click delete icon for first item
  await act(async () => {
    userEvent.click(screen.getByTitle("Delete Notebook 1"));
  });

  // Confirm modal is shown
  expect(screen.getByText("Delete notebook?")).toBeInTheDocument();
  expect(
    screen.getByText(
      "This will delete Notebook 1 and all it's associated notes. Are you sure you wish to continue?"
    )
  ).toBeInTheDocument();

  http.get.mockRestore();
});
