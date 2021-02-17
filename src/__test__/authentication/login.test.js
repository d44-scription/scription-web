import { render, screen } from "@testing-library/react";
import Login from "../../components/authentication/login.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Login component", () => {
  const successfulResponse = {
    code: 200,
  };

  const unsuccessfulResponse = {
    data: {
      errors: ["Error message"],
    },
  };

  const confirmRestState = () => {
    expect(screen.getByText("Scription")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Password")).toBeVisible();
    expect(screen.getByText("Log in")).toBeVisible();
    expect(screen.getByText("Register")).toBeVisible();
  };

  afterEach(() => {
    http.post.mockRestore();
  });

  describe("successful request", () => {
    beforeEach(() => {
      jest.spyOn(http, "post").mockImplementation(() =>
        Promise.resolve({
          data: successfulResponse,
        })
      );
    });

    test("rendering correct fields", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      // Login
      const emailField = screen.getByPlaceholderText("Email");
      const passwordField = screen.getByPlaceholderText("Password");

      userEvent.type(emailField, "test@example.com");
      userEvent.type(passwordField, "superSecret123!{enter}");

      expect(http.post).toBeCalledWith("/users/login", {
        user: { email: "test@example.com", password: "superSecret123!" },
      });
    });

    test("responding to tab", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      // Login
      const emailField = screen.getByPlaceholderText("Email");
      const passwordField = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByText("Log in");
      const registerButton = screen.getByText("Register");

      userEvent.tab();
      expect(emailField).toHaveFocus();

      userEvent.tab();
      expect(passwordField).toHaveFocus();

      userEvent.tab();
      expect(loginButton).toHaveFocus();

      userEvent.tab();
      expect(registerButton).toHaveFocus();
    });
  });

  describe("Correctly rendering errors", () => {
    beforeEach(() => {
      jest.spyOn(http, "post").mockImplementation(() =>
        Promise.reject({
          response: unsuccessfulResponse,
        })
      );
    });

    test("rendering error", async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      // Login
      const emailField = screen.getByPlaceholderText("Email");
      const passwordField = screen.getByPlaceholderText("Password");

      userEvent.type(emailField, "test@example.com");
      userEvent.type(passwordField, "superSecret123!");

      await act(async () => {
        userEvent.click(screen.getByText("Log in"));
      });

      expect(http.post).toBeCalledWith("/users/login", {
        user: { email: "test@example.com", password: "superSecret123!" },
      });

      expect(screen.getByText("Error message")).toBeVisible();
    });
  });
});
