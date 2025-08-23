module.exports = {
  branches: [
    "main",
    { name: "next", prerelease: true }
  ],
  plugins: [
    // Analyze commit messages to determine the type of release
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          // Dependency chores with specific subjects can trigger a release
          { type: 'chore', scope: 'deps', subject: "*bump*eslint*", release: 'minor' }
        ],
      },
    ],

    // Generate release notes based on commit messages
    "@semantic-release/release-notes-generator",

    // Publish the package to npm
    "@semantic-release/npm",
    // Create a GitHub release
    "@semantic-release/github",
  ],
};
