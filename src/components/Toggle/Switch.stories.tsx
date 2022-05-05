import React from "react";
import { storiesOf } from "@storybook/react";
import Switch from "./Switch";

const stories = storiesOf("junaui/Switch", module);

stories
  .add("Basic Usage", () => {
    return (
      <Switch onSwitch={(checked) => console.log(checked)}>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
  })
  .add("Loading Off", () => (
    <Switch onSwitch={(checked) => console.log(checked)} loading>
      <Switch.OnText>This is on</Switch.OnText>
      <Switch.OffText>This is off</Switch.OffText>
      <Switch.Toggle />
    </Switch>
  ))
  .add("Loading On", () => (
    <Switch onSwitch={(checked) => console.log(checked)} loading toggledOn>
      <Switch.OnText>This is on</Switch.OnText>
      <Switch.OffText>This is off</Switch.OffText>
      <Switch.Toggle />
    </Switch>
  ))
  .add("Disabled Off", () => {
    return (
      <Switch onSwitch={(checked) => console.log(checked)} disabled>
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
  })
  .add("Disabled On", () => {
    return (
      <Switch
        onSwitch={(checked) => console.log(checked)}
        disabled
        toggledOn={true}
      >
        <Switch.OnText>This is on</Switch.OnText>
        <Switch.OffText>This is off</Switch.OffText>
        <Switch.Toggle />
      </Switch>
    );
  });
