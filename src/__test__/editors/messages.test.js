import { render, screen } from "@testing-library/react";
import Messages from "../../components/editors/messages.component";

describe("Show component", () => {
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

  test("Running save and cancel actions successfully", () => {});

  test("showing and hiding default text as props change", () => {});
});
