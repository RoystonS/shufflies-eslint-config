module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer", // analyze commit messages for version bumps
    "@semantic-release/release-notes-generator", // generate release notes
    "@semantic-release/changelog", // update CHANGELOG.md
    "@semantic-release/npm", // publish to npm
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github", // create GitHub release
  ],
};
