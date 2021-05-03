import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mentionable from "components/editors/mentionable.component";
import http from "http-common";

describe("Mentionable component", () => {
  const successMessage = "Success Message";
  const errorMessage = "Error Message";
  const notebookId = 1;
  const formLabel = "Form Label"
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

    render(
      <Mentionable
        action={action}
        value={value}
        setValue={setValue}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(
      screen.queryByText(`Successfully saved. ${successMessage}`)
    ).toBeNull();

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm success message shows
    expect(
      screen.getByText(`Successfully saved. ${successMessage}`)
    ).toBeVisible();
  });

  test("Rendering with a custom placeholder", () => {
    render(
      <Mentionable
        value={value}
        setValue={setValue}
        placeholder="Test placeholder"
        action={() => {}}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Confirm field has desired placeholder
    expect(screen.queryByPlaceholderText("Click here to edit")).toBeNull();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeVisible();
  });

  describe("Cancelling submission", () => {
    test("Clearing input when clearOnCancel prop is given", () => {
      render(
        <Mentionable
          value={value}
          setValue={setValue}
          clearOnCancel
          action={() => {}}
          formLabel={formLabel}
          notebookId={0}
        />
      );

      expect(screen.getByText(formLabel)).toBeVisible();

      // Add content to text field
      const textField = screen.getByPlaceholderText("Click here to edit");

      userEvent.type(textField, "X");
      expect(value).toBe("X");

      // Press escape, confirm that text is removed
      userEvent.type(textField, "{esc}");
      expect(value).toBe("");
    });

    test("Persisting input when clearOnCancel prop is false", () => {
      render(
        <Mentionable
          value={value}
          setValue={setValue}
          action={() => {}}
          formLabel={formLabel}
          notebookId={0}
        />
      );

      expect(screen.getByText(formLabel)).toBeVisible();

      // Add content to text field
      const textField = screen.getByPlaceholderText("Click here to edit");

      userEvent.type(textField, "X");
      expect(value).toBe("X");

      // Press escape, confirm that text is removed
      userEvent.type(textField, "{esc}");
      expect(value).toBe("X");
    });
  });

  test("Correctly rendering success messages", async () => {
    const action = () => {
      return Promise.resolve({
        data: {
          success_message: successMessage,
        },
      });
    };

    render(
      <Mentionable
        action={action}
        setValue={setValue}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(
      screen.queryByText(`Successfully saved. ${successMessage}`)
    ).toBeNull();

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm success message shows
    expect(
      screen.getByText(`Successfully saved. ${successMessage}`)
    ).toBeVisible();
  });

  test("Correctly rendering success message when nothing returned", async () => {
    const action = () => {
      return Promise.resolve();
    };

    render(
      <Mentionable
        action={action}
        setValue={setValue}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(screen.queryByText("Successfully saved.")).toBeNull();

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm success message shows
    expect(screen.getByText("Successfully saved.")).toBeVisible();
  });

  test("Correctly rendering error messages", async () => {
    const action = () => {
      return Promise.reject({
        response: {
          data: [errorMessage],
        },
      });
    };

    render(
      <Mentionable
        action={action}
        setValue={setValue}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(screen.queryByText(errorMessage)).toBeNull();

    // Type into text box and hit enter
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm error message shows
    expect(screen.getByText(errorMessage)).toBeVisible();
  });

  test("Responding to clearOnSubmit correctly", async () => {
    const action = () => {
      return Promise.resolve();
    };

    render(
      <Mentionable
        action={action}
        value={value}
        setValue={setValue}
        clearOnSubmit
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(value).toBe("");

    // Type into text box
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents");
    });

    // Confirm content is added
    expect(value).not.toBe("");

    // Submit data
    await act(async () => {
      userEvent.type(textField, "{enter}");
    });

    // Confirm value is cleared
    expect(value).toBe("");
  });

  test("Responding to clearOnCancel correctly", async () => {
    render(
      <Mentionable
        value={value}
        setValue={setValue}
        clearOnCancel
        action={() => {}}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(value).toBe("");

    // Type into text box
    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "Note contents");
    });

    // Confirm content is added
    expect(value).not.toBe("");

    // Cancel submission
    await act(async () => {
      userEvent.type(textField, "{esc}");
    });

    // Confirm value is cleared
    expect(value).toBe("");
  });

  test("Running onSubmitAction correctly", async () => {
    let testVal = false;

    const action = () => {
      return Promise.resolve();
    };

    const onSubmitAction = () => {
      testVal = true;
    };

    render(
      <Mentionable
        action={action}
        value={value}
        setValue={setValue}
        onSubmitAction={onSubmitAction}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Sanity check
    expect(testVal).toBe(false);

    // Type into text box
    const textField = screen.getByPlaceholderText("Click here to edit");

    // Cancel data
    await act(async () => {
      userEvent.type(textField, "Note contents{esc}");
    });

    // Confirm action is not run
    expect(testVal).toBe(false);

    // Submit data
    await act(async () => {
      userEvent.type(textField, "Note contents{enter}");
    });

    // Confirm action is run
    expect(testVal).toBe(true);
  });

  test("Formatting mentions correctly", () => {
    render(
      <Mentionable
        value="This note mentions @[Wheaty](@1), #[Diskworld](#1), and :[Luggage](:1)"
        setValue={setValue}
        action={() => {}}
        formLabel={formLabel}
        notebookId={0}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    // Confirm mentions are formatted nicely
    expect(
      screen.getByText("This note mentions Wheaty, Diskworld, and Luggage")
    ).toBeVisible();
  });

  test("Rendering list of mentionables", async () => {
    // FIXME: Add tests for the list rendering correctly.

    render(
      <Mentionable
        value={value}
        setValue={setValue}
        notebookId={notebookId}
        action={() => {}}
        formLabel={formLabel}
      />
    );

    expect(screen.getByText(formLabel)).toBeVisible();

    const textField = screen.getByPlaceholderText("Click here to edit");

    await act(async () => {
      userEvent.type(textField, "@");
    });

    // expect(http.get).toBeCalledWith("/notebooks/1/characters");
  });
});
