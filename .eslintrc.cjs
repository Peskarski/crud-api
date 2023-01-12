module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    // 'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
