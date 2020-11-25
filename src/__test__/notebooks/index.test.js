import { render, screen } from '@testing-library/react';
import Index from '../../components/notebooks/index.component';
import { act } from "react-dom/test-utils";
import http from "../../http-common";

it('renders list of notebooks', async () => {
  const fakeNotebook = [
    {
      name: "Notebook 1",
      id: 1
    },
    {
      name: "Notebook 2",
      id: 2
    },
  ];

  jest.spyOn(http, "get").mockImplementation(() => Promise.resolve({
    data: fakeNotebook
  }));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Index />);
  });

  expect(screen.getByText('Notebook 1')).toBeInTheDocument();
  expect(screen.getByTitle('Delete Notebook 1')).toBeInTheDocument();

  expect(screen.getByText('Notebook 2')).toBeInTheDocument();
  expect(screen.getByTitle('Delete Notebook 2')).toBeInTheDocument();

  http.get.mockRestore();
});
