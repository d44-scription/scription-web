import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mentionable from "../../components/editors/mentionable.component";
import http from "../../http-common";

describe("Show component", () => {
  const notebookId = 1;
  let value = "";
  const setValue = (e) => {
    value = `${value}${e.target.value}`;
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
  });

  test("Running action correctly on enter", () => {
    let submitTestVal = false;
    const onSubmit = () => {
      submitTestVal = true;
    };

    render(<Mentionable onSubmit={onSubmit} />);

    // Sanity check
    expect(submitTestVal).toBe(false);

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to add a note");
    userEvent.type(textField, "Note contents{enter}");

    // Confirm action runs
    expect(submitTestVal).toBe(true);
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

  test("Rendering list of mentionables", () => {
    render(
      <Mentionable value={value} onChange={setValue} notebookId={notebookId} />
    );

    const inputField = screen.getByPlaceholderText("Click here to add a note");
  });
});
