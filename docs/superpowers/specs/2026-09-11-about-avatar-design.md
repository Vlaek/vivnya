# About Avatar Design

## Goal

Add the supplied portrait to the “About” section without weakening the existing Night Archive hierarchy or narrowing the biography copy.

## Layout

- Place the avatar in the left column, below the “About” heading.
- Keep the lead, body copy, and facts in their existing right-column layout.
- On screens up to 780 px wide, place the avatar between the heading and the text content.

## Avatar treatment

- Use the user-supplied PNG as a local public artwork asset.
- Render it as a circle with `object-fit: contain`; shift it down slightly so the full head remains visible.
- Use a `3px solid #d45888` border.
- Make the heading wrapper shrink to its content, set the avatar to `width: 100%`, and apply inline-size containment so the image cannot widen the wrapper beyond the localized About title.
- Do not add a shadow or additional surface treatment.
- Provide descriptive alternative text in both supported languages through the existing i18n system.

## Implementation boundaries

- Extend the existing `About` component and its styles rather than introducing a new component abstraction.
- Preserve the current typography, spacing scale, colors, facts, and copy.
- Add a focused component test that verifies the portrait is rendered with translated alternative text.

## Acceptance criteria

- The supplied portrait appears inside a perfect circle in the “About” section.
- The circle has a 3 px `#d45888` border.
- The avatar sits below the section heading on desktop and between the heading and copy on mobile.
- The existing content remains readable and aligned at desktop and mobile widths.
- The image has translated accessible alternative text.
- The project test and build checks pass.
