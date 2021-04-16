import { render, screen } from "@testing-library/react";
import Exit from "components/icons/exit.component";

describe("Exit icon", () => {
  test("default rendering", () => {
    render(<Exit />);

    const icon = screen.getByTitle("Exit").closest("svg");

    // Sanity check
    expect(icon).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-box-arrow-right");
    expect(icon).toHaveClass("notable-link");
  });

  test("with custom title", () => {
    render(<Exit title="Test title" />);

    expect(screen.queryByTitle("Exit")).toBeNull();

    const icon = screen.getByTitle("Test title").closest("svg");

    // Sanity check
    expect(icon).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-box-arrow-right");
    expect(icon).toHaveClass("notable-link");
  });
});
