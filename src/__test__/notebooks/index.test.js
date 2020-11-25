import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import http from "../../http-common";
import Index from "../../components/notebooks/index.component";

jest.mock('http');

test('renders component', () => {
  const getSpy = jest.spyOn(http, 'get')
  let resp = {
    0: {
      id: 1,
      name: 'Mocked Notebook 1',
      summary: 'Mocked notebook summary',
      order_index: 0
    },
    1: {
      id: 2,
      name: 'Mocked Notebook 2',
      summary: 'Mocked notebook summary',
      order_index: 1
    }
  }

    http.get.mockResolvedValue(resp)

    render(
      <Index
      ></Index>
    )

  waitFor(() => {
    console.log(screen.debug())
    expect(getSpy).toHaveBeenCalledWith('/notebooks.json');
  });

  expect(screen.getByText('Mocked Notebook 1')).toBeInTheDocument();
  expect(screen.getByAltText('Delete Mocked Notebook 1')).toBeInTheDocument();

  expect(screen.getByText('Mocked Notebook 2')).toBeInTheDocument();
  expect(screen.getByAltText('Delete Mocked Notebook gyvbhjnkhbgvyuhi2')).toBeInTheDocument();

  userEvent.click($('.list-group-item')[0])
});
