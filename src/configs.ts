import { type FlatConfig, includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export interface RecommendedConfigArgs {
  gitignorePaths?: string[];
}

export function recommended(args: RecommendedConfigArgs = {}): ReadonlyArray<FlatConfig> {
  const { gitignorePaths = [] } = args;

  const gitIgnores = gitignorePaths.map((gitIgnorePath) => {
    const ignoreConfig = includeIgnoreFile(gitIgnorePath);
    return ignoreConfig.ignores!;
  });

  const result: FlatConfig[] = [
    {
      ignores: gitIgnores.flat(),
    },

    eslint.configs.recommended,
    tseslint.configs.recommended as any,
    eslintPluginUnicorn.configs.recommended,
    {
      rules: {
        "unicorn/filename-case": "off",
      },
    },

    {
      plugins: {
        "simple-import-sort": simpleImportSort,
      },
      rules: {
        // ✅ Prefer and autofix to `import type`
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            disallowTypeAnnotations: false,
          },
        ],

        // ✅ Group + sort import lines, sort named specifiers
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",

        // ✅ Good hygiene
        "no-duplicate-imports": "error",
      },
    },
    {
      rules: {
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ];
  return result;
}
