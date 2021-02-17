import { render, screen } from "@testing-library/react";
import House from "../../components/icons/house.component";

describe("House icon", () => {
  test("default rendering", () => {
    render(<House />);

    const icon = screen.getByTitle("Picture of a house").closest("svg");
    const title = screen.getByText("Locations");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-house-door");
    expect(icon).toHaveClass("notable-link");
  });

  test("with custom title", () => {
    render(<House title="Test title" />);

    expect(screen.queryByTitle("Picture of a house")).toBeNull();

    const icon = screen.getByTitle("Test title").closest("svg");
    const title = screen.getByText("Locations");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-house-door");
    expect(icon).toHaveClass("notable-link");
  });

  test("with hidden title", () => {
    render(<House hideTitle />);
    const icon = screen.getByTitle("Picture of a house").closest("svg");
    const title = screen.getByText("Locations");

    // Sanity check
    expect(icon).toBeVisible();
    expect(title).not.toBeVisible();

    // Confirm icon has correct classes
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-house-door");
    expect(icon).toHaveClass("notable-link");
  });
});
