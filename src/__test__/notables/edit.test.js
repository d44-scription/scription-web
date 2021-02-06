import { render, screen } from "@testing-library/react";
import Edit from "../../components/notables/edit.component";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("Edit component", () => {
  const successMessage = "Test message";

  const notebookId = 1;
  const notableId = 2;

  const fakeNotable = {
    name: "Character 1",
    id: 1,
    description: "Mock description referencing @[Wheaty](@1)",
  };

  const successfulResponse = {
    code: 200,
    success_message: successMessage,
  };

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeNotable,
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
          <Edit
            notebookId={notebookId}
            id={notableId}
            type="characters"
            retrieveNotables={() => {}}
          />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    http.get.mockRestore();
  });

  test("rendering information for a given notable", async () => {
    // Confirm data is retrieved and displayed correctly
    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(
      screen.getByText("Mock description referencing Wheaty")
    ).toBeInTheDocument();

    expect(screen.getByText("View Character")).toBeInTheDocument();
    expect(screen.getByText("Delete Character")).toBeInTheDocument();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Character"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete Character?")).toBeVisible();

    expect(
      screen.getByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Cancel delete
    await act(async () => {
      userEvent.click(screen.getByText("Cancel"));
    });

    expect(http.delete).not.toHaveBeenCalled();

    // Confirm modal is hidden
    expect(screen.queryByText("Delete Character?")).toBeNull();

    expect(
      screen.queryByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeNull();

    // Click delete button
    await act(async () => {
      userEvent.click(screen.getByText("Delete Character"));
    });

    // Confirm modal is shown
    expect(screen.getByText("Delete Character?")).toBeVisible();

    expect(
      screen.getByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeVisible();

    // Confirm delete
    await act(async () => {
      userEvent.click(screen.getByText("OK"));
    });

    expect(http.delete).toHaveBeenCalledWith(
      `/notebooks/${notebookId}/notables/${notableId}.json`
    );

    // Confirm modal is hidden
    expect(screen.queryByText("Delete Character?")).toBeNull();

    expect(
      screen.queryByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeNull();
  });

  test("responding to tab", () => {
    const deleteButton = screen.getByText("Delete Character");

    // Confirm that delete button gains focus from tab
    userEvent.tab({ shift: true });
    expect(deleteButton).toHaveFocus();

    // Press space to trigger button
    userEvent.type(deleteButton, "{space}");

    // Confirm modal is shown
    expect(screen.getByText("Delete Character?")).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will delete Character 1 and all associated notes. Are you sure you wish to continue?"
      )
    ).toBeInTheDocument();
  });

  describe("Rendering success messages correctly", () => {
    test("when editing title", async () => {
      const textField = screen.getByText("Character 1");

      // Submit message
      await act(async () => {
        userEvent.click(textField);
        userEvent.click(screen.getAllByText("enter")[0]);
      });

      expect(http.put).toHaveBeenCalledWith(
        `/notebooks/${notebookId}/notables/${notableId}.json`,
        {
          notable: { name: "Character 1" },
        }
      );

      // Confirm success message shows
      expect(
        screen.getByText("Changes have been saved successfully")
      ).toBeVisible();
    });

    test("when editing description", async () => {
      const textField = screen.getByText("Mock description referencing Wheaty");

      // Submit message
      await act(async () => {
        userEvent.click(textField);
        userEvent.click(screen.getAllByText("enter")[1]);
      });

      expect(http.put).toHaveBeenCalledWith(
        `/notebooks/${notebookId}/notables/${notableId}.json`,
        {
          notable: {
            description: "Mock description referencing @[Wheaty](@1)",
          },
        }
      );

      // Confirm success message shows
      expect(
        screen.getByText(`Successfully saved. ${successMessage}`)
      ).toBeVisible();
    });
  });
});
