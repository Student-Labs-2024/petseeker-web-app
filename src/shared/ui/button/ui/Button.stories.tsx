import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
import { useTheme } from "../../../../shared/hooks/useTheme";
import "@/app/ui/main.scss";
export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;
document.documentElement.setAttribute("data-theme", "dark");
export const Default = Template.bind({});
Default.args = {
  children: "Default Button",
  isDefault: true,
};

export const AuthButton = Template.bind({});
AuthButton.args = {
  children: "Auth Button",
  isAuthButton: true,
};

export const ActiveButton = Template.bind({});
ActiveButton.args = {
  children: "Active Button",
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: "Disabled Button",
  disabled: true,
};

export const ClickableButton = Template.bind({});
ClickableButton.args = {
  children: "Clickable Button",
  onClick: () => alert("Button clicked!"),
};
