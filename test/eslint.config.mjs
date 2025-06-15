import { defineConfig } from "eslint/config";

import { recommended } from "../lib/esm/index.js";

export default defineConfig(...recommended(), {
  files: ["**/*.js", "**/*.ts"],
});
