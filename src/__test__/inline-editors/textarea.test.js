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

  test("entering and leaving rest state", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TextArea value={value} />);
    });

    // Confirm that, at rest state, text is visible, text box & spinner are hidden
    expect(screen.getByRole("text")).toBeVisible();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByTitle("Saving changes")).not.toBeVisible();

    // Click span
    userEvent.click(screen.getByRole("text"));

    // Confirm that when not at rest state, text box is visible, text & spinner are hidden
    expect(screen.queryByRole("text")).toBeNull();
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.queryByTitle("Saving changes")).not.toBeVisible();

    // Press shift + enter
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{shift}{enter}{/shift}");
    });

    // Confirm that we are still not at rest
    expect(screen.queryByRole("text")).toBeNull();
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.queryByTitle("Saving changes")).not.toBeVisible();

    // Press `enter`
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm that we have returned to rest state
    expect(screen.getByRole("text")).toBeVisible();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByTitle("Saving changes")).not.toBeVisible();

    // Click span, press escape
    userEvent.click(screen.getByRole("text"));

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{esc}");
    });

    // Confirm that we have returned to rest state
    expect(screen.getByRole("text")).toBeVisible();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByTitle("Saving changes")).not.toBeVisible();
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
    expect(span).toBeVisible();
    expect(screen.queryByRole("textbox")).toBeNull();

    userEvent.type(span, "{enter}", { skipClick: true });

    // Confirm that we have left rest state
    expect(screen.queryByRole("text")).toBeNull();
    expect(screen.getByRole("textbox")).toBeVisible();
  });
});
