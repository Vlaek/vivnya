# About Avatar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the supplied portrait as an accessible circular avatar with a 3 px `#d45888` border in the About section.

**Architecture:** Keep the feature inside the existing `About` component. Store the source portrait in the public artwork directory, source its alternative text from i18next, and use the existing About grid plus a dedicated wrapper for responsive placement and circular cropping.

**Tech Stack:** React 19, TypeScript, i18next, CSS, Vitest, Testing Library, Vite

---

## File map

- Create `public/artworks/about-avatar.png`: local copy of the portrait supplied by the user.
- Create `src/components/About.test.tsx`: focused accessibility and asset-path coverage for the About portrait.
- Modify `src/components/About.tsx`: render the portrait below the heading.
- Modify `src/locales/ru.json`: add Russian portrait alternative text.
- Modify `src/locales/en.json`: add English portrait alternative text.
- Modify `src/styles.css`: add circular crop, border, responsive sizing, and mobile placement.

### Task 1: Add failing About portrait coverage

**Files:**
- Create: `src/components/About.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { About } from './About';

describe('About', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('ru');
  });

  it('renders the supplied portrait with localized alternative text', () => {
    render(<About />);

    expect(screen.getByRole('img', { name: 'Портрет Миланы Зубаревой' })).toHaveAttribute(
      'src',
      '/artworks/about-avatar.png',
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm.cmd run test -- src/components/About.test.tsx --reporter=dot`

Expected: FAIL because the About component does not render an image.

- [ ] **Step 3: Commit the test**

```powershell
git add src/components/About.test.tsx
git commit -m "test: cover about avatar"
```

### Task 2: Render and style the portrait

**Files:**
- Create: `public/artworks/about-avatar.png`
- Modify: `src/components/About.tsx`
- Modify: `src/locales/ru.json`
- Modify: `src/locales/en.json`
- Modify: `src/styles.css`

- [ ] **Step 1: Copy the supplied artwork**

Copy `C:\Users\Vlad\Downloads\019c24d6-d655-416c-b827-eca1589a0a5b.png` to `public/artworks/about-avatar.png` without altering the source file.

- [ ] **Step 2: Add localized alternative text**

Add `"portraitAlt": "Портрет Миланы Зубаревой"` to the Russian `about` object and `"portraitAlt": "Portrait of Milana Zubareva"` to the English `about` object.

- [ ] **Step 3: Render the image after the heading content**

Inside `.about__heading`, after the `h2`, add:

```tsx
<div className="about__avatar">
  <img src="/artworks/about-avatar.png" alt={t('about.portraitAlt')} />
</div>
```

- [ ] **Step 4: Add the desktop avatar styles**

Add:

```css
.about__heading {
  width: fit-content;
  max-width: 100%;
}
.about__avatar {
  width: 100%;
  contain: inline-size;
  aspect-ratio: 1;
  margin-top: 32px;
  overflow: hidden;
  border: 3px solid #d45888;
  border-radius: 50%;
}
.about__avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translateY(8px) scale(0.96);
}
```

- [ ] **Step 5: Add the mobile avatar styles**

Inside `@media (max-width: 780px)`, add:

```css
.about__avatar { margin-top: 24px; }
```

Change `.about__content { margin-top: 56px; }` to `.about__content { margin-top: 40px; }` so the avatar and copy read as one balanced group.

- [ ] **Step 6: Run focused tests**

Run: `npm.cmd run test -- src/components/About.test.tsx --reporter=dot`

Expected: PASS.

- [ ] **Step 7: Commit the implementation**

```powershell
git add public/artworks/about-avatar.png src/components/About.tsx src/locales/ru.json src/locales/en.json src/styles.css
git commit -m "feat: add portrait to about section"
```

### Task 3: Verify behavior and visual quality

**Files:**
- Modify only if visual verification exposes an issue: `src/styles.css`

- [ ] **Step 1: Run the full project check**

Run: `npm.cmd run check`

Expected: TypeScript, Vitest, Vite build, Sites worker tests, and deployment configuration tests all pass.

- [ ] **Step 2: Start the local preview**

Run: `npm.cmd run dev -- --host 127.0.0.1 --port 5173`

Expected: Vite serves the project at `http://127.0.0.1:5173`.

- [ ] **Step 3: Inspect desktop and mobile layouts**

At desktop width, verify the avatar is below the heading, circular, and visually subordinate to the section title. At a width below 780 px, verify it appears between the heading and text, does not overflow, and preserves readable spacing.

- [ ] **Step 4: Check the project UI checklist**

Confirm the existing heading tracking and line heights are unchanged, spacing stays on the 4/8 px system, the portrait uses only the requested border treatment, and both desktop and mobile preserve clear hierarchy.

- [ ] **Step 5: Commit any visual correction**

If Step 3 requires a CSS adjustment, run:

```powershell
git add src/styles.css
git commit -m "fix: refine about avatar layout"
```
