# AGENTS.md

This file is for OpenCode agents or developers making non-trivial changes in this theme repo. Only the hardest-earned, repo-specific context is included.

## Project Context

- **This is a Hugo theme** (not a full site).
- Main config: `hugo.toml` (in theme root). _Always check this for structure and enabled features._
- Theme entry for Hugo must reference this directory via `theme = "lichtung"` in the **user's** main Hugo site config, not here.

## Formatting/Style

- **All `*.html` files must be formatted using [prettier-plugin-go-template](https://github.com/hebnei/prettier-plugin-go-template)**.
  - `.prettierrc` forces the `go-template` parser on all `*.html`.
  - Run Prettier manually after changes (no automation/CI/hook):
    ```
    npx prettier --write .
    ```
  - Prettier options and plugin version are set in `package.json`/`package-lock.json`.
- No linting or type-check scripts present as of this writing.

## JS & CSS

- Main assets live in `assets/` (CSS: `main.scss`, JS: `main.js`).
- Don't edit minified JS (e.g. `fuse.min.js`, `mark.min.js`).
- Static resources like favicon are in `static/`.

## Features, Quirks, and Pitfalls

- **Comments**: Waline, Twikoo, and Giscus comment systems are all enabled by default in `hugo.toml`. Local testing for comments requires network access to those APIs.
- **Content Preview**: The theme's sample sections and behaviors are best previewed _inside a full Hugo site_ (not theme root).
- **Output Formats**: Custom output formats are defined (`JSON`, `CROSSLINKS`) in `hugo.toml`—relevant for extending/running the theme locally.
- **CJK support**: `hasCJKLanguage = true` may affect some text rendering/word count code.

## No CI / Test / Build System

- There are NO tests, lints, or build scripts in this repo. **Manual formatting is expected.**
- Make changes and run `npx prettier --write .` before creating a PR or committing.

## Reference

- All structure/feature questions: check `hugo.toml` first.
- Any repo-wide conventions not explicit here are not in effect as of this writing.
