import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button>Hello</Button>);
  });

  test("has the danger class", () => {
    render(<Button danger>Danger</Button>);
    const button = screen.getByRole("button", { name: /danger/i });
    expect(button.classList.contains("danger")).toBeTruthy();
  });

  test("has pretty class", () => {
    render(<Button>Pretty</Button>);
    const button = screen.getByRole("button", { name: /pretty/i });
    expect(button.classList.contains("pretty")).toBeTruthy();
  });

  test("can handle custom styles", () => {
    render(<Button customStyles={{ fontSize: 13 }}>Style</Button>);
    const button = screen.getByRole("button", { name: /style/i });
    expect(button).toHaveStyle("font-size: 13px");
  });

  test("can be disabled", () => {
    render(<Button disabled>Pretty</Button>);
    const button = screen.getByRole("button", { name: /pretty/i });
    expect(button).toHaveAttribute("disabled");
  });

  test("can be hidden", () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} hidden>
        Pretty
      </Button>
    );
    const button = screen.getByRole("button", { name: /pretty/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
