import { render, screen } from "@testing-library/react";
import Journal from "components/icons/journal.component";

describe("Journal icon", () => {
  test("default rendering", () => {
    render(<Journal />);

    const icon = screen.getByTitle("Picture of a journal").closest("svg");
    const title = screen.getByText("Unlinked");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-journal");
    expect(icon).toHaveClass("notable-link");
  });

  test("with custom title", () => {
    render(<Journal title="Test title" />);

    expect(screen.queryByTitle("Picture of a journal")).toBeNull();

    const icon = screen.getByTitle("Test title").closest("svg");
    const title = screen.getByText("Unlinked");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-journal");
    expect(icon).toHaveClass("notable-link");
  });

  test("with hidden title", () => {
    render(<Journal hideTitle />);
    const icon = screen.getByTitle("Picture of a journal").closest("svg");
    const title = screen.getByText("Unlinked");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).not.toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-journal");
    expect(icon).toHaveClass("notable-link");
  });
});
