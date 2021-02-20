import { render, screen } from "@testing-library/react";
import Person from "components/icons/person.component";

describe("Person icon", () => {
  test("default rendering", () => {
    render(<Person />);

    const icon = screen.getByTitle("Picture of a person").closest("svg");
    const title = screen.getByText("Characters");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-person");
    expect(icon).toHaveClass("notable-link");
  });

  test("with custom title", () => {
    render(<Person title="Test title" />);

    expect(screen.queryByTitle("Picture of a person")).toBeNull();

    const icon = screen.getByTitle("Test title").closest("svg");
    const title = screen.getByText("Characters");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-person");
    expect(icon).toHaveClass("notable-link");
  });

  test("with hidden title", () => {
    render(<Person hideTitle />);
    const icon = screen.getByTitle("Picture of a person").closest("svg");
    const title = screen.getByText("Characters");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).not.toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-person");
    expect(icon).toHaveClass("notable-link");
  });
});
