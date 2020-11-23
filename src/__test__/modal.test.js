import { render, screen } from '@testing-library/react';
import ConfirmModal from '../components/modal.component'

test('renders navigation bar', () => {
  render(
    <ConfirmModal
      visible={true}
      title='Test Modal Title'
      text='Test Modal Text'
    ></ConfirmModal>
  );

  const titleText = screen.queryByText(/Test Modal Title/i);
  const bodyText = screen.queryByText(/Test Modal Text/i);

  expect(titleText).toBeInTheDocument();
  expect(bodyText).toBeInTheDocument();
});
