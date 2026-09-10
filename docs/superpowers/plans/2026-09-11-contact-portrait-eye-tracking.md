# Contact Portrait Eye Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the supplied portrait to the contact section, preserve headline dominance with a `1.08` line height, and make layered pupils follow a fine pointer across the full page.

**Architecture:** A focused `TrackingPortrait` component owns the pupil-free image, two pupil-only layers positioned inside the artwork's existing eye contours, per-eye cursor vectors, viewport-level event handling, animation-frame scheduling, and listener cleanup. `Contact` composes that component into a responsive asymmetric grid while locale files provide the image alternative text. Styling stays in the existing global stylesheet and uses the existing surface, line, spacing, and motion tokens.

**Tech Stack:** React 19, TypeScript, CSS/Tailwind v4 utilities, i18next, Vitest, Testing Library.

---

### Task 1: Add the tracking portrait component

**Files:**
- Create: `src/components/TrackingPortrait.tsx`
- Create: `src/components/TrackingPortrait.test.tsx`
- Create: `public/artworks/contact-portrait.png`

- [x] **Step 1: Copy the supplied portrait into the public artwork directory**

Copy the final pupil-free source `C:\Users\Vlad\AppData\Local\Temp\codex-clipboard-09662688-9472-458b-9d8b-35e58228034f.png` to `public/artworks/contact-portrait.png` without modifying the source file.

- [x] **Step 2: Write failing component tests**

Create tests that render `<TrackingPortrait alt="Character at a computer" />`, assert the localized image alt is exposed, dispatch a window-level `pointerMove` with mocked eye rectangles and `requestAnimationFrame`, and assert each pupil receives its own bounded transform toward the cursor. Dispatch window blur and assert both transforms reset to center. Mock `window.matchMedia` so `(hover: hover) and (pointer: fine)` matches and `(prefers-reduced-motion: reduce)` does not.

```tsx
expect(screen.getByRole('img', { name: 'Character at a computer' })).toBeInTheDocument();
fireEvent.pointerMove(window, { clientX: 50, clientY: 0, pointerType: 'mouse' });
expect(screen.getByTestId('pupil-left')).toHaveStyle({
  transform: 'translate3d(calc(-50% + 1px), calc(-50% + -5px), 0)',
});
fireEvent.blur(window);
expect(screen.getByTestId('pupil-left')).toHaveStyle({
  transform: 'translate3d(-50%, -50%, 0)',
});
```

- [x] **Step 3: Run the focused test and verify it fails**

Run: `npm.cmd run test -- src/components/TrackingPortrait.test.tsx`

Expected: FAIL because `TrackingPortrait.tsx` does not exist.

- [x] **Step 4: Implement the minimal component**

Implement a figure with `data-testid="tracking-portrait"`, the pupil-free portrait image, and two `aria-hidden="true"` positioning boxes containing only the pupils. Install one window-level pointer listener, bail out unless fine hover matches and reduced motion does not, and reset on touch pointer events. In one scheduled animation frame, derive a unit vector from each eye rectangle's center to the cursor, multiply it by the safe `5px` movement radius, and write a direct `translate3d` transform to the matching pupil. Cancel a pending frame during replacement and unmount. Reset both transforms to center on window blur, touch input, or reduced motion.

```tsx
import { useEffect, useRef } from 'react';
import { assetPath } from '../content/assetPath';

const centeredTransform = 'translate3d(-50%, -50%, 0)';
const pupilTravel = 5;

export function TrackingPortrait({ alt }: { alt: string }) {
  const eyeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pupilRefs = useRef<Array<HTMLElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const resetPupils = () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      pupilRefs.current.forEach((pupil) => {
        if (pupil) pupil.style.transform = centeredTransform;
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const canTrack = event.pointerType !== 'touch'
        && window.matchMedia('(hover: hover) and (pointer: fine)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!canTrack) return resetPupils();
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        eyeRefs.current.forEach((eye, index) => {
          const pupil = pupilRefs.current[index];
          if (!eye || !pupil) return;
          const rect = eye.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(x, y);
          const offsetX = distance === 0 ? 0 : Math.round((x / distance) * pupilTravel);
          const offsetY = distance === 0 ? 0 : Math.round((y / distance) * pupilTravel);
          pupil.style.transform = offsetX === 0 && offsetY === 0
            ? centeredTransform
            : `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), 0)`;
        });
        animationFrameRef.current = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('blur', resetPupils);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetPupils);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <figure className="tracking-portrait" data-testid="tracking-portrait">
      <img src={assetPath('/artworks/contact-portrait.png')} alt={alt} />
      <span className="tracking-portrait__eye tracking-portrait__eye--left" aria-hidden="true"
        ref={(node) => { eyeRefs.current[0] = node; }}>
        <i data-testid="pupil-left" ref={(node) => { pupilRefs.current[0] = node; }}
          style={{ transform: centeredTransform }} />
      </span>
      <span className="tracking-portrait__eye tracking-portrait__eye--right" aria-hidden="true"
        ref={(node) => { eyeRefs.current[1] = node; }}>
        <i data-testid="pupil-right" ref={(node) => { pupilRefs.current[1] = node; }}
          style={{ transform: centeredTransform }} />
      </span>
    </figure>
  );
}
```

- [x] **Step 5: Run the focused test and verify it passes**

Run: `npm.cmd run test -- src/components/TrackingPortrait.test.tsx`

Expected: PASS.

### Task 2: Compose the responsive contact layout

**Files:**
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Contact.test.tsx`
- Modify: `src/locales/ru.json`
- Modify: `src/locales/en.json`
- Modify: `src/styles.css`

- [x] **Step 1: Write the failing contact integration test**

Extend `Contact.test.tsx` to assert that the Russian portrait alternative text is present and that the headline keeps its exact line breaks.

```tsx
expect(screen.getByRole('img', { name: 'Стилизованный персонаж в наушниках за компьютером' })).toBeInTheDocument();
expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
  'Давайте\nсоздадим что-то\nзапоминающееся!',
  { normalizeWhitespace: false },
);
```

- [x] **Step 2: Run the contact test and verify it fails**

Run: `npm.cmd run test -- src/components/Contact.test.tsx`

Expected: FAIL because the portrait is not rendered.

- [x] **Step 3: Add locale copy and compose the component**

Add `contact.portraitAlt` in both locales:

```json
"portraitAlt": "Стилизованный персонаж в наушниках за компьютером"
```

```json
"portraitAlt": "Stylized character wearing headphones at a computer"
```

Import `TrackingPortrait` into `Contact.tsx`. Wrap the eyebrow, heading, and contact copy in `.contact__content`, place `<TrackingPortrait alt={t('contact.portraitAlt')} />` beside it in `.contact__main`, and leave `.contact__footer` after the grid.

- [x] **Step 4: Add desktop and mobile styling**

Use an asymmetric grid and existing tokens:

```css
:root { --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); }
.contact__main {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.contact h2 { line-height: 1.08; }
.tracking-portrait {
  position: relative;
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--line);
  background: var(--surface);
  aspect-ratio: 1179 / 1334;
}
.tracking-portrait > img { width: 100%; height: 100%; object-fit: cover; }
.tracking-portrait__eye { position: absolute; top: 29.6%; overflow: hidden; width: 13.2%; height: 14.7%; border-radius: 48% 52% 46% 54%; }
.tracking-portrait__eye--left { left: 33.6%; transform: rotate(-2deg); }
.tracking-portrait__eye--right { left: 53.7%; transform: rotate(2deg); }
.tracking-portrait__eye i {
  position: absolute;
  left: 50%; top: 50%;
  width: 52%; height: 68%;
  border-radius: 50%;
  background: #210d0d;
  transform: translate3d(-50%, -50%, 0);
  transition: transform 120ms var(--ease-in-out);
}
@media (max-width: 780px) {
  .contact__main { display: block; }
  .tracking-portrait { width: min(100%, 420px); margin: 48px auto 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tracking-portrait__eye i { transform: translate3d(-50%, -50%, 0) !important; }
}
```

Tune only the transparent eye positioning boxes during visual QA; do not recreate or cover the pupil-free artwork's eye whites or contours.

- [x] **Step 5: Run contact and portrait tests**

Run: `npm.cmd run test -- src/components/Contact.test.tsx src/components/TrackingPortrait.test.tsx`

Expected: PASS.

### Task 3: Verify behavior and visual quality

**Files:**
- Modify only if QA exposes a scoped issue: `src/components/TrackingPortrait.tsx`, `src/styles.css`, or the two component test files.

- [x] **Step 1: Run the full project check**

Run: `npm.cmd run check`

Expected: TypeScript, all Vitest tests, the Vite build, Sites packaging, and deployment configuration checks pass.

- [x] **Step 2: Start the local preview and inspect desktop**

Run: `npm.cmd run dev -- --host 127.0.0.1`

Open the local Vite URL and inspect the contact section at a desktop viewport. Confirm the headline is visually primary, uses `1.08` line height, the portrait is contained in the right column, the eyes align at rest, follow the pointer within the eye whites, and return to center on leave.

- [x] **Step 3: Inspect mobile and reduced motion**

At a width near `390px`, confirm the portrait stacks below the copy with no overflow and the footer hierarchy remains intact. Emulate reduced motion and confirm the pupil transforms remain centered.

- [x] **Step 4: Run final verification**

Run: `npm.cmd run check`

Expected: PASS after any visual QA adjustments.

- [x] **Step 5: Commit the implementation**

```bash
git add public/artworks/contact-portrait.png src/components/TrackingPortrait.tsx src/components/TrackingPortrait.test.tsx src/components/Contact.tsx src/components/Contact.test.tsx src/locales/ru.json src/locales/en.json src/styles.css docs/superpowers/plans/2026-09-11-contact-portrait-eye-tracking.md
git commit -m "Add interactive contact portrait"
```
