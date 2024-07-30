module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-refresh",
    "sort-destructure-keys",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  rules: {
    semi: "off", // Выключает правило требующее точки с запятой
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Custom rules
    "eol-last": ["error", "always"], // Обязательная пустая строка в конце файла
  },
};
