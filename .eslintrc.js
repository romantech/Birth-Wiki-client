module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/jsx-uses-vars': 'error',
  },
  ignorePatterns: ['*.config.js'],
};
