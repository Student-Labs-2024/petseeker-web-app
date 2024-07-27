import type { StorybookConfig } from "@storybook/react-vite";
import path from 'path';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/preset-scss", 
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {

    return {
      ...config,
      css: {
        ...config.css,
        preprocessorOptions: {
          scss: {
            additionalData: `@import "../src/app/ui/variables.scss";`, 
          },
        },
      },

    };
  },
};

export default config;
