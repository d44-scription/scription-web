import { render, screen } from "@testing-library/react";
import ConfirmModal from "../components/modal.component";
import userEvent from "@testing-library/user-event";

test("shows and hides modal when prop changes", () => {
  const { rerender } = render(<ConfirmModal visible={false}></ConfirmModal>);

  expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();

  rerender(<ConfirmModal visible={true}></ConfirmModal>);

  expect(screen.getByText('Are you sure?')).toBeInTheDocument();
});

test("renders custom modal text", () => {
  render(
    <ConfirmModal
      visible={true}
      title="Test Modal Title"
      text="Test Modal Text"
    ></ConfirmModal>
  );

  expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
  expect(screen.getByText('Test Modal Text')).toBeInTheDocument();
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
