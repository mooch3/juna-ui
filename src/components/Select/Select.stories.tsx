import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "./Select";

const stories = storiesOf("junaui/Select", module);

stories.add("Select", () => {
  return (
    <Select placeholder='Select an item...' allowClear filterOption>
      <Select.Option value={{ name: "yis" }} disabled>
        A thing
      </Select.Option>
      <Select.Option value={{ name: "breh" }}>Thing 2</Select.Option>
      <Select.Option value={{ name: "breh" }}>
        Thing 2 that has a long name that is many characters
      </Select.Option>
    </Select>
  );
});
