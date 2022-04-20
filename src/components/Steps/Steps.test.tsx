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
    render(
      <Steps current={0}>
        <Steps.Step
          title='First'
          subtitle='A step'
          description='The first step'
        />
        <Steps.Step title='Second' subtitle='A second' />
      </Steps>
    );
    const step = screen.getByText("The first step");
    expect(step).toBeInTheDocument();
  });
  test("current step has selected classes", () => {
    render(
      <Steps current={1}>
        <Steps.Step
          title='First'
          subtitle='A step'
          description='The first step'
        />
        <Steps.Step title='Second' subtitle='A second' />
      </Steps>
    );
    const step = screen.getByText("2");
    expect(step.classList.contains("circleSelected")).toBeTruthy();
  });
});
