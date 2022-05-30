import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";
import userEvent from "@testing-library/user-event";

describe("Switch component", () => {
  test("fires onChange handler when the button is toggled", () => {
    const mockHandler = jest.fn();
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
  test("does not fire on change handler if disabled", () => {
    const mockHandler = jest.fn();
    render(
      <Switch onSwitch={mockHandler} disabled>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const input = screen.getByRole("checkbox");
    userEvent.click(input);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
  test("adds disabled class when disabled", () => {
    render(
      <Switch onSwitch={jest.fn()} disabled>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const toggler = screen.getByLabelText("toggle switch");
    expect(toggler).toHaveClass("toggle__btn--disabled");
  });
  test("adds loading class when loading is true", () => {
    render(
      <Switch onSwitch={jest.fn()} loading>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const toggler = screen.getByLabelText("toggle switch");
    expect(toggler).toHaveClass("toggle__btn--loading");
  });
  test("adds on class when the checked property is false", () => {
    render(
      <Switch onSwitch={jest.fn()}>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const toggler = screen.getByLabelText("toggle switch");
    expect(toggler).toHaveClass("toggle__btn--off");
  });
  test("adds on class when the checked property is true", () => {
    render(
      <Switch onSwitch={jest.fn()} toggledOn>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    const toggler = screen.getByLabelText("toggle switch");
    expect(toggler).toHaveClass("toggle__btn--on");
  });
  test("fires onSwitch handler when component is initially rendered", () => {
    const mockHandler = jest.fn();
    render(
      <Switch onSwitch={mockHandler}>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
    expect(mockHandler).toHaveBeenCalled();
  });
});
