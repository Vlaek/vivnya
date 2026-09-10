# Contact Portrait and Eye Tracking Design

## Goal

Refine the “Available for new projects” contact section by giving the multi-line headline more breathing room and adding the supplied character portrait as an interactive visual accent. The headline must remain the dominant element.

## Layout

On desktop, the section uses an asymmetric two-column composition. The left column contains the eyebrow, headline, and ArtStation contact copy. The narrower right column contains a portrait card aligned with the primary content. The existing footer metadata remains full-width below both columns.

On screens at or below the existing `780px` breakpoint, the section becomes one column and the portrait moves below the contact copy. The portrait must not make the headline or footer overflow at the minimum supported width of `320px`.

The portrait card uses the current surface, border, and restrained depth language. It does not introduce a new accent color, heavy shadow, or unrelated decorative treatment.

## Typography

Keep the existing translated headline text and explicit Russian line breaks. Increase the contact headline line height from `1` to `1.08`, preserving the existing Oswald family, uppercase treatment, scale, and negative tracking.

## Portrait and Eye Tracking

Store the supplied image as a local public asset and render it with a translated, descriptive alternative text. The image itself remains unchanged outside the eye regions.

Because the pupils are baked into the raster image, cover each eye area with a carefully matched eye-white layer centered in the original socket and render a centered dark pupil with a small highlight above it. Listen for pointer movement across the full browser window. For each eye independently, calculate the unit vector from that eye's on-screen center to the cursor and apply a clamped offset along that vector. This makes the two gaze lines converge naturally on the cursor while each pupil remains inside its eye.

Use `requestAnimationFrame` to coalesce pointer updates and write transforms directly to the two pupil elements. Reset the pupils to center when the browser window loses focus. The window-level listener must be removed on unmount. Do not attach a high-frequency React state update or drive child transforms through parent CSS variables.

Eye tracking is enabled only for a fine hover-capable pointer. On touch devices, when JavaScript is unavailable, and when `prefers-reduced-motion: reduce` is active, pupils remain centered. The eye overlays are decorative and hidden from assistive technology.

## Component Boundaries

Create a focused portrait component responsible for the image, eye overlays, pointer normalization, and cleanup. `Contact` remains responsible for section content and layout. No new animation dependency is required.

Add the portrait alternative text to both Russian and English locale files.

## Verification

Automated tests verify that:

- the existing Russian three-line headline remains intact;
- the portrait is rendered with localized alternative text;
- pointer movement applies a bounded pupil transform and window blur resets it;
- the project type-checks, tests pass, and the production build succeeds.

Visual QA covers desktop and mobile widths, headline spacing, hierarchy, image cropping, pupil alignment at rest and at pointer extremes, reduced-motion behavior, and consistency with the existing spacing, color, radius, and surface system.

## Out of Scope

No change is made to the contact wording, ArtStation destination, global typography, project gallery, or other page sections. The source artwork is not otherwise redrawn or replaced.
