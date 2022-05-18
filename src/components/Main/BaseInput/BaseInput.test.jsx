import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BaseInput } from "./BaseInput";

const onChangeInput = jest.fn();

describe("BaseInput component", () => {
  test("BaseInput renders", () => {
    render(<BaseInput value="" onChange={onChangeInput} />);

    expect(screen.getAllByRole("textbox")).toBeInTheDocument;
  });

  test("onChange works", () => {
    render(<BaseInput value="" onChange={onChangeInput} />);

    userEvent.type(screen.getByRole("textbox"), "aaa");

    expect(onChangeInput).toHaveBeenCalledTimes(5);
  });
});
