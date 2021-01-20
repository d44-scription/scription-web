import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mentionable from "../../components/editors/mentionable.component";
import http from "../../http-common";

describe("Show component", () => {
  const notebookId = 1;
  let value = "";
  const setValue = (e) => {
    value = e.target.value;
  };

  const fakeMentionables = [
    {
      name: "Item",
      id: 1,
    },
    {
      name: "Character",
      id: 2,
    },
    {
      name: "Location",
      id: 3,
    },
  ];

  beforeEach(async () => {
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: fakeMentionables,
      })
    );
  });

  test("Running action correctly on enter", () => {
    let submitTestVal = false;
    const onSubmit = () => {
      submitTestVal = true;
    };
  });

  test("Correctly rendering messages", () => {
    const successMessage = "Success";
    const errorMessage = "Error";
  });

  test("Rendering list of mentionables", () => {
    render(
      <Mentionable value={value} onChange={setValue} notebookId={notebookId} />
    );

    const inputField = screen.getByPlaceholderText("Click here to add a note");
  });
});
