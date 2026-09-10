# Comics Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual editorial `Comics` section with all six final and process images from `The Stone of Eternity / Game comic — Part 1` in the existing accessible lightbox.

**Architecture:** Keep comic metadata in a separate content module, extract the lightbox's minimal shared gallery contract, and render a dedicated Tailwind-based `ComicsSection` between `WorkGrid` and `About`. Store all ArtStation images locally and preserve their published order.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, i18next, Vitest, Testing Library, Vite.

---

### Task 1: Store the six ArtStation images locally

**Files:**
- Create: `public/artworks/comics/stone-of-eternity/page-01.jpg`
- Create: `public/artworks/comics/stone-of-eternity/page-02.jpg`
- Create: `public/artworks/comics/stone-of-eternity/page-03.jpg`
- Create: `public/artworks/comics/stone-of-eternity/page-04.jpg`
- Create: `public/artworks/comics/stone-of-eternity/process-line-art.jpg`
- Create: `public/artworks/comics/stone-of-eternity/process-storyboard.jpg`

- [ ] **Step 1: Download the source assets in published order**

Use `Invoke-WebRequest` with these exact source-to-target mappings:

```text
102/295/989/large/milana-zubareva-1-1.jpg -> page-01.jpg
102/295/990/large/milana-zubareva-1-2.jpg -> page-02.jpg
102/295/991/large/milana-zubareva-1-3.jpg -> page-03.jpg
102/295/996/large/milana-zubareva-1-4.jpg -> page-04.jpg
102/296/640/large/milana-zubareva-1.jpg   -> process-line-art.jpg
102/296/642/large/milana-zubareva-1.jpg   -> process-storyboard.jpg
```

- [ ] **Step 2: Verify every image**

Run a PowerShell image inspection and confirm exactly six JPEG files, each `1920 × 1080`, with non-zero byte length.

### Task 2: Add the shared gallery model and comic content with TDD

**Files:**
- Create: `src/content/gallery.ts`
- Create: `src/content/comics.ts`
- Create: `src/content/comics.test.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/components/ProjectLightbox.tsx`

- [ ] **Step 1: Write the failing comic data test**

Create `src/content/comics.test.ts` asserting:

```ts
expect(comic.title).toBe('The Stone of Eternity / Game comic — Part 1');
expect(comic.href).toBe('https://www.artstation.com/artwork/b0l8WG');
expect(comic.gallery.map((item) => item.src)).toEqual([
  '/artworks/comics/stone-of-eternity/page-01.jpg',
  '/artworks/comics/stone-of-eternity/page-02.jpg',
  '/artworks/comics/stone-of-eternity/page-03.jpg',
  '/artworks/comics/stone-of-eternity/page-04.jpg',
  '/artworks/comics/stone-of-eternity/process-line-art.jpg',
  '/artworks/comics/stone-of-eternity/process-storyboard.jpg',
]);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm run test -- src/content/comics.test.ts --reporter=dot`

Expected: FAIL because `./comics` does not exist.

- [ ] **Step 3: Add the shared gallery contract**

Create `src/content/gallery.ts`:

```ts
export type GalleryItem = { src: string; altKey: string };

export type GalleryProject = {
  title: string;
  href: string;
  gallery: GalleryItem[];
};
```

Update `projects.ts` to import `GalleryItem` and `GalleryProject`; define `ProjectGalleryItem = GalleryItem` and `Project = GalleryProject & { ...existing card fields... }`. Update `ProjectLightbox.tsx` to accept `GalleryProject` instead of the card-specific `Project` type.

- [ ] **Step 4: Implement comic metadata**

Create `src/content/comics.ts` with one `Comic` object using `assetPath()` for the six exact paths above. Set the editorial image to `page-01.jpg`, `translationKey` to `comics.project`, and preserve the final-page-then-process order.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `npm run test -- src/content/comics.test.ts --reporter=dot`

Expected: PASS.

### Task 3: Build the editorial section with TDD

**Files:**
- Create: `src/components/ComicsSection.tsx`
- Create: `src/components/ComicsSection.test.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Write failing component tests**

Create tests that render `ComicsSection` and assert:

```ts
expect(screen.getByRole('heading', { level: 2, name: 'Comics' })).toBeVisible();
expect(screen.getByRole('heading', { level: 3, name: /Stone of Eternity/i })).toBeVisible();
expect(screen.getByRole('link', { name: /ArtStation/i })).toHaveAttribute(
  'href',
  'https://www.artstation.com/artwork/b0l8WG',
);
```

Click the gallery button, assert `1 / 6`, press `ArrowRight`, assert `2 / 6`, press `Escape`, and assert that focus returns to the gallery button. Assert the editorial wrapper has `lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]` and defaults to one column.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm run test -- src/components/ComicsSection.test.tsx --reporter=dot`

Expected: FAIL because `ComicsSection` does not exist.

- [ ] **Step 3: Implement `ComicsSection`**

Create a semantic section with `id="comics"`, `aria-labelledby="comics-title"`, the existing `section-shell` class, and Tailwind utilities for its border, responsive spacing, two-column editorial layout, 16:9 artwork, hover treatment, typography, and mobile stacking. Use a real `<button>` around the artwork, keep the ArtStation `<a>` outside that button, and reuse `ProjectLightbox` plus the existing focus-return pattern from `WorkGrid`.

- [ ] **Step 4: Insert the section into the page**

Import `ComicsSection` in `src/app/App.tsx` and render it directly after `<WorkGrid />` and before `<About />`.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `npm run test -- src/components/ComicsSection.test.tsx --reporter=dot`

Expected: PASS.

### Task 4: Add bilingual content

**Files:**
- Modify: `src/locales/ru.json`
- Modify: `src/locales/en.json`

- [ ] **Step 1: Add Russian translations**

Add `comics` keys for `Повествовательные проекты`, `Комиксы`, `Игровой комикс · Часть 1`, the concise project description, the cover alt, and six gallery alts describing final pages 1–4, clean line art, and the rough numbered storyboard.

- [ ] **Step 2: Add English translations**

Add matching English keys for `Narrative projects`, `Comics`, `Game comic · Part 1`, the project description, and all seven alternative-text entries.

- [ ] **Step 3: Verify locale parity**

Run a JSON-key comparison for `ru.comics` and `en.comics` and confirm identical key structure and six gallery entries in each language.

### Task 5: Verify the complete change without committing

**Files:**
- Verify all files above
- Keep changes uncommitted per user request

- [ ] **Step 1: Run the full check**

Run: `npm run check`

Expected: TypeScript, all Vitest tests, Vite build, Sites packaging, and Node tests pass.

- [ ] **Step 2: Run the GitHub Pages build**

Run: `npm run build:pages`

Expected: build succeeds and the generated bundle references `/vivnya/artworks/comics/stone-of-eternity/`.

- [ ] **Step 3: Perform visual QA**

Inspect desktop and mobile widths. Confirm the editorial image is 16:9, section hierarchy is clear, text width remains readable, spacing follows the existing rhythm, the lightbox contains six images, controls remain visible, and no unrelated UI changed.

- [ ] **Step 4: Report the uncommitted diff**

Run: `git status --short` and `git diff --check`. Do not commit or push.

