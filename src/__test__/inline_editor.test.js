import { render, screen } from "@testing-library/react";
import InlineEditor from "../components/inline_editor.component";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("Text component", () => {
  let value = "Test Text";
  const setValue = (v) => {
    value = v;
  };
  const onSubmitAction = () => {
    return Promise.resolve();
  };

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

  test("rendering with a given font size", async () => {
    let fontSize = "2rem";

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<InlineEditor value={value} fontSize={fontSize}></InlineEditor>);
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
      render(<InlineEditor value={value}></InlineEditor>);
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

  describe("When a text input", () => {
    beforeEach(async () => {
      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(<InlineEditor value={value} action={onSubmitAction} />);
      });
    });

    test("entering and leaving rest state", async () => {
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

    test("responding to tab using enter", async () => {
      userEvent.tab();

      // Confirm that span has focus
      const span = screen.getByText(value);
      expect(span).toHaveFocus();

      // Confirm we are in rest state
      confirmRestState();

      // Press enter on focused element
      userEvent.type(span, "{enter}", { skipClick: true });

      // Confirm that we have left rest state
      confirmActiveState();
    });

    test("responding to tab using space", async () => {
      userEvent.tab();

      // Confirm that span has focus
      const span = screen.getByText(value);
      expect(span).toHaveFocus();

      // Confirm we are in rest state
      confirmRestState();

      // Press space on focused element
      userEvent.type(span, "{space}", { skipClick: true });

      // Confirm that we have left rest state
      confirmActiveState();
    });

    test("saving via help text", async () => {
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

  describe("When a textarea input", () => {
    const confirmAreaRestState = () => {
      // Text span should be visible
      expect(screen.getByRole("switch")).toBeVisible();

      // Confirm help text does not show
      expect(screen.queryByRole("button", { name: "enter" })).toBeNull();
      expect(screen.queryByRole("button", { name: "escape" })).toBeNull();

      // Input field should not be visible
      expect(screen.queryByRole("textbox")).toBeNull();

      // Loading icon should not be visible
      expect(screen.getByTitle("Saving changes")).not.toBeVisible();
    };

    const confirmAreaActiveState = () => {
      // Confirm text span is hidden
      expect(screen.queryByRole("switch")).toBeNull();

      // Confirm help text shows
      expect(screen.getByRole("button", { name: "enter" })).toBeVisible();
      expect(screen.getByRole("button", { name: "escape" })).toBeVisible();

      // Confirm text input is shown
      expect(screen.getByRole("textbox")).toBeVisible();

      // Confirm loading gif is hidden
      expect(screen.queryByTitle("Saving changes")).not.toBeVisible();
    };

    beforeEach(async () => {
      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(
          <InlineEditor
            value={value}
            action={onSubmitAction}
            type="textarea"
            setValue={setValue}
          />
        );
      });
    });

    test("entering and leaving rest state", async () => {
      // By default, should be in rest state
      confirmAreaRestState();

      // Click span
      userEvent.click(screen.getByRole("switch"));

      // Clicking text should leave rest state
      confirmAreaActiveState();

      // Press shift + enter
      await act(async () => {
        userEvent.type(screen.getByRole("textbox"), "{shift}{enter}{/shift}");
      });

      // Confirm that we are still not at rest
      confirmAreaActiveState();

      // Press `enter`
      await act(async () => {
        userEvent.type(screen.getByRole("textbox"), "{enter}");
      });

      // Confirm that we have returned to rest state
      confirmAreaRestState();

      // Click span, press escape
      userEvent.click(screen.getByRole("switch"));

      await act(async () => {
        userEvent.type(screen.getByRole("textbox"), "{esc}");
      });

      // Confirm that we have returned to rest state
      confirmAreaRestState();
    });

    test("responding to tab using enter", async () => {
      userEvent.tab();

      // Confirm that span has focus
      const span = screen.getByRole("switch");
      expect(span).toHaveFocus();

      // Confirm we are still in rest state
      confirmAreaRestState();

      userEvent.type(span, "{enter}", { skipClick: true });

      // Confirm that we have left rest state
      confirmAreaActiveState();
    });

    test("responding to tab using space", async () => {
      userEvent.tab();

      // Confirm that span has focus
      const span = screen.getByRole("switch");
      expect(span).toHaveFocus();

      // Confirm we are still in rest state
      confirmAreaRestState();

      userEvent.type(span, "{space}", { skipClick: true });

      // Confirm that we have left rest state
      confirmAreaActiveState();
    });

    test("saving via help text", async () => {
      // By default, should be in rest state
      confirmAreaRestState();

      // Click span
      userEvent.click(screen.getByRole("switch"));

      // When text clicked, exit rest state
      confirmAreaActiveState();

      // Press `enter`
      await act(async () => {
        userEvent.click(screen.getByRole("button", { name: "enter" }));
      });

      // Confirm that we have returned to rest state
      confirmAreaRestState();
    });

    test("cancelling via help text", async () => {
      // By default, should be in rest state
      confirmAreaRestState();

      // Click span
      userEvent.click(screen.getByRole("switch"));

      // When text clicked, exit rest state
      confirmAreaActiveState();

      // Press `enter`
      await act(async () => {
        userEvent.click(screen.getByRole("button", { name: "escape" }));
      });

      // Confirm that we have returned to rest state
      confirmAreaRestState();
    });
  });
});
