import { render, screen } from "@testing-library/react";
import Text from "../../components/inline-editors/text.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Text component", () => {
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
    // Confirm text span shows
    expect(screen.getByText(value)).toBeVisible();

    // Confirm help text does not show
    expect(screen.queryByRole("button", { name: "enter" })).toBeNull();
    expect(screen.queryByRole("button", { name: "escape" })).toBeNull();

    // Confirm input field & loading icon are hidden
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByTitle("Saving changes")).not.toBeVisible();
  };

  const confirmActiveState = () => {
    // Confirm text span does not show
    expect(screen.queryByText(value)).not.toBeVisible();

    // Confirm help text shows
    expect(screen.getByRole("button", { name: "enter" })).toBeVisible();
    expect(screen.getByRole("button", { name: "escape" })).toBeVisible();

    // Confirm input field shows
    expect(screen.getByRole("textbox")).toBeVisible();

    // Confirm saving svg does not show
    expect(screen.queryByTitle("Saving changes")).not.toBeVisible();
  };

  test("entering and leaving rest state", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Text value={value} />);
    });

    // By default, should be in rest state
    confirmRestState();

    // Click span
    userEvent.click(screen.getByText(value));

    // When text clicked, exit rest state
    confirmActiveState();

    // Press `enter`
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm that we have returned to rest state
    confirmRestState();

    // Click span, press escape
    userEvent.click(screen.getByText(value));

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
      render(<Text value={value} fontSize={fontSize} />);
    });

    // Confirm span has correct font size
    expect(
      screen.getByText(value).style.cssText.includes("font-size: 2rem")
    ).toBe(true);

    // Click span
    userEvent.click(screen.getByText(value));

    // Confirm text field has correct font size
    expect(
      screen.getByRole("textbox").style.cssText.includes("font-size: 2rem")
    ).toBe(true);
  });

  test("rendering with a default font size", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Text value={value} />);
    });

    // Confirm span has correct font size
    expect(
      screen.getByText(value).style.cssText.includes("font-size: 1rem")
    ).toBe(true);

    // Click span
    userEvent.click(screen.getByText(value));

    // Confirm text field has correct font size
    expect(
      screen.getByRole("textbox").style.cssText.includes("font-size: 1rem")
    ).toBe(true);
  });

  test("responding to tab", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Text value={value} />);
    });

    userEvent.tab();

    // Confirm that span has focus
    const span = screen.getByText(value);
    expect(document.activeElement).toEqual(span);

    // Confirm we are in rest state
    confirmRestState();

    // Press enter on focused element
    userEvent.type(span, "{enter}", { skipClick: true });

    // Confirm that we have left rest state
    confirmActiveState();
  });

  test("saving via help text", async () => {
    await act(async () => {
      render(<Text value={value} />);
    });

    // By default, should be in rest state
    confirmRestState();

    // Click span
    userEvent.click(screen.getByText(value));

    // When text clicked, exit rest state
    confirmActiveState();

    // Press `enter`
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: "enter" }));
    });

    // Confirm that we have returned to rest state
    confirmRestState();
  });

  test("cancelling via help text", async () => {
    await act(async () => {
      render(<Text value={value} />);
    });

    // By default, should be in rest state
    confirmRestState();

    // Click span
    userEvent.click(screen.getByText(value));

    // When text clicked, exit rest state
    confirmActiveState();

    // Press `enter`
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: "escape" }));
    });

    // Confirm that we have returned to rest state
    confirmRestState();
  });
});
