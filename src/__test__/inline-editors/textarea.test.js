import { render, screen } from "@testing-library/react";
import TextArea from "../../components/inline-editors/textarea.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Text area component", () => {
  const value = "Test Text";
  const successfulResponse = {
    code: 200,
  };

  beforeEach(() => {
    jest.spyOn(http, "put").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );
  });

  afterEach(() => {
    http.put.mockRestore();
  });

  const confirmRestState = () => {
    // Text span should be visible
    expect(screen.getByRole("text")).toBeVisible();

    // Confirm help text does not show
    expect(screen.queryByRole("button", { name: "enter" })).toBeNull();
    expect(screen.queryByRole("button", { name: "escape" })).toBeNull();

    // Input field should not be visible
    expect(screen.queryByRole("textbox")).toBeNull();

    // Loading icon should not be visible
    expect(screen.getByTitle("Saving changes")).not.toBeVisible();
  };

  const confirmActiveState = () => {
    // Confirm text span is hidden
    expect(screen.queryByRole("text")).toBeNull();

    // Confirm help text shows
    expect(screen.getByRole("button", { name: "enter" })).toBeVisible();
    expect(screen.getByRole("button", { name: "escape" })).toBeVisible();

    // Confirm text input is shown
    expect(screen.getByRole("textbox")).toBeVisible();

    // Confirm loading gif is hidden
    expect(screen.queryByTitle("Saving changes")).not.toBeVisible();
  };

  test("entering and leaving rest state", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TextArea value={value} />);
    });

    // Should be at rest by default
    confirmRestState();

    // Click span
    userEvent.click(screen.getByRole("text"));

    // Clicking text should leave rest state
    confirmActiveState();

    // Press shift + enter
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{shift}{enter}{/shift}");
    });

    // Confirm that we are still not at rest
    confirmActiveState();

    // Press `enter`
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm that we have returned to rest state
    confirmRestState();

    // Click span, press escape
    userEvent.click(screen.getByRole("text"));

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{esc}");
    });

    // Confirm that we have returned to rest state
    confirmRestState();
  });

  test("rendering with a given font size", async () => {
    let fontSize = "2rem";

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TextArea value={value} fontSize={fontSize} />);
    });

    // Confirm span has correct font size
    expect(
      screen.getByRole("label").style.cssText.includes("font-size: 2rem")
    ).toBe(true);

    // Click span
    userEvent.click(screen.getByRole("text"));

    // Confirm text field has correct font size
    expect(
      screen.getByRole("textbox").style.cssText.includes("font-size: 2rem")
    ).toBe(true);
  });

  test("rendering with a default font size", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TextArea value={value} />);
    });

    // Confirm span has correct font size
    expect(
      screen.getByRole("label").style.cssText.includes("font-size: 1rem")
    ).toBe(true);

    // Click span
    userEvent.click(screen.getByRole("text"));

    // Confirm text field has correct font size
    expect(
      screen.getByRole("textbox").style.cssText.includes("font-size: 1rem")
    ).toBe(true);
  });

  test("responding to tab", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TextArea value={value} />);
    });

    userEvent.tab();

    // Confirm that span has focus
    const span = screen.getByRole("text");
    expect(document.activeElement).toEqual(span);

    // Confirm we are still in rest state
    confirmRestState();

    userEvent.type(span, "{enter}", { skipClick: true });

    // Confirm that we have left rest state
    confirmActiveState();
  });
});
