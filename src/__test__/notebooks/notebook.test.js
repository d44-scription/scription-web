import { render, screen } from "@testing-library/react";
import Edit from "../../components/notebooks/edit.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";

describe("Edit component", () => {
  const fakeNotebook = {
    name: "Notebook 1",
    id: 1,
    summary: "Mock summary",
    order_index: 0,
  };

  beforeEach(() => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotebook,
      })
    );
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notebook", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Edit id="1" />);
    });

    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Notebook 1")).toBeInTheDocument();
    expect(screen.getAllByText("Mock summary")[0]).toBeInTheDocument();
  });
});
