import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";
import userEvent from "@testing-library/user-event";

const mockHandler = jest.fn();

describe("Switch component", () => {
  test("fires onChange handler when the button is toggled", () => {
    render(
      <Switch onSwitch={mockHandler}>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const input = screen.getByRole("checkbox");
    userEvent.click(input);
    expect(mockHandler).toHaveBeenCalled();
  });
  test("does not fire on change hanlder if disabled", () => {
    render(
      <Switch onSwitch={mockHandler} disabled>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const input = screen.getByRole("checkbox");
    userEvent.click(input);
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
