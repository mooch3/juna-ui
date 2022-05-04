import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "./Select";

const stories = storiesOf("junaui/Select", module);
const mock = { name: "yis" };

stories
  .add("Basic Usage", () => {
    return (
      <Select
        placeholder='Select an item...'
        onChange={(value) => console.log(value)}
      >
        <Select.Option value={mock}>A thing</Select.Option>
        <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
        <Select.Option value={{ name: "breh" }}>
          Thing 2 that has a long name that is many characters
        </Select.Option>
      </Select>
    );
  })
  .add("Disabled Option", () => (
    <Select
      placeholder='Select an item...'
      onChange={(value) => console.log(value)}
    >
      <Select.Option value={mock} disabled>
        A thing
      </Select.Option>
      <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "breh" }}>
        Thing 2 that has a long name that is many characters
      </Select.Option>
    </Select>
  ))
  .add("Filter Options", () => (
    <Select
      placeholder='Select an item...'
      onChange={(value) => console.log(value)}
      filterOption
    >
      <Select.Option value={mock} disabled>
        A thing
      </Select.Option>
      <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "breh" }}>
        Thing 2 that has a long name that is many characters
      </Select.Option>
    </Select>
  ))
  .add("Allow Clear", () => (
    <Select placeholder='Select an item...' allowClear>
      <Select.Option value={mock} disabled>
        A thing
      </Select.Option>
      <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "breh" }}>
        Thing 2 that has a long name that is many characters
      </Select.Option>
    </Select>
  ))
  .add("Multi Select", () => (
    <Select
      placeholder='Select an item...'
      onChange={(value) => console.log(value)}
      multiSelect
      allowClear
    >
      <Select.Option value={mock} disabled>
        Perry
      </Select.Option>
      <Select.Option value={{ name: "bar" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "foo" }}>John</Select.Option>
      <Select.Option value={{ name: "baz" }}>Derek</Select.Option>
      <Select.Option value={{ name: "braz" }}>Ty</Select.Option>
      <Select.Option value={{ name: "tar" }}>Yimghe</Select.Option>
      <Select.Option value={{ name: "tar" }}>
        Juna Ann Marie Michele Zisette-Smith
      </Select.Option>
    </Select>
  ))
  .add("Default value", () => (
    <Select
      placeholder='Select an item...'
      onChange={(value) => console.log(value)}
      defaultValue={mock}
      allowClear
    >
      <Select.Option value={mock} disabled>
        Perry
      </Select.Option>
      <Select.Option value={{ name: "bar" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "foo" }}>John</Select.Option>
      <Select.Option value={{ name: "baz" }}>Derek</Select.Option>
      <Select.Option value={mock}>Ty</Select.Option>
      <Select.Option value={{ name: "tar" }}>Yimghe</Select.Option>
    </Select>
  ));
