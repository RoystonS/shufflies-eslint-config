#!/usr/bin/env node
// This is zx-compatible and cross-platform

import { $ } from "zx";

await Promise.all([
  $`${process.execPath} ${process.env.npm_execpath} run build:cjs`,
  $`${process.execPath} ${process.env.npm_execpath} run build:esm`,
  $`${process.execPath} ${process.env.npm_execpath} run build:types`,
]);
