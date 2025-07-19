import { type FlatConfig, includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
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
      name: ".gitignore contents",
      ignores: gitIgnores.flat().concat("foo/"),
    },

    { name: "eslint recommended", ...eslint.configs.recommended },
    tseslint.configs.recommended as any,
    eslintPluginUnicorn.configs.recommended,

    // eslint-plugin-import
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,

    {
      name: "override unicorn defaults",
      rules: {
        "unicorn/filename-case": "off",

        // Don't force changing 'Props' to 'Properties' and
        // 'el' to 'element' and so on.
        "unicorn/prevent-abbreviations": "off",
      },
    },

    {
      name: "override imports defaults",
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

        "import/no-unresolved": ["error", { ignore: ["eslint/config"] }],
      },
    },
    {
      name: "override ts-eslint defaults",
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
