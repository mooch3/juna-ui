import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";
import "@testing-library/jest-dom";

describe("Loading Spinner", () => {
  test("can be large", () => {
    render(<LoadingSpinner large />);
    const loader = screen.getByRole("alert");
    expect(loader.classList.contains("lds__ring--large")).toBeTruthy();
  });
  test("can be small", () => {
    render(<LoadingSpinner />);
    const loader = screen.getByRole("alert");
    expect(loader.classList.contains("lds__ring--small")).toBeTruthy();
  });
});
