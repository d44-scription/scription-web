import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mentionable from "../../components/editors/mentionable.component";
import http from "../../http-common";

describe("Mentionable component", () => {
  const successMessage = "Success Message";
  const errorMessage = "Error Message";
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

  test("Running action correctly on enter", async () => {
    const action = () => {
      return Promise.resolve({
        data: {
          success_message: successMessage,
        },
      });
    };

    render(<Mentionable action={action} value={value} setValue={setValue} />);

    // Sanity check
    expect(screen.queryByText(`Successfully saved. ${successMessage}`)).toBeNull();

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("No content");

    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm success message shows
    expect(screen.getByText(`Successfully saved. ${successMessage}`)).toBeVisible();
  });

  test("Rendering with a custom placeholder", () => {
    render(
      <Mentionable
        value={value}
        setValue={setValue}
        placeholder="Test placeholder"
      />
    );

    // Confirm field has desired placeholder
    expect(screen.queryByPlaceholderText("No content")).toBeNull();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeVisible();
  });

  describe("Cancelling submission", () => {
    test("Clearing input when clearOnCancel prop is given", () => {
      render(<Mentionable value={value} setValue={setValue} clearOnCancel />);

      // Add content to text field
      const textField = screen.getByPlaceholderText("No content");

      userEvent.type(textField, "X");
      expect(value).toBe("X");

      // Press escape, confirm that text is removed
      userEvent.type(textField, "{esc}");
      expect(value).toBe("");
    });

    test("Persisting input when clearOnCancel prop is false", () => {
      render(<Mentionable value={value} setValue={setValue} />);

      // Add content to text field
      const textField = screen.getByPlaceholderText("No content");

      userEvent.type(textField, "X");
      expect(value).toBe("X");

      // Press escape, confirm that text is removed
      userEvent.type(textField, "{esc}");
      expect(value).toBe("X");
    });
  });

  test("Correctly rendering messages", () => {
    render(
      <Mentionable
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );

    // TODO: Rewrite this to go through actions that would cause success or error
    // expect(screen.getByText(`Successfully saved. ${successMessage}`)).toBeVisible();
    // expect(screen.getByText(errorMessage)).toBeVisible();
  });

  test("Formatting mentions correctly", () => {
    render(
      <Mentionable
        value="This note mentions @[Wheaty](@1), #[Diskworld](#1), and :[Luggage](:1)"
        setValue={setValue}
      />
    );

    // Confirm mentions are formatted nicely
    expect(
      screen.getByText("This note mentions Wheaty, Diskworld, and Luggage")
    ).toBeVisible();
  });

  test("Rendering list of mentionables", async () => {
    // FIXME: Add tests for the list rendering correctly.

    render(
      <Mentionable value={value} setValue={setValue} notebookId={notebookId} />
    );

    const textField = screen.getByPlaceholderText("No content");

    await act(async () => {
      userEvent.type(textField, "@");
    });

    // expect(http.get).toBeCalledWith("/notebooks/1/characters.json");
  });
});
