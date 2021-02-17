import { render, screen } from "@testing-library/react";
import Account from "../components/account.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../http-common";
import userEvent from "@testing-library/user-event";

describe("Account component", () => {
  const successfulResponse = {
    code: 200,
  };

  const unsuccessfulResponse = {
    data: ["Error message"],
  };

  const fakeUser = {
    id: 1,
    display_name: "User",
    email: "test@example.com",
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeUser,
      })
    );
  });

  const confirmRestState = () => {
    expect(screen.getByText("User")).toBeVisible();
    expect(screen.getByText("test@example.com")).toBeVisible();
    expect(screen.getByText("Return")).toBeVisible();
  };

  afterEach(() => {
    http.get.mockRestore();
    http.put.mockRestore();
  });

  describe("successful request", () => {
    beforeEach(() => {
      jest.spyOn(http, "put").mockImplementation(() =>
        Promise.resolve({
          data: successfulResponse,
        })
      );
    });

    test("rendering correct fields", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Account />
          </BrowserRouter>
        );
      });

      // Confirm we start at rest state
      confirmRestState();

      // Edit fields & confirm API calls are made
      const displayField = screen.getByText("User");
      const emailField = screen.getByText("test@example.com");

      userEvent.type(displayField, "test");

      await act(async () => {
        userEvent.click(screen.getAllByText("enter")[0]);
      });

      expect(http.put).toBeCalledWith("/users/null", {
        user: { display_name: "Usertest" },
      });

      expect(
        screen.getByText("Changes have been saved successfully")
      ).toBeVisible();
      userEvent.type(emailField, "test");

      await act(async () => {
        userEvent.click(screen.getAllByText("enter")[1]);
      });

      expect(http.put).toBeCalledWith("/users/null", {
        user: { email: "test@example.comtest" },
      });
    });
  });

  describe("Correctly rendering errors", () => {
    beforeEach(() => {
      jest.spyOn(http, "put").mockImplementation(() =>
        Promise.reject({
          response: unsuccessfulResponse,
        })
      );
    });

    test("rendering error", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Account />
          </BrowserRouter>
        );
      });

      // Confirm we start at rest state
      confirmRestState();

      // Edit display name
      const displayField = screen.getByText("User");

      userEvent.type(displayField, "test");

      await act(async () => {
        userEvent.click(screen.getAllByText("enter")[0]);
      });

      expect(http.put).toBeCalledWith("/users/null", {
        user: { display_name: "Usertest" },
      });

      expect(screen.getByText("Error message")).toBeVisible();
    });
  });
});
