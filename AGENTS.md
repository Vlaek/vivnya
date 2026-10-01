# AI Agent Guide

This file is the project-specific entry point for AI agents working in `site/`. Also follow the workspace-root `AGENTS.md`, which defines the shared UI checklist. When instructions differ, the more specific instruction in this file applies to the site unless the user explicitly says otherwise.

## Project purpose

This repository contains the bilingual web portfolio of artist Milana Zubareva (Vivnya). Preserve the artist's work, identity, and approved portfolio direction. Do not invent projects, credits, biography details, contact channels, or replacement artwork.

## Start here

Before editing:

1. Read `README.md` and `package.json`.
2. Inspect the relevant source, tests, styles, and content files.
3. Check `git status --short` and preserve unrelated user changes.
4. Reuse existing components, CSS conventions, design tokens, and translations.
5. For visual work, inspect the current UI at desktop and mobile sizes before deciding what to change.

Run the local server and open the preview using the browser available in the environment when visual verification is relevant. Do not ask the user to start it when the agent can do so safely.

The application source of truth is the TypeScript implementation under `src/`. Do not create new JavaScript or JSX duplicates. Confirm the active entry point from `index.html` before removing any legacy file.

## CodeSight context

Use the local CodeSight index to reduce repeated repository exploration:

1. At the start of a codebase-oriented task, check for `.codesight/wiki/index.md`.
2. If it is missing or no longer reflects the current source, run `npm run context:wiki`.
3. Read the wiki index first, then only the article relevant to the task.
4. Use `npm run context` when a full structural map is more useful than the targeted wiki.
5. Treat generated CodeSight output as navigation help, not as authoritative source code. Verify behavior and exact implementation in the referenced files before editing.

Do not run `codesight --init`: it can generate or replace agent instruction files, while this `AGENTS.md` is maintained manually. Do not force-add `.codesight/`; the index is local and reproducible.

## Project map

- `src/components/`: interface components and their colocated tests.
- `src/content/`: project and comic metadata.
- `src/locales/`: Russian and English translations.
- `src/styles.css`: shared tokens, typography, layout, responsive behavior, and motion.
- `public/artworks/`: artwork approved for publication in the portfolio.
- `tests/`: deployment and hosting integration tests.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment.
- `.openai/hosting.json`, `worker/`, and `scripts/prepare-sites-build.mjs`: OpenAI Sites-compatible deployment path.

Local design references, QA captures, and agent working notes are not product source. Keep them under ignored `references/`, `.superpowers/`, or `docs/superpowers/` directories and never force-add them.

## Approved design direction

- Preserve the “Night Archive” direction: near-black canvas, warm-white oversized `VIVNYA` typography, and one muted-magenta accent.
- Milana's supplied artwork is the dominant visual material. Do not generate substitutes or alter artwork unless the user explicitly requests it.
- Keep the site bilingual through i18next and retain a visible, persisted RU/EN switch.
- Keep interactions restrained: short interruptible transitions, subtle clipped-image reveals, `scale(0.97)` press feedback, and a reduced-motion path.
- In Contact, keep the oversized headline dominant and the supplied character portrait in a narrower right column. Pointer-tracking pupils remain centered for touch and reduced-motion users.
- In About, keep the supplied portrait in a large circular frame below the heading. Match its diameter to the rendered About-title width, preserve the full head in the crop, and retain the muted-magenta `#d45888` 3 px outline.
- Follow the workspace-root `AGENTS.md` typography, spacing, surface, color, radius, text-width, and final-review checklist.

## Implementation rules

- Keep changes focused on the user's request; avoid unrelated refactors.
- Prefer existing components and tokens over new parallel abstractions.
- Keep Russian and English locale structures synchronized whenever user-facing copy changes.
- Update or add tests when behavior, content contracts, navigation, or deployment behavior changes.
- Do not remove or bypass accessibility labels, keyboard behavior, focus visibility, reduced-motion handling, or responsive states.
- Do not modify deployment files unless the task concerns deployment or the change is required to keep validation passing.
- Do not add dependencies when the existing stack can solve the task cleanly.
- Do not run `git push`, deploy, rewrite history, or create a release unless the user explicitly asks.

## Repository hygiene and privacy

Never commit:

- credentials, API keys, private keys, `.env` files, or service tokens;
- `node_modules/`, `dist/`, coverage, caches, logs, or TypeScript build metadata;
- absolute local paths such as `C:\Users\...`;
- local references, QA screenshots, generated comparisons, or agent scratch files;
- generated `.codesight/` context files;
- third-party visual references without confirmed permission to redistribute them.

Artwork in `public/artworks/` is intentionally publishable for this portfolio. Do not move source/reference material into that directory merely to make it available to the build.

## Validation

Before reporting completion, run from `site/`:

```bash
npm run check
git diff --check
git status --short
```

For visual changes, also verify the affected UI in a browser at representative desktop and mobile widths, including keyboard focus and `prefers-reduced-motion`. Report what was checked and any validation that could not be completed.

Before a Sites handoff, additionally run:

```bash
npm run build
npm run test:sites
```

The Sites build must produce `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Completion report

Keep the final report concise and include:

1. Problems found.
2. Changes made.
3. Validation performed and its result.
4. Anything intentionally left unchanged, with the reason.
