// value, id, model, param, fontsize
import { render, screen } from '@testing-library/react';
import Text from '../../components/inline-editors/text.component';
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from '@testing-library/user-event';

it('correctly enters and leaves busy state', async () => {
  let value = 'Test Text'
  const successfulResponse = {
    code: 200
  }

  jest.spyOn(http, "put").mockImplementation(() => Promise.resolve({
    data: successfulResponse
  }));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Text value={value}/>);
  });

  // Confirm that, at rest state, text is visible, text box & spinner are hidden
  expect(screen.getByText(value)).toBeVisible();
  expect(screen.queryByRole('textbox')).toBeNull();
  expect(screen.getByTitle('Saving changes')).not.toBeVisible();

  // Click span
  userEvent.click(screen.getByText(value));

  // Confirm that when not at rest state, text box is visible, text & spinner are hidden
  expect(screen.queryByText(value)).not.toBeVisible();
  expect(screen.getByRole('textbox')).toBeVisible()
  expect(screen.queryByTitle('Saving changes')).not.toBeVisible();

  // Press `enter`
  await act(async () => {
    userEvent.type(screen.getByRole("textbox"), "{enter}");
  })

  // Confirm that we have returned to rest state
  expect(screen.getByText(value)).toBeVisible();
  expect(screen.queryByRole('textbox')).toBeNull();
  expect(screen.getByTitle('Saving changes')).not.toBeVisible();

  // Click span, press escape
  userEvent.click(screen.getByText(value));

  await act(async () => {
    userEvent.type(screen.getByRole("textbox"), "{esc}");
  })

  // Confirm that we have returned to rest state
  expect(screen.getByText(value)).toBeVisible();
  expect(screen.queryByRole('textbox')).toBeNull();
  expect(screen.getByTitle('Saving changes')).not.toBeVisible();
});

it('renders errors', async () => {
})

it('renders with a given font size', async () => {
});
