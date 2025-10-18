/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "./src/styles/globals.css",
  tailwindFunctions: ["cn", "cva", "tv"],
  trailingComma: "all",
};

export default config;
