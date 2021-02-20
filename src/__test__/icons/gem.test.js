import { render, screen } from "@testing-library/react";
import Gem from "components/icons/gem.component";

describe("Gem icon", () => {
  test("default rendering", () => {
    render(<Gem />);

    const icon = screen.getByTitle("Picture of a gem").closest("svg");
    const title = screen.getByText("Items");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-gem");
    expect(icon).toHaveClass("notable-link");
  });

  test("with custom title", () => {
    render(<Gem title="Test title" />);

    expect(screen.queryByTitle("Picture of a gem")).toBeNull();

    const icon = screen.getByTitle("Test title").closest("svg");
    const title = screen.getByText("Items");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-gem");
    expect(icon).toHaveClass("notable-link");
  });

  test("with hidden title", () => {
    render(<Gem hideTitle />);
    const icon = screen.getByTitle("Picture of a gem").closest("svg");
    const title = screen.getByText("Items");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).not.toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-gem");
    expect(icon).toHaveClass("notable-link");
  });
});
