# Design QA — Vivnya portfolio refinements

## Comparison target

- Source visual truth: `C:\Users\Vlad\AppData\Local\Temp\codex-clipboard-c8c2978d-6bbe-454f-ab9f-843ab08ae74f.png`
- Rendered implementation: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\implementation-desktop.png`
- Focused contact capture: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\contact-730x466.png`
- Final requested line-break capture: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\contact-three-lines.png`
- Final line-height capture: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\contact-line-height.png`
- Equal square grid capture: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\equal-square-grid.png`
- Final flexible grid capture: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\flexible-card-grid-wide.png`
- Gallery evidence: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\gallery-desktop.png` and `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\gallery-mobile-final.png`
- Normalized combined comparison: `C:\Users\Vlad\Desktop\Projects\vivnya2\site\references\qa\contact-comparison-normalized.png`
- States: Russian default, full portfolio, contact section, open Wolf promo gallery; English switch also exercised.

## Viewports and normalization

- Source contact screenshot: 730 × 466 px.
- Contact implementation: CSS viewport 730 × 466 at device scale factor 1; browser content screenshot 715 × 456 px after scrollbar/browser viewport allocation.
- Normalized comparison: source downsampled to 715 × 456 px and placed beside the unchanged 715 × 456 implementation capture. No density mismatch remains in the comparison.
- Desktop implementation: CSS viewport 1440 × 900 at device scale factor 1; full-page browser capture 1425 × 3831 px.
- Mobile implementation: CSS viewport 390 × 844 at device scale factor 1; full-page browser capture 375 × 5011 px.
- Desktop gallery: 1440 × 900 px. Final mobile gallery: 390 × 844 px.

## Full-view comparison evidence

The desktop and mobile full-page captures preserve the existing dark editorial direction, Oswald display typography, pink accent, full-bleed artwork, and clear work/about/contact sequence. The source image is a bounded contact reference rather than a full-site mock, so whole-page fidelity is evaluated against the existing product design and the requested changes rather than asserted as a pixel clone.

## Focused comparison evidence

The normalized side-by-side contact comparison shows the requested outcome directly: the title no longer breaks into the isolated `ТО` line from the source screenshot, and now uses two balanced lines at the same narrow viewport. The inline `ArtStation` text is visibly linked and underlined, while the primary ArtStation action remains present.

The gallery captures verify real ArtStation artwork, an opaque viewing surface, correctly sized controls, image counter, previous/next controls, thumbnails, and a separate ArtStation link. Desktop and mobile states were inspected rather than inferred from code.

## Required fidelity surfaces

- Fonts and typography: existing Oswald/Manrope/Unbounded families remain loaded. Display weights, line height, and uppercase treatment are consistent; the contact title uses a wider 15ch measure and responsive clamp to avoid malformed wrapping.
- Spacing and layout rhythm: Hero identity lines share one Tailwind `gap-2` stack. Card metadata is balanced without number columns. About facts use consistent one-line stacked values. No overlap or clipping was observed at 1440, 730, or 390 CSS px.
- Colors and tokens: existing black, off-white, muted gray, and pink accent tokens are retained. The lightbox is solid black so background copy does not leak through.
- Image quality and asset fidelity: all gallery images are original local copies from the five ArtStation projects. Duplicate cover images were removed by hash comparison. Images use contain in the lightbox and the established cover crops in cards.
- Copy and content: visible card titles match ArtStation exactly. Categories, controls, alt text, facts, and contact copy work in Russian and English.
- Icons and affordances: Phosphor icons are used consistently. Gallery triggers use a zoom cursor and expand icon; external links retain the arrow-up-right cue.
- Accessibility and behavior: dialog semantics, initial close-button focus, Escape, arrow keys, focus trapping, focus restoration, scroll locking, labels, translated alt text, 44px controls, and reduced-motion-safe behavior were checked. Browser console showed no errors or warnings.

## Comparison history

1. Earlier P2 — contact title at 730 × 466 wrapped into four uneven lines with an isolated `ТО`, materially weakening hierarchy.
   - Fix: widened the title to 15ch and applied responsive Tailwind type sizing and line height.
   - Post-fix evidence: `contact-comparison-normalized.png` shows a balanced two-line title.
2. Earlier P2 — first mobile gallery capture used a 95% black overlay, allowing underlying page headings to show through.
   - Fix: changed the overlay to opaque black and added an accessible name to the icon-only mobile ArtStation link.
   - Post-fix evidence: `gallery-mobile-final.png` shows a clean, distraction-free gallery with named controls.
3. Follow-up request — the Russian contact title now has explicit, authored line breaks after `Давайте` and `что-то`, plus the requested exclamation mark.
   - Fix: stored the line breaks in the Russian i18n value and rendered them with Tailwind `whitespace-pre-line`; English remains naturally flowing.
   - Post-fix evidence: `contact-three-lines.png` shows exactly three lines at the narrow viewport with no extra wrapping.
4. Annotation follow-up — increased the selected contact heading line height from `0.92` to `1` without changing its size or authored line breaks.
   - Post-fix evidence: `contact-line-height.png` at the annotated 558 × 920 viewport shows clearer separation between all three lines.
5. Grid follow-up — replaced the bespoke 12-column/nth-child layout with a standard responsive Tailwind Grid and square logo media.
   - Post-fix evidence: `equal-square-grid.png`.
   - Interaction evidence: computed cursor is `pointer` for previous, next, and close controls in the project lightbox.
6. Final card follow-up — removed the fixed 400 px cap and the `mt-auto`/full-height combination that pushed one-line titles below their two-line neighbors.
   - Post-fix evidence: `flexible-card-grid-wide.png`; at 1440 px the cards flexed to 410 px and both last-row headings started at exactly y=500, 18 px below their images.

## Findings

No actionable P0, P1, or P2 findings remain. The contact treatment intentionally differs from the supplied screenshot because the user explicitly requested wider, cleaner wrapping.

## Primary interactions tested

- Open a work gallery from a card.
- Navigate images with ArrowRight/ArrowLeft and visible buttons.
- Close with Escape and restore focus to the originating card.
- Use thumbnail selection and the external ArtStation link.
- Switch Russian/English and verify translated structure and document language.
- Inspect desktop, supplied narrow contact viewport, and mobile responsive layouts.

## Verification

- `npm.cmd run check`: TypeScript, 8 Vitest tests, production Vite build, Sites packaging, and 4 worker tests passed.
- Browser console: no errors or warnings in inspected desktop, mobile, gallery, and language states.

final result: passed
