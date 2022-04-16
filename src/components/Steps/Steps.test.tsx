import React from "react";
import { render, screen } from "@testing-library/react";
import Steps from "./Steps";
import "@testing-library/jest-dom";

describe("Steps", () => {
  test("renders Steps component", () => {
    render(
      <Steps current={0}>
        <Steps.Step title='First' />
      </Steps>
    );
  });
  test("has a step that says 'First'", () => {
    render(
      <Steps current={0}>
        <Steps.Step title='First' />
      </Steps>
    );
    const step = screen.getByText("First");
    expect(step).toBeInTheDocument();
  });
  test("has a step that says 'Second'", () => {
    <Steps current={0}>
      <Steps.Step title='First' subtitle='A step' />
      <Steps.Step title='Second' subtitle='A second' />
    </Steps>;
  });
});
