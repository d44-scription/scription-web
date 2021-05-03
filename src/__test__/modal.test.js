import { render, screen } from "@testing-library/react";
import ConfirmModal from "components/confirm-modal.component";
import userEvent from "@testing-library/user-event";

describe("Modal component", () => {
  const closeAction = () => {};
  const confirmAction = () => {};
  const title = "Title";
  const text = "Text";

  test("changing visibility status", () => {
    const { rerender } = render(
      <ConfirmModal
        visible={false}
        closeAction={closeAction}
        confirmAction={confirmAction}
        title={title}
        text={text}
      />
    );

    expect(screen.queryByText(title)).toBeNull();
    expect(screen.queryByText(text)).toBeNull();

    rerender(
      <ConfirmModal
        visible={true}
        closeAction={closeAction}
        confirmAction={confirmAction}
        title={title}
        text={text}
      />
    );

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText(text)).toBeVisible();
  });

  test("renders custom modal text", () => {
    render(
      <ConfirmModal
        visible={true}
        title="Test Modal Title"
        text="Test Modal Text"
        closeAction={closeAction}
        confirmAction={confirmAction}
      />
    );

    expect(screen.getByText("Test Modal Title")).toBeVisible();
    expect(screen.getByText("Test Modal Text")).toBeVisible();
  });

  test("running prop on close", () => {
    let testVal = false;

    render(
      <ConfirmModal
        visible={true}
        closeAction={() => (testVal = true)}
        confirmAction={confirmAction}
        title={title}
        text={text}
      />
    );

    // Sanity check
    expect(testVal).toBeFalsy();

    userEvent.click(screen.getByText("Cancel"));

    expect(testVal).toBeTruthy();
  });

  test("running prop on confirm", () => {
    let testVal = false;

    render(
      <ConfirmModal
        visible={true}
        confirmAction={() => (testVal = true)}
        closeAction={closeAction}
        title={title}
        text={text}
      />
    );

    // Sanity check
    expect(testVal).toBeFalsy();

    userEvent.click(screen.getByText("OK"));

    expect(testVal).toBeTruthy();
  });
});
