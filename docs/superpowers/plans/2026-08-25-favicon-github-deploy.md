# Favicon and GitHub Deploy Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use `public/favicon.png` as the site favicon and provide a safe `npm run deploy` command that validates the project before pushing `main` to GitHub Pages.

**Architecture:** Keep deployment on the existing GitHub Actions workflow. Vite expands `%BASE_URL%` in `index.html`, so the same favicon declaration works locally and at `/vivnya/`; the npm command only checks and pushes committed changes.

**Tech Stack:** Vite 6, npm scripts, Node.js test runner, GitHub Actions, GitHub Pages.

---

### Task 1: Add deployment configuration contract tests

**Files:**
- Create: `tests/deployment-config.test.mjs`

- [x] **Step 1: Write failing tests**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("declares the supplied PNG favicon using Vite's base URL", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(
    html,
    /<link rel="icon" type="image\/png" href="%BASE_URL%favicon\.png" \/>/,
  );
});

test("deploy checks the project before pushing main", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.deploy, "npm run check && git push origin main");
});
```

- [x] **Step 2: Run the tests and verify RED**

Run: `node --test tests/deployment-config.test.mjs`

Expected: two assertion failures because the favicon link and `deploy` script do not exist yet.

### Task 2: Implement the favicon and deploy command

**Files:**
- Modify: `index.html`
- Modify: `package.json`
- Test: `tests/deployment-config.test.mjs`

- [x] **Step 1: Add the favicon declaration**

Add inside `<head>`:

```html
<link rel="icon" type="image/png" href="%BASE_URL%favicon.png" />
```

- [x] **Step 2: Add the deploy script**

Add to `scripts` in `package.json`:

```json
"deploy": "npm run check && git push origin main"
```

- [x] **Step 3: Run the focused tests and verify GREEN**

Run: `node --test tests/deployment-config.test.mjs`

Expected: 2 tests pass.

- [x] **Step 4: Verify the Pages build**

Run: `npm run build:pages`

Expected: build succeeds and `dist/client/index.html` contains `/vivnya/favicon.png`.

- [x] **Step 5: Run the full project checks**

Run: `npm run check`

Expected: type checking, Vitest, Vite build, Sites packaging, and Node tests all pass.

### Task 3: Commit and deploy

**Files:**
- Add: `public/favicon.png`
- Modify: `index.html`
- Modify: `package.json`
- Modify: `src/components/LanguageSwitch.test.tsx`
- Modify: `src/components/WorkGrid.test.tsx`
- Modify: `src/content/projects.test.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ru.json`
- Add: `tests/deployment-config.test.mjs`
- Add: `docs/superpowers/plans/2026-08-25-favicon-github-deploy.md`

- [ ] **Step 1: Commit only the favicon/deploy files**

```bash
git add public/favicon.png index.html package.json src/components/LanguageSwitch.test.tsx src/components/WorkGrid.test.tsx src/content/projects.test.ts src/content/projects.ts src/locales/en.json src/locales/ru.json tests/deployment-config.test.mjs docs/superpowers/plans/2026-08-25-favicon-github-deploy.md
git commit -m "Add favicon and GitHub deploy command"
```

- [ ] **Step 2: Deploy through the new command**

Run: `npm run deploy`

Expected: checks pass and `main` is pushed to `origin`, triggering `Deploy to GitHub Pages`.

- [ ] **Step 3: Verify the live deployment**

Confirm the Actions run succeeds and `https://vlaek.github.io/vivnya/favicon.png` returns HTTP 200.
