# Comics Section Design

## Goal

Add a dedicated bilingual `Comics` section below the existing KAPISHE-related selected work and before the About section. The first entry presents `The Stone of Eternity / Game comic — Part 1` and opens every published final and process image in an accessible gallery.

## Selected direction

Use a standalone editorial section rather than adding another square card to the existing work grid. A wide visual and compact supporting copy give the single comic appropriate emphasis without leaving an unfinished-looking grid.

## Layout

- Eyebrow: `Повествовательные проекты` / `Narrative projects`.
- Heading: `Комиксы` / `Comics`.
- Desktop: wide artwork at left and title, category, description, and ArtStation cue at right.
- Mobile: artwork above the copy in one column.
- The section keeps the current dark surface, pink accent, Oswald headings, Manrope body text, four/eight-pixel spacing rhythm, restrained borders, and square corners.

## Interaction

- Clicking the editorial artwork opens an in-site lightbox.
- The lightbox contains all ArtStation assets in their published order, including final pages, drafts, storyboard frames, and development material.
- Existing close, previous, next, thumbnail, keyboard, focus return, and reduced-motion behavior is reused.
- A separate link opens the original ArtStation project in a new tab.

## Data and assets

- Store comic metadata separately from the KAPISHE project array.
- Download source images into `public/artworks/comics/stone-of-eternity/` so the deployed site does not hotlink ArtStation.
- Store localized section copy, category, description, and image alternative text in both locale files.
- Use `assetPath()` for GitHub Pages-safe URLs.

## Validation

- Test localized headings, editorial structure, gallery opening, all image ordering, and the ArtStation link.
- Run focused tests, the full project check, and the GitHub Pages build.
- Inspect desktop and mobile rendering against the existing typography and spacing checklist.

