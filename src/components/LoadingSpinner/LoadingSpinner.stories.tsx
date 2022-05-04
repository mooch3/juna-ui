import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoadingSpinner from "./LoadingSpinner";

export default {
  title: "JunaUI/LoadingSpinner",
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args} />
);

export const LoaderLg = Template.bind({});

LoaderLg.args = {
  large: true,
};

export const Loader = Template.bind({});
Loader.args = {
  large: false,
};
