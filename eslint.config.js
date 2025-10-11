import { config, base, globals } from "@gurja/eslint-config";
import next from "@gurja/eslint-config/next";

// @ts-expect-error this lib has no type declarations
import neverthrowPlugin from "eslint-plugin-neverthrow";

export default config(
  base(),
  next(),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
    },
  },
  neverthrowPlugin.configs.recommended,
);
