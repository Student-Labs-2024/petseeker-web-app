module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-refresh',
    'sort-destructure-keys',
  ],
  extends: [
    'eslint:recommended', // Базовые правила ESLint
    'plugin:@typescript-eslint/recommended', // Рекомендованные правила для TypeScript
    'plugin:@typescript-eslint/eslint-recommended', // Адаптация правил ESLint для TypeScript
    'plugin:jsonc/recommended-with-jsonc', // Рекомендованные правила для JSON (JSONC, JSON5)
    'plugin:react/recommended', // Рекомендованные правила для React
    'plugin:react/jsx-runtime', // Правила для React JSX Runtime
    'plugin:react-hooks/recommended', // Рекомендованные правила для хуков React
  ],
  settings: {
    react: {
      version: 'detect' // Автоматически определяет версию React для правил
    }
  },
  rules: {
    // Basic ESLint
    semi: 'off', // Выключает правило требующее точки с запятой
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Custom rules
    'eol-last': ['error', 'always'], // Обязательная пустая строка в конце файла

  }
};
