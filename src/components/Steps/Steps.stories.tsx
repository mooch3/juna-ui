import React from "react";
import { storiesOf } from "@storybook/react";
import Steps from "./Steps";

const stories = storiesOf("junaui/Steps", module);

stories.add("Steps", () => {
  return (
    <Steps current={2}>
      <Steps.Step
        title='First'
        description='A first step to complete'
        subtitle='first step'
      />
      <Steps.Step title='Second' />
      <Steps.Step title='Third' />
    </Steps>
  );
});
