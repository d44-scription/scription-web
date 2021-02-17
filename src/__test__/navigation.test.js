import { render, screen } from "@testing-library/react";
import Navigation from "../components/navigation.component";
import { BrowserRouter } from "react-router-dom";
import http from "../http-common";
import userEvent from "@testing-library/user-event";

describe("Navigation component", () => {
  beforeEach(() => {
    jest.spyOn(http, "delete").mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    http.delete.mockRestore();
  });

  test("rendering log in button", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText("Scription")).toBeVisible();
    expect(screen.getByText("Log in")).toBeVisible();

    expect(screen.queryByText("Log out")).toBeNull();
    expect(screen.queryByTitle("Account Settings")).toBeNull();

    userEvent.click(screen.getByText("Log in"));

    expect(http.delete).toBeCalledTimes(0);
  });

  test("rendering logout & account settings icons", () => {
    localStorage.setItem("id", "Test");

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText("Scription")).toBeVisible();
    expect(screen.getByText("Log out")).toBeVisible();

    expect(screen.getByTitle("Account Settings")).toBeInTheDocument();

    expect(screen.queryByText("Log in")).toBeNull();

    userEvent.click(screen.getByText("Log out"));

    expect(http.delete).toBeCalledWith("/users/logout");

    userEvent.click(screen.getByTitle("Account Settings"));

    expect(http.delete).toBeCalledTimes(1);
  });
});
