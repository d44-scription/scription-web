import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  test("rendering navigation bar", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Scription")[1]).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Password")).toBeVisible();
    expect(screen.getAllByText("Log in")[1]).toBeVisible();
    expect(screen.getByText("Register")).toBeVisible();
  });
});
