module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      rules: {
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
      },
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
    },
    {
      files: ["src/**/models/**/*.ts"],
      rules: { "@typescript-eslint/naming-convention": "off" },
    },
    {
      files: ["src/**/mocks/**/*.ts"],
      rules: { "@typescript-eslint/consistent-type-assertions": "off" },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
    "no-implicit-coercion": "off",
  },
};
