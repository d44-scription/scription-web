import { render, screen } from "@testing-library/react";
import Show from "../../components/notebooks/show.component";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("New component", () => {
  const id = 1;

  const fakeNotebook = {
      name: "Notebook 1",
      id: id,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotebook,
      })
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/notebooks/${id}`]}>
          <Route path="/notebooks/:id">
            <Show />
          </Route>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  const confirmRestState = () => {
    expect(screen.getByText("Notebook 1")).toBeInTheDocument();
    expect(screen.getByText("Click here to add a note")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeInTheDocument();
  };

  test("rendering correct fields", async () => {
    // Confirm we start at rest state
    confirmRestState();
  });
});
