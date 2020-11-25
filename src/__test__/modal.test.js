import { render, screen } from "@testing-library/react";
import ConfirmModal from "../components/modal.component";
import userEvent from "@testing-library/user-event";

test("shows and hides modal when prop changes", () => {
  const { rerender } = render(<ConfirmModal visible={false}></ConfirmModal>);

  let titleText = screen.queryByText(/Are you sure\?/i);
  expect(titleText).not.toBeInTheDocument();

  rerender(<ConfirmModal visible={true}></ConfirmModal>);

  titleText = screen.queryByText(/Are you sure\?/i);
  expect(titleText).toBeInTheDocument();
});

test("renders custom modal text", () => {
  render(
    <ConfirmModal
      visible={true}
      title="Test Modal Title"
      text="Test Modal Text"
    ></ConfirmModal>
  );

  const titleText = screen.queryByText(/Test Modal Title/i);
  const bodyText = screen.queryByText(/Test Modal Text/i);

  expect(titleText).toBeInTheDocument();
  expect(bodyText).toBeInTheDocument();
});

test("successfully runs prop on close", () => {
  let testVal = false;

  render(
    <ConfirmModal
      visible={true}
      closeAction={() => (testVal = true)}
    ></ConfirmModal>
  );

  // Sanity check
  expect(testVal).toBeFalsy();

  userEvent.click(screen.getByText("Cancel"));

  expect(testVal).toBeTruthy();
});

test("successfully runs prop on confirm", () => {
  let testVal = false;

  render(
    <ConfirmModal
      visible={true}
      confirmAction={() => (testVal = true)}
    ></ConfirmModal>
  );

  // Sanity check
  expect(testVal).toBeFalsy();

  userEvent.click(screen.getByText("OK"));

  expect(testVal).toBeTruthy();
});
