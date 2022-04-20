import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";
import userEvent from "@testing-library/user-event";
const mockHandler = jest.fn();
describe("Checkbox component", () => {
  test("fires onChange handler on click", () => {
    render(<Checkbox onChange={mockHandler} />);
    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(mockHandler).toHaveBeenCalled();
  });
  test("handles checked boolean passed in by props", () => {
    render(<Checkbox checked={true} onChange={mockHandler} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
  test("handles value passed by props", () => {
    render(<Checkbox value='2' />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("value");
  });
  test("handles defaultChecked props", () => {
    render(<Checkbox defaultChecked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
  test("has disabled prop", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("disabled");
  });
});
