import React from "react";
import { storiesOf } from "@storybook/react";
import Steps from "./Steps";

const stories = storiesOf("junaui/Steps", module);

stories.add("Steps", () => {
  return (
    <Steps current={1}>
      <Steps.Step title='First' />
      <Steps.Step title='Second' />
      <Steps.Step title='Third' />
    </Steps>
  );
});
