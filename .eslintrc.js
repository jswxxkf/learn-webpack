module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ["vue", "react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "no-unused-vars": 0,
    "no-console": 0,
    "import/no-extraneous-dependencies": "off",
    "import/newline-after-import": "off",
    "linebreak-style": "off",
    "import/extensions": "off",
  },
};
