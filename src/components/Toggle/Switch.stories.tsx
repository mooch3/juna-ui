import React from "react";
import { storiesOf } from "@storybook/react";
import Switch from "./Switch";

const stories = storiesOf("junaui/Switch", module);

stories.add("Switch", () => {
  return (
    <Switch onSwitch={(checked) => console.log(checked)} loading>
      <Switch.OnText>This is on</Switch.OnText>
      <Switch.OffText>This is off</Switch.OffText>
      <Switch.Toggle />
    </Switch>
  );
});
