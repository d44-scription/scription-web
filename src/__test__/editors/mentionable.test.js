import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mentionable from "../../components/editors/mentionable.component";
import http from "../../http-common";

describe("Mentionable component", () => {
  const notebookId = 1;
  let value = "";
  const setValue = (v) => {
    value = v;
  };

  const fakeMentionables = [
    {
      name: "Item",
      id: 1,
    },
    {
      name: "Character",
      id: 2,
    },
    {
      name: "Location",
      id: 3,
    },
  ];

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeMentionables,
      })
    );

    setValue("");
  });

  test("Running action correctly on enter", () => {
    let submitTestVal = false;
    const onSubmit = () => {
      submitTestVal = true;
    };

    render(
      <Mentionable onSubmit={onSubmit} value={value} setValue={setValue} />
    );

    // Sanity check
    expect(submitTestVal).toBe(false);

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to add a note");
    userEvent.type(textField, "Note contents{enter}");

    // Confirm action runs
    expect(submitTestVal).toBe(true);
  });

  test("Correctly cancelling submit on escape", () => {
    render(<Mentionable value={value} setValue={setValue} />);

    // Add content to text field
    const textField = screen.getByPlaceholderText("Click here to add a note");

    userEvent.type(textField, "X");
    expect(value).toBe("X");

    // Press escape, confirm that text is removed
    userEvent.type(textField, "{esc}");
    expect(value).toBe("");
  });

  test("Correctly rendering messages", () => {
    const successMessage = "Success Message";
    const errorMessage = "Error Message";

    render(
      <Mentionable
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText("Success Message")).toBeVisible();
    expect(screen.getByText("Error Message")).toBeVisible();
  });

  test("Formatting mentions correctly", () => {
    render(
      <Mentionable
        value="This note mentions @[Wheaty](@1), #[Diskworld](#1), and :[Luggage](:1)"
        setValue={setValue}
      />
    );

    // Confirm mentions are formatted nicely
    expect(screen.getByText("This note mentions Wheaty, Diskworld, and Luggage")).toBeVisible();
  });

  test("Rendering list of mentionables", async () => {
    // FIXME: Add tests for the list rendering correctly.

    render(
      <Mentionable value={value} setValue={setValue} notebookId={notebookId} />
    );

    const textField = screen.getByPlaceholderText("Click here to add a note");

    await act(async () => {
      userEvent.type(textField, "@");
    });

    // expect(http.get).toBeCalledWith("/notebooks/1/characters.json");
  });
});
