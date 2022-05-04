import React from "react";
import { storiesOf } from "@storybook/react";
import Switch from "./Switch";

const stories = storiesOf("junaui/Switch", module);

stories.add("Switch", () => {
  return (
    <Switch onSwitch={(checked) => console.log(checked)}>
      <Switch.On>This is on</Switch.On>
      <Switch.Off>This is off</Switch.Off>
      <Switch.Toggle />
    </Switch>
  );
});
