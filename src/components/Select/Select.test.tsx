import React from "react";
import { render, screen } from "@testing-library/react";
import Select from "./Select";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockChange = jest.fn();
const mockValue = "testing 123";
const initialValue = { name: "breh" };

describe("Select component", () => {
  test("adds the display node as the selected item when a dd item is selected", async () => {
    render(
      <Select placeholder='Select an item...'>
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select Thing 2");
    userEvent.click(item);
    const displayedItem = await screen.findAllByText("Thing 2");
    expect(displayedItem).toHaveLength(2);
  });
  test("does not allow you to select disabled items", async () => {
    render(
      <Select placeholder='Select an item...'>
        <Select.Option value={{ name: "yis" }} disabled>
          A thing
        </Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    userEvent.click(item);
    const placeholder = await screen.findByText("Select an item...");
    expect(placeholder).toBeInTheDocument();
  });
  test("applies disabled class when an item has the disabled prop", async () => {
    render(
      <Select placeholder='Select an item...'>
        <Select.Option value={{ name: "yis" }} disabled>
          A thing
        </Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    expect(item.classList.contains("jui__item--disabled")).toBeTruthy();
  });
  test("calls on change function when an item is selected", async () => {
    render(
      <Select placeholder='Select an item...' onChange={mockChange}>
        <Select.Option value={mockValue}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    userEvent.click(item);
    expect(mockChange).toHaveBeenCalledWith(mockValue);
  });
  test("applies selected class when a drop down item is clicked", async () => {
    render(
      <Select placeholder='Select an item...' onChange={mockChange}>
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    userEvent.click(item);
    expect(item.classList.contains("jui__item--selected")).toBeTruthy();
  });
  test("allows user to filter options when filter option is applied", async () => {
    render(
      <Select
        placeholder='Select an item...'
        filterOption
        onChange={mockChange}
      >
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const input = screen.getByLabelText("filter options");
    userEvent.type(input, "afsafs");
    userEvent.click(input);
    const item = screen.queryByLabelText("Select A thing");
    expect(item).not.toBeInTheDocument();
  });
  test("users can remove selected option with allow clear", async () => {
    render(
      <Select placeholder='Select an item...' allowClear onChange={mockChange}>
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    userEvent.click(item);
    const selected = screen.queryByLabelText("Selected option");
    const remove = await screen.findByLabelText("Remove option");
    expect(selected).toBeInTheDocument();
    userEvent.click(remove);
    expect(selected).not.toBeInTheDocument();
  });
  test("allows users to have multi select", async () => {
    render(
      <Select
        placeholder='Select an item...'
        multiSelect
        allowClear
        onChange={mockChange}
      >
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={initialValue}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const button = screen.getByLabelText("Open drop down");
    userEvent.click(button);
    const item = await screen.findByLabelText("Select A thing");
    userEvent.click(item);
    const itemTwo = await screen.findByLabelText("Select Thing 2");
    userEvent.click(itemTwo);
    const allItems = await screen.findAllByLabelText("Selected options");
    expect(allItems).toHaveLength(2);
  });
  test("allows a defaultValue to be set", async () => {
    render(
      <Select
        placeholder='Select an item...'
        defaultValue={initialValue}
        allowClear
        onChange={mockChange}
      >
        <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
        <Select.Option value={initialValue}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
    const defaultValue = await screen.findByText("Thing 2");
    expect(defaultValue).toBeInTheDocument();
  });
});
