import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Messages from "components/editors/messages.component";

describe("Messages component", () => {
  const errorMessage = "Error Message";
  const successMessage = "Success Message";
  const helpMessage = "Help Message";

  test("displaying given messages", async () => {
    const { rerender } = render(
      <Messages
        error={errorMessage}
        success={successMessage}
        help={helpMessage}
      />
    );

    const saveButton = screen.getByRole("button", { name: "enter" });
    const cancelButton = screen.getByRole("button", { name: "escape" });

    // Confirm default help text shows
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();

    // Confirm provided text shows
    expect(screen.getByText(errorMessage)).toBeVisible();
    expect(screen.getByText(successMessage)).toBeVisible();
    expect(screen.getByText(helpMessage)).toBeVisible();

    rerender(<Messages success={successMessage} help={helpMessage} />);

    // Confirm default help text shows
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();

    // Confirm only provided text shows
    expect(screen.queryByText(errorMessage)).toBeNull();
    expect(screen.getByText(successMessage)).toBeVisible();
    expect(screen.getByText(helpMessage)).toBeVisible();

    rerender(<Messages />);

    // Confirm default help text shows
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();

    // Confirm no additional text is shown if not needed
    expect(screen.queryByText(errorMessage)).toBeNull();
    expect(screen.queryByText(successMessage)).toBeNull();
    expect(screen.queryByText(helpMessage)).toBeNull();
  });

  test("Running save and cancel actions successfully", () => {
    let testSaveVal = false;
    let testCancelVal = false;

    render(
      <Messages
        saveAction={() => {
          testSaveVal = true;
        }}
        cancelAction={() => {
          testCancelVal = true;
        }}
      />
    );

    const saveButton = screen.getByRole("button", { name: "enter" });
    const cancelButton = screen.getByRole("button", { name: "escape" });

    // Confirm default help text shows
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();

    // Sanity check
    expect(testSaveVal).toBe(false);
    expect(testCancelVal).toBe(false);

    // Click save
    userEvent.click(saveButton);

    // Confirm only save action passed
    expect(testSaveVal).toBe(true);
    expect(testCancelVal).toBe(false);

    // Click cancel
    userEvent.click(cancelButton);

    // Confirm both actions passed
    expect(testSaveVal).toBe(true);
    expect(testCancelVal).toBe(true);
  });

  test("showing and hiding default text as props change", () => {
    const { rerender } = render(<Messages />);

    // Confirm help text shows by default
    expect(screen.getByRole("button", { name: "enter" })).toBeVisible();
    expect(screen.getByRole("button", { name: "escape" })).toBeVisible();

    rerender(<Messages hideHelpText />);

    // Confirm `hideHelpText` prop hides text
    expect(screen.queryByRole("button", { name: "enter" })).toBeNull();
    expect(screen.queryByRole("button", { name: "escape" })).toBeNull();
  });
});
