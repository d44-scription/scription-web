import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders navigation bar", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.queryByText(/Scription/i);
  const notebooksLink = screen.getAllByText(/Notebooks/i)[0];

  expect(homeLink).toBeInTheDocument();
  expect(notebooksLink).toBeInTheDocument();
});
