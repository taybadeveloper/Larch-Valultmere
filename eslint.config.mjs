import { globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

const eslintConfig = [
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      // Next.js uses the automatic JSX runtime — no React import needed
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // No PropTypes on this project
      "react/prop-types": "off",
      // Entities are intentionally written as HTML entities in the content
      "react/no-unescaped-entities": "off",
      // Decorative images use alt="" (same as the original static site)
      "jsx-a11y/alt-text": "off",
    },
  },
];

export default eslintConfig;
