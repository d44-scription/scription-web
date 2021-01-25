import { render, screen } from "@testing-library/react";
import Show from "../../components/notebooks/show.component";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Show component", () => {
  const id = 1;
  const placeholder = "Click here to add a note";

  const fakeNotebook = {
    name: "Notebook 1",
    id: id,
  };

  const successfulResponse = {
    code: 200,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotebook,
      })
    );

    jest.spyOn(http, "post").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
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
    http.post.mockRestore();
  });

  const confirmRestState = () => {
    expect(screen.getByText("Notebook 1")).toBeVisible();
    expect(screen.getByPlaceholderText(placeholder)).toBeVisible();
    expect(
      screen.getByText(
        "Use @ to reference a character, : to reference an item, and # to reference a location"
      )
    ).toBeVisible();

    expect(
      screen.getByTitle("View characters for Notebook 1")
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("View locations for Notebook 1")
    ).toBeInTheDocument();

    expect(screen.getByTitle("View items for Notebook 1")).toBeInTheDocument();
  };

  test("displaying success messages", async () => {
    // Confirm we start at rest state
    confirmRestState();

    // Add a new note
    userEvent.click(screen.getByPlaceholderText(placeholder));
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm we have returned to rest state with a success message
    expect(screen.getByText("Your note has been added")).toBeVisible();
    confirmRestState();

    // Type another note
    userEvent.click(screen.getByPlaceholderText(placeholder));
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "A");
    });

    // Confirm success message disappears
    expect(screen.queryByText("Your note has been added")).toBeNull();
  });

  test("notable links respond to tab correctly", () => {
    // Confirm we start at rest state
    confirmRestState();

    const charButton = screen
      .getByTitle("View characters for Notebook 1")
      .closest("button");

    const locationButton = screen
      .getByTitle("View locations for Notebook 1")
      .closest("button");

    const itemButton = screen
      .getByTitle("View items for Notebook 1")
      .closest("button");

    // Skip note editor, this is tested at src/__test__/editors/inline_editor.test.js
    for (let i = 0; i < 4; i++) {
      userEvent.tab();
    }

    // Confirm SVG buttons are focusable
    expect(charButton).toHaveFocus();

    userEvent.tab();
    expect(locationButton).toHaveFocus();

    userEvent.tab();
    expect(itemButton).toHaveFocus();
  });
});
