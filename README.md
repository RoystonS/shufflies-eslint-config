# @shufflies/eslint-config

This probably isn't a useful package for you.
It's my own personal set of reusable eslint configuration.

## Installation

Install the package:

```shell
npm install -D @shufflies/eslint-config
```

Reference it in an `eslint.config.mjs` or `eslint.config.ts`:

```typescript
// @ts-check
import { fileURLToPath, URL } from "node:url";

import { recommended } from "@shufflies/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...recommended({
    gitignorePaths: [fileURLToPath(new URL(".gitignore", import.meta.url))],
  }),

  // Other rule/config overrides
  {
    rules: {
      "some/rule": "off"
    }
  }
);
```
