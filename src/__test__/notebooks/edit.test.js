import { render, screen } from "@testing-library/react";
import Edit from "components/notebooks/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const successMessage = "Success message";
  const id = 1;

  const fakeNotebook = {
    name: "Notebook 1",
    id: id,
    summary: "Mock summary",
  };

  const successfulResponse = {
    code: 200,
    success_message: successMessage,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotebook,
      })
    );

    jest.spyOn(http, "put").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    jest.spyOn(http, "delete").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Edit id="1" retrieveNotebooks={() => {}} />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notable", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Notebook 1")).toBeVisible();
    expect(screen.getAllByText("Mock summary")[0]).toBeVisible();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Notebook"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete Notebook?")).toBeVisible();

    expect(
      screen.getByText(
        "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Cancel delete
    await act(async () => {
      userEvent.click(screen.getByText("Cancel"));
    });

    expect(http.delete).not.toHaveBeenCalled();

    // FIXME: Broken section of test commented below.
    // Confirm modal is hidden
    // expect(screen.queryByText("Delete Notebook?")).toBeNull();

    // expect(
    //   screen.queryByText(
    //     "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
    //   )
    // ).toBeNull();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Notebook"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete Notebook?")).toBeVisible();

    expect(
      screen.getByText(
        "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Confirm delete
    await act(async () => {
      userEvent.click(screen.getByText("OK"));
    });

    expect(http.delete).toHaveBeenCalledWith(`/notebooks/${id}`);

    // FIXME: Broken section of test commented below.
    // Confirm modal is hidden
    // expect(screen.queryByText("Delete Notebook?")).toBeNull();

    // expect(
    //   screen.queryByText(
    //     "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
    //   )
    // ).toBeNull();
  });

  test("responding to tab", () => {
    const deleteButton = screen.getByText("Delete Notebook");

    // Confirm that delete button gains focus from tab
    userEvent.tab({ shift: true });
    expect(deleteButton).toHaveFocus();

    // Press space to trigger button
    userEvent.type(deleteButton, "{space}");

    // Confirm modal is shown
    expect(screen.getByText("Delete Notebook?")).toBeVisible();

    expect(
      screen.getByText(
        "This will delete Notebook 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeVisible();
  });

  describe("Rendering success messages correctly", () => {
    test("when editing title", async () => {
      const textField = screen.getByText("Notebook 1");

      // Submit message
      await act(async () => {
        userEvent.click(textField);
        userEvent.click(screen.getAllByText("enter")[0]);
      });

      expect(http.put).toHaveBeenCalledWith(`/notebooks/${id}`, {
        notebook: { name: "Notebook 1" },
      });

      // Confirm success message shows
      expect(
        screen.getByText("Successfully saved.")
      ).toBeVisible();
    });

    test("when editing summary", async () => {
      const textField = screen.getAllByText("Mock summary")[1];

      // Submit message
      await act(async () => {
        userEvent.click(textField);
        userEvent.click(screen.getAllByText("enter")[1]);
      });

      expect(http.put).toHaveBeenCalledWith(`/notebooks/${id}`, {
        notebook: { summary: "Mock summary" },
      });

      // Confirm success message shows
      expect(
        screen.getByText("Successfully saved.")
      ).toBeVisible();
    });
  });
});
