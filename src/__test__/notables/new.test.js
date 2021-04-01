import { render, screen } from "@testing-library/react";
import New from "components/notables/new.component";
import { act } from "react-dom/test-utils";
import http from "http-common";
import userEvent from "@testing-library/user-event";

describe("New component", () => {
  let setNewRecordTestValue = false;
  let retrieveNotablesTestValue = false;

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
    expect(screen.getByText("Name Character")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  };

  test("rendering correct fields", async () => {
    await act(async () => {
      render(
        <New
          type="characters"
          notebookId="1"
          setNewRecord={() => {
            setNewRecordTestValue = true;
          }}
          retrieveNotables={() => {
            retrieveNotablesTestValue = true;
          }}
        />
      );
    });

    // Confirm we start at rest state
    confirmRestState();

    // Sanity check
    expect(setNewRecordTestValue).toBe(false);
    expect(retrieveNotablesTestValue).toBe(false);

    // "Create" a new notable
    userEvent.click(screen.getByText("Name Character"));
    userEvent.type(screen.getByRole("textbox"), "Notable");

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "{enter}");
    });

    // Confirm `postCreateActions` are run correctly
    expect(setNewRecordTestValue).toBe(true);
    expect(retrieveNotablesTestValue).toBe(true);

    expect(http.post).toBeCalledWith("/notebooks/1/notables", {
      notable: { name: "Notable", type: "Character" },
    });
  });
});
