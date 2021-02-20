import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MentionableReadonly from "components/editors/mentionable_readonly.component";

describe("MentionableReadonly component", () => {
  let rawValue =
    "This note mentions @[Wheaty](@1), #[Diskworld](#1), and :[Luggage](:1)";
  let displayValue = "This note mentions Wheaty, Diskworld, and Luggage";
  let testString = "------ Testing string ------";

  test("Formatting mentions correctly", () => {
    render(<MentionableReadonly value={rawValue} />);

    // Confirm mentions are formatted nicely
    const textField = screen.getByText(
      "This note mentions Wheaty, Diskworld, and Luggage"
    );

    expect(screen.getByText(displayValue)).toBeVisible();
    expect(screen.queryByText(rawValue)).toBeNull();

    // Confirm user cannot edit the text field
    userEvent.type(textField, testString);

    expect(screen.queryByText(testString)).toBeNull();
  });
});
