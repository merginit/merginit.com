---
title: 'semantic-release Guide 2025: Automate npm, GitHub & Docker'
description: 'Automate releases with semantic-release. Learn setup, Conventional Commits, npm publish, GitHub Releases, Docker tagging, and CI via GitHub Actions.'
date: '2025-06-29'
categories:
  - devops
  - tutorial
published: true
author: 'Jonas Fröller'
readingTime: '11 min'
tags:
  ['semantic-release', 'automation', 'ci-cd', 'npm', 'github', 'docker', 'versioning', 'deployment']
---

# Automated Multi-Platform Releases with **semantic-release**

Semantic-release is a popular tool that fully automates versioning and publishing your project based on commit messages. By following a Conventional Commits style (e.g. `feat:`, `fix:` prefixes), it determines whether to bump a major, minor or patch version and publishes artifacts accordingly. You can configure it to publish to npm, create GitHub Releases, and even tag & push Docker images - all without manual intervention.

## 1. Setup & Installation

First, install **semantic-release** and the plugins you need:

```bash
npm install --save-dev semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/github
```

> If you want Docker image publishing, also install a Docker plugin like [felixfbecker/semantic-release-docker](https://github.com/felixfbecker/semantic-release-docker) or [@codedependant/semantic-release-docker](https://github.com/esatterwhite/semantic-release-docker).

Next, ensure your project uses Conventional Commits: semantic-release will **parse your commit messages** to infer the next version. Tools like _commitlint_ or _commitizen_ can help enforce this format. Initialize a Git repo (if you haven't already) and make sure the latest release tag is present (see Troubleshooting below).

Finally, define a script to run releases. In `package.json` add:

```json
"scripts": {
  "release": "semantic-release"
}
```

This lets you invoke semantic-release via `npm run release` (typically from CI).

## 2. Configuring semantic-release

Semantic-release can be configured in a `release.config.js` (or `.releaserc`) file or in the `release` key of `package.json`. Here's a simple example `release.config.js` for a Node project:

```js
// release.config.js
module.exports = {
	branches: ['main'], // release from main branch
	repositoryUrl: 'https://github.com/your-org/your-repo.git',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/npm',
		'@semantic-release/github'
	]
};
```

This config tells semantic-release to run on the `main` branch and use four plugins:

- **Commit Analyzer** (to parse commit messages)
- **Release Notes Generator** (to build CHANGELOG.md entries)
- **npm** (to publish to npm)
- **GitHub** (to create a GitHub Release)

You could also put this in a `.releaserc` JSON file. For instance, a minimal JSON config looks like:

```jsonc
// .releaserc
{
	"branches": ["main"],
	"repositoryUrl": "https://github.com/your-org/your-repo.git",
	"plugins": [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/npm",
		"@semantic-release/github"
	]
}
```

(config examples are adapted from the official docs.)

## 3. Publish to npm

To publish your package to npm, include the `@semantic-release/npm` plugin in your config (as shown above). This plugin will update the `version` in `package.json` and run `npm publish` for you. It requires an `NPM_TOKEN` with publishing rights in the CI environment. In practice, you should:

- **Set `NPM_TOKEN` in CI:** Store an npm automation token (see npm docs) in your CI system (e.g. GitHub Secrets). Semantic-release's verify step will check for this token.
- **Ensure `publishConfig` if needed:** You can also set `"publishConfig": { "registry": "...", "tag": "latest" }` in `package.json` to control the npm registry and dist-tag.

In your config, you'll have something like:

```jsonc
"plugins": [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  "@semantic-release/npm",
  "@semantic-release/github"
]
```

With this, when semantic-release runs it will bump the package version (in `prepare`), publish the package (in `publish`), and tag it. The npm plugin's own docs outline the steps:

| Step                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| **verifyConditions** | Checks that `NPM_TOKEN` is set (or `.npmrc` auth). |
| **prepare**          | Updates `package.json` version & creates tarball.  |
| **publish**          | Runs `npm publish` to the registry.                |

_(Table adapted from @semantic-release/npm docs.)_

## 4. Create GitHub Releases

To have semantic-release publish a GitHub Release (with release notes), add the `@semantic-release/github` plugin. This will automatically create (or update) a release in your GitHub repo whenever a new version is published. For example, extend the config plugins:

```js
// release.config.js
module.exports = {
	// ... other config ...
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/npm',
		'@semantic-release/github'
	]
};
```

Semantic-release will use the **GitHub token** from the environment. In GitHub Actions, you can use the built-in `${{ secrets.GITHUB_TOKEN }}`, which is automatically injected if you give the workflow write permissions. The token must have `repo` permissions to create releases and tag commits.

(If you protect the branch with required reviews, note that the _automatic_ `GITHUB_TOKEN` can't push back commits. In that case you might use a personal access token with sufficient rights - or skip pushing the version commit - see troubleshooting below.)

## 5. (Optional) Publish Docker Images

To also publish Docker images on release, use a semantic-release Docker plugin. For example, [felixfbecker/semantic-release-docker](https://github.com/felixfbecker/semantic-release-docker) lets you tag and push Docker images to Docker Hub. A sample JSON config (in `.releaserc`) might look like:

```jsonc
{
	"release": {
		"verifyConditions": {
			"path": "semantic-release-docker",
			"registryUrl": "docker.io"
		},
		"publish": {
			"path": "semantic-release-docker",
			"name": "your-dockerhub-username/imagename"
		}
	}
}
```

This tells semantic-release to use the Docker plugin: first it **verifies conditions** (e.g. logs into the registry using credentials) and then **tags & pushes** your image to Docker Hub.

You must provide Docker registry credentials in the CI environment. For Docker Hub, set **`DOCKER_USERNAME`** and **`DOCKER_PASSWORD`** (or `DOCKER_USERNAME`/`DOCKER_PASSWORD`) as secrets. The plugin logs into Docker and then, after the release notes are generated, tags the existing image (built in a prior step) with the new version and `latest`, and pushes it. For example, in CI you might do:

```yaml
- run: docker build -t your-dockerhub-username/imagename .
- run: npm run release # this will invoke semantic-release and the Docker plugin
```

_(Felix's plugin docs show Travis and Circle CI examples of this flow.)_ If using GitHub Actions, ensure your runner has Docker (e.g. use `setup-docker` or `actions/checkout` with Docker, and then login using `docker/login-action` with your `DOCKER_USERNAME`/`DOCKER_PASSWORD`).

## 6. CI/CD Integration (GitHub Actions)

Semantic-release is designed to run in CI on each push to your release branch. Here's a minimal **GitHub Actions** workflow example (from the official guide):

```yaml
name: Release
on:
  push:
    branches:
      - main # or master
permissions:
  contents: write # to create releases
  issues: write
  pull-requests: write
  id-token: write # (for npm provenance, if used)
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # <-- important: get all tags and history
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - name: Install dependencies
        run: npm ci
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub auth
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }} # npm auth
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }} # if publishing Docker
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        run: npx semantic-release
```

Here we checkout the repo (`fetch-depth: 0` to include tags), install deps, then run `semantic-release`. The required tokens are passed as environment variables. The `permissions` block grants the workflow rights to publish releases and comments. (Adjust or add secrets for Docker if needed.)

You can trigger semantic-release on pull requests or schedule as well, but the common pattern is "on push to `main`" so that only merged commits produce a release.

## 7. Tips & Gotchas

- **Use Conventional Commits:** Semantic-release relies on your commit message format to bump versions correctly. A commit like `feat: add login` will trigger a **minor** release, `fix:` a **patch**, and including `BREAKING CHANGE:` in the body will trigger a **major**. If your commits don't match the expected format, semantic-release will often skip releasing because it sees "no relevant changes."

- **Protect Your Branch:** _Important!_ Once semantic-release is set up, **anyone** who can push to the release branch (e.g. `main`) can trigger a release. To avoid unauthorized releases, protect the branch (require PR reviews) and restrict who can merge.

- **Checkout Depth:** Make sure your CI fetches the full git history. In GitHub Actions, use `fetch-depth: 0` in the checkout step so that semantic-release can find the previous tags and calculate the next version. Otherwise it may think no prior release exists.

- **Push Permissions:** Semantic-release typically commits the updated `package.json`/`CHANGELOG.md` back to the repo and pushes tags. In GitHub Actions, the default `GITHUB_TOKEN` **won't** push commits if the branch is protected. If you need to commit version bumps back to the main branch, you may have to disable protection or use a Personal Access Token with write permissions (though be careful with security). Alternatively, you can use the [`@semantic-release/git`](https://github.com/semantic-release/git) plugin to push artifacts explicitly, but note the token limitations.

- **Dry Run First:** Test your setup with `npx semantic-release --dry-run`. This will simulate the release process (printing the calculated next version and changelog) without actually publishing or tagging. It's a good way to debug configuration.

- **Docker Builds:** If publishing Docker images, build the Docker image _before_ running semantic-release. In Actions, you could use [docker/build-push-action](https://github.com/docker/build-push-action) to build and push in one step. Or use the `@semantic-release/exec` plugin to run a `docker build` in the `prepare` phase as shown in the Docker plugin docs.

- **Monorepos:** If you have a monorepo or multiple packages, semantic-release can still work but requires extra config (per-package configs, custom scripts, or tools like [semantic-release-multiple](https://github.com/amanda-mitchell/semantic-release-npm-multiple)). For simplicity, the above assumes a single package repo.

By setting up semantic-release with the right plugins and CI configuration, your project can **instantly** publish new versions wherever you need (npm registry, GitHub, Docker Hub) whenever commits land in main. This ensures consistent versioning and relieves developers from manual release chores.

## Sources

[GitHub - semantic-release/semantic-release: :package::rocket: Fully automated version management and package publishing](https://github.com/semantic-release/semantic-release)  
[Configuration | semantic-release](https://semantic-release.gitbook.io/semantic-release/usage/configuration)  
[@semantic-release/npm - npm](https://www.npmjs.com/package/@semantic-release/npm)  
[GitHub Actions | semantic-release](https://semantic-release.gitbook.io/semantic-release/recipes/ci-configurations/github-actions)  
[GitHub - esatterwhite/semantic-release-docker: Semantic release plugin for building and pushing docker images](https://github.com/esatterwhite/semantic-release-docker)
