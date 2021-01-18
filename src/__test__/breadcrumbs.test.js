import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../components/breadcrumbs.component";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Breadcrumbs component", () => {
  test("displaying brand in isolation correctly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Route path={"/"}>
          <Breadcrumbs />
        </Route>
      </MemoryRouter>
    );

    const brandLink = screen.getByText("Scription");

    // Confirm brand is rendered in isolation and is not made a link
    expect(brandLink).toBeVisible();
    expect(brandLink).toHaveClass("active");
    expect(brandLink).not.toHaveAttribute("href");
    expect(screen.queryByText("/")).toBeNull();
  });

  describe("When generating multiple crumbs", () => {
    const path = "notebooks/path/to/resource";

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <Route path={path}>
            <Breadcrumbs />
          </Route>
        </MemoryRouter>
      );
    });

    test("displaying each breadcrumb correctly", () => {
      // First crumb ("/notebooks") replaced with brand
      const brandLink = screen.getByText("Scription");
      const notebooksCrumb = screen.queryByText("notebooks");
      const pathCrumb = screen.getByText("path");
      const toCrumb = screen.getByText("to");
      const resourceCrumb = screen.getByText("resource");

      // Confirm all links rendered
      expect(brandLink).toBeVisible();
      expect(notebooksCrumb).toBeNull();
      expect(pathCrumb).toBeVisible();
      expect(toCrumb).toBeVisible();
      expect(resourceCrumb).toBeVisible();

      // Confirm only latest item is active
      expect(brandLink).not.toHaveClass("active");
      expect(pathCrumb).not.toHaveClass("active");
      expect(toCrumb).not.toHaveClass("active");
      expect(resourceCrumb).toHaveClass("active");

      // Confirm links are generated correctly
      expect(brandLink).toHaveAttribute("href", "/");
      expect(pathCrumb).toHaveAttribute("href", "notebooks/path");
      expect(toCrumb).toHaveAttribute("href", "notebooks/path/to");
      expect(resourceCrumb).not.toHaveAttribute("href");
    });

    test("responding to tab+enter correctly", () => {
      const brandLink = screen.getByText("Scription");

      userEvent.tab();

      expect(brandLink).toHaveFocus();

      userEvent.type(brandLink, "{enter}", { skipClick: true });

      expect(brandLink).not.toBeInTheDocument();
    });

    test("responding to tab+space correctly", () => {
      const brandLink = screen.getByText("Scription");

      userEvent.tab();

      expect(brandLink).toHaveFocus();

      userEvent.type(brandLink, " ", { skipClick: true });

      expect(brandLink).not.toBeInTheDocument();
    });
  });
});
