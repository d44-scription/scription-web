import { render, screen } from "@testing-library/react";
import New from "../../components/notebooks/new.component";
import { act } from "react-dom/test-utils";
import http from "../../http-common";
import userEvent from "@testing-library/user-event";

describe("New component", () => {
  let setNewRecordTestValue = false;
  let retrieveNotebooksTestValue = false;

  const successfulResponse = {
    code: 200,
  };

  beforeEach(() => {
    jest.spyOn(http, "post").mockImplementation(() =>
      Promise.resolve({
        data: successfulResponse,
      })
    );
  });

  afterEach(() => {
    http.post.mockRestore();
  });

  const confirmRestState = () => {
    // Confirm default button is not shown
    expect(screen.getByText("Enter Name")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  };

  test("rendering correct fields", async () => {
    await act(async () => {
      render(
        <New
          setNewRecord={() => {
            setNewRecordTestValue = true;
          }}
          retrieveNotebooks={() => {
            retrieveNotebooksTestValue = true;
          }}
        />
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Sanity check
    expect(setNewRecordTestValue).toBe(false);
    expect(retrieveNotebooksTestValue).toBe(false);

    // "Create" a new notebook
    userEvent.click(screen.getByText("Enter Name"));
    userEvent.type(screen.getByRole("textbox"), "Notebook");

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm `postCreateActions` are run correctly
    expect(setNewRecordTestValue).toBe(true);
    expect(retrieveNotebooksTestValue).toBe(true);

    expect(http.post).toBeCalledWith("/notebooks.json", {
      notebook: { name: "Notebook" },
    });
  });
});
