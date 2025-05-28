import eslintPlugin from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import drizzle from "eslint-plugin-drizzle";

const drizzle_config = [
  {
    plugins: {
      drizzle,
    },
    rules: {
      ...drizzle.configs.recommended.rules,
    },
  },
];

const tsconf = tseslint.config({
  name: "custom/tsling/custom",
  files: ["**/*.ts", "**/*.tsx"],
  extends: [eslintPlugin.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      warnOnUnsupportedTypeScriptVersion: true,
    },
  },
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/unbound-method": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: true,
      },
    ],

    "@typescript-eslint/no-import-type-side-effects": "error",
    "no-console": "error",
  },
});

const eslintConfig = [
  {
    name: "custom/eslint/recommended",
    files: ["**/*.mjs", "**/*.ts?(x)"],
    ...eslintPlugin.configs.recommended,
  },
];

const ignoresConfig = [
  {
    name: "custom/eslint/ignores",
    // the ignores option needs to be in a separate configuration object
    // replaces the .eslintignore file
    ignores: [".next/", ".vscode/", "public/", "**/node_modules/", "**/*.js"],
  },
];

const nextconfig = [
  {
    files: ["**/*.ts?(x)"],
    name: "custom/next/config",
    // no files (option) for this config as we want to apply it to all files
    plugins: {
      react: reactPlugin,
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      import: importPlugin,
    },
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */ rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,

      ...reactHooksPlugin.configs.recommended.rules,
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      ...nextPlugin.configs.recommended.rules,
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      ...nextPlugin.configs["core-web-vitals"].rules,
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      ...importPlugin.configs.recommended.rules,
      "import/no-anonymous-default-export": "warn",
      "react/jsx-no-target-blank": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      // only needed if you use (eslint-import-resolver-)typescript
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];
export default [
  ...ignoresConfig,
  ...eslintConfig,
  ...tsconf,
  ...nextconfig,
  ...drizzle_config,
];
