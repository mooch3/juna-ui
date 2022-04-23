import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "./Select";

const stories = storiesOf("junaui/Select", module);

stories.add("Select", () => {
  return (
    <Select placeholder='Select an item...' allowClear>
      <Select.Option value={{ name: "yis" }}>A thing</Select.Option>
      <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
    </Select>
  );
});
