import { render, screen } from "@testing-library/react";
import Register from "components/authentication/register.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Register component", () => {
  const successfulResponse = {
    code: 200,
  };

  const unsuccessfulResponse = {
    data: ["Error message 1", "Error message 2"],
  };

  const confirmRestState = () => {
    expect(screen.getByPlaceholderText("Display Name")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Password")).toBeVisible();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeVisible();
    expect(screen.getByText("Register")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
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
          <Register />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      // Register
      const displayField = screen.getByPlaceholderText("Display Name");
      const emailField = screen.getByPlaceholderText("Email");
      const passwordField = screen.getByPlaceholderText("Password");
      const confirmField = screen.getByPlaceholderText("Confirm Password");

      userEvent.type(displayField, "Test Name");
      userEvent.type(emailField, "test@example.com");
      userEvent.type(passwordField, "superSecret123!");
      userEvent.type(confirmField, "superSecret123!{enter}");

      expect(http.post).toBeCalledWith("/users", {
        user: {
          display_name: "Test Name",
          email: "test@example.com",
          password: "superSecret123!",
          password_confirmation: "superSecret123!",
        },
      });
    });

    test("responding to tab", () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      // Login
      const displayField = screen.getByPlaceholderText("Display Name");
      const emailField = screen.getByPlaceholderText("Email");
      const passwordField = screen.getByPlaceholderText("Password");
      const confirmField = screen.getByPlaceholderText("Confirm Password");

      const registerButton = screen.getByText("Register");
      const cancelButton = screen.getByText("Cancel");

      userEvent.tab();
      expect(displayField).toHaveFocus();

      userEvent.tab();
      expect(emailField).toHaveFocus();

      userEvent.tab();
      expect(passwordField).toHaveFocus();

      userEvent.tab();
      expect(confirmField).toHaveFocus();

      userEvent.tab();
      expect(registerButton).toHaveFocus();

      userEvent.tab();
      expect(cancelButton).toHaveFocus();
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
          <Register />
        </BrowserRouter>
      );

      // Confirm we start at rest state
      confirmRestState();

      await act(async () => {
        userEvent.click(screen.getByText("Register"));
      });

      expect(http.post).toBeCalledWith("/users", {
        user: {
          display_name: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
      });

      expect(
        screen.getByText("Error message 1. Error message 2")
      ).toBeVisible();
    });
  });
});
