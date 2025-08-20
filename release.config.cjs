module.exports = {
  branches: ["main"],
  plugins: [
    // Analyze commit messages to determine the type of release
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
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
