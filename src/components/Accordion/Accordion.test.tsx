import React from "react";
import { render, screen } from "@testing-library/react";
import Accordion from "./Accordion";
import "@testing-library/jest-dom";
import { FaCaretDown } from "react-icons/fa";
import userEvent from "@testing-library/user-event";

describe("Accordion", () => {
  test("renders a  button to expand the content", () => {
    render(
      <Accordion>
        <Accordion.Summary expandIcon={<FaCaretDown />}>
          Summary 1
        </Accordion.Summary>
        <Accordion.Content>Summary 1's content</Accordion.Content>
      </Accordion>
    );
    const button = screen.getByRole("button", { name: /summary 1/i });
    expect(button).toBeInTheDocument();
  });
  test("adds disabled class to button", () => {
    render(
      <Accordion disabled>
        <Accordion.Summary expandIcon={<FaCaretDown />}>
          Summary 1
        </Accordion.Summary>
        <Accordion.Content>Summary 1's content</Accordion.Content>
      </Accordion>
    );
    const button = screen.getByRole("button", { name: /summary 1/i });
    expect(button).toHaveClass("disabled");
  });
  test("adds expanded class to expandIcon when open", () => {
    render(
      <Accordion>
        <Accordion.Summary expandIcon={<FaCaretDown />}>
          Summary 1
        </Accordion.Summary>
        <Accordion.Content>Summary 1's content</Accordion.Content>
      </Accordion>
    );
    const button = screen.getByRole("button", { name: /summary 1/i });
    userEvent.click(button);
    const expandIcon = screen.getByLabelText("expand accordion");
    expect(expandIcon).toHaveClass("expanded");
  });
});
