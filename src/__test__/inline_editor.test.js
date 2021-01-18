import { render, screen } from "@testing-library/react";
import InlineEditor from "../components/inline_editor.component";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("Inline editor component", () => {
  let value = "Test Text";

  const setValue = (v) => {
    value = v;
  };

  describe("Confirming rest state transitions", () => {
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

    beforeEach(async () => {
      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(
          <InlineEditor
            value={value}
            setValue={setValue}
            action={onSubmitAction}
          />
        );
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

      // Return to rest state
      userEvent.type(span, "{esc}", { skipClick: true });
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

      // Custom active state checker required for this test :/

      // Confirm text span does not show
      expect(screen.queryByText(value)).toBeNull();

      // Confirm help text shows
      expect(screen.getByRole("button", { name: "enter" })).toBeVisible();
      expect(screen.getByRole("button", { name: "escape" })).toBeVisible();

      // Confirm input field shows
      expect(screen.getByRole("textbox")).toBeVisible();

      // Confirm saving svg does not show
      expect(screen.queryByTitle("Saving changes")).not.toBeVisible();

      // Return to rest state
      userEvent.type(span, "{esc}", { skipClick: true });
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

  describe("Correctly rendering errors", () => {
    const onSubmitAction = () => {
      return Promise.reject({
        response: {
          data: ["Error message"],
        },
      });
    };

    beforeEach(async () => {
      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(
          <InlineEditor
            value={value}
            setValue={setValue}
            action={onSubmitAction}
          />
        );
      });
    });

    test("rendering an error message", async () => {
      // Click span
      userEvent.click(screen.getByText(value));

      // Press `enter`
      await act(async () => {
        userEvent.type(screen.getByRole("textbox"), "{enter}");
      });

      expect(screen.getByText("Error message")).toBeVisible();
    });
  });

  describe("Carrying out onSubmitAction", () => {
    let testVal = false;

    const action = () => {
      return Promise.resolve({
        data: {
          id: 0,
        },
      });
    };

    const onSubmitAction = () => {
      testVal = true;
    };

    test("correctly running on enter", async () => {
      await act(async () => {
        render(
          <InlineEditor
            value={value}
            setValue={setValue}
            action={action}
            onSubmitAction={onSubmitAction}
          />
        );
      });

      // Sanity check
      expect(testVal).toBe(false);

      // Click span
      userEvent.click(screen.getByText(value));

      // Press `enter`
      await act(async () => {
        userEvent.type(screen.getByRole("textbox"), "{enter}");
      });

      // Confirm action runs
      expect(testVal).toBe(true);
    });
  });

  describe("Rendering with variable font sizes", () => {
    describe("When a text input", () => {
      test("with a given font size", async () => {
        let fontSize = "2rem";

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
          render(
            <InlineEditor value={value} fontSize={fontSize}></InlineEditor>
          );
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

      test("with a default font size", async () => {
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
    });

    describe("When a textarea input", () => {
      test("with a given font size", async () => {
        let fontSize = "2rem";

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
          render(
            <InlineEditor value={value} type="textarea" fontSize={fontSize} />
          );
        });

        // Confirm span has correct font size
        expect(
          screen
            .getByRole("complementary")
            .style.cssText.includes("font-size: 2rem")
        ).toBe(true);

        // Click span
        userEvent.click(screen.getByRole("switch"));

        // Confirm text field has correct font size
        expect(
          screen.getByRole("textbox").style.cssText.includes("font-size: 2rem")
        ).toBe(true);
      });

      test("with a default font size", async () => {
        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
          render(<InlineEditor value={value} type="textarea"></InlineEditor>);
        });

        // Confirm span has correct font size
        expect(
          screen
            .getByRole("complementary")
            .style.cssText.includes("font-size: 1rem")
        ).toBe(true);

        // Click span
        userEvent.click(screen.getByRole("switch"));

        // Confirm text field has correct font size
        expect(
          screen.getByRole("textbox").style.cssText.includes("font-size: 1rem")
        ).toBe(true);
      });
    });
  });
});
