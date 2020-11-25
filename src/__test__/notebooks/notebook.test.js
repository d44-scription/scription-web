import { render, screen } from "@testing-library/react";
import Notebook from "../../components/notebooks/notebook.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";

it("renders information for a given notebook", async () => {
  const fakeNotebook = {
    name: "Notebook 1",
    id: 1,
    summary: "Mock summary",
    order_index: 0,
  };

  jest.spyOn(http, "get").mockImplementation(() =>
    Promise.resolve({
      data: fakeNotebook,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Notebook id="1" />);
  });

  // Confirm data is retrieved and displayed correctly
  expect(screen.getByText("Notebook 1")).toBeInTheDocument();
  expect(screen.getAllByText("Mock summary")[0]).toBeInTheDocument();
});
