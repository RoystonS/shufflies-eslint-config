module.exports = {
  branches: ["main"],
  plugins: [
    // Analyze commit messages to determine the type of release
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          // Default: ignore all plain chore(deps)
          { type: "chore", scope: "deps", release: false },
          // Special-case: treat ESLint bumps as a minor release
          { type: "chore", scope: "deps", release: "minor", subject: /bump.*(eslint)/i },
        ]
      }
    ],

    // Generate release notes based on commit messages
    "@semantic-release/release-notes-generator",

    // Publish the package to npm
    "@semantic-release/npm",
    // Create a GitHub release
    "@semantic-release/github",
  ],
};
