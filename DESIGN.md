---
name: "Euael M. Eshete"
description: "A restrained portfolio where real products and engineering evidence carry the expression."
colors:
  accent-text: "#a74921"
  accent-text-dark: "#edac86"
  accent-mark: "#bb562c"
  accent-mark-dark: "#de9366"
  bg: "#f7f8f5"
  bg-dark: "#181c19"
  bg-subtle: "#eef0eb"
  bg-subtle-dark: "#202621"
  surface: "#eef0eb"
  surface-dark: "#222924"
  text: "#252923"
  text-dark: "#edf0e7"
  text-secondary: "#50564d"
  text-secondary-dark: "#c3cbbd"
  text-muted: "#666d62"
  text-muted-dark: "#a1ae9c"
  border: "#d9ddd4"
  border-dark: "#394338"
  border-strong: "#a9b1a2"
  border-strong-dark: "#64705d"
  btn-bg: "#252923"
  btn-bg-dark: "#e6eddb"
  btn-fg: "#f7f8f5"
  btn-fg-dark: "#20261c"
  btn-bg-hover: "#424c3a"
  btn-bg-hover-dark: "#cbd9b8"
  focus-ring: "#a74921"
  focus-ring-dark: "#edac86"
  selection-bg: "#e6bea4"
  selection-bg-dark: "#855536"
  selection-fg: "#252923"
  selection-fg-dark: "#fff"
  negative: "#ac3434"
  negative-dark: "#f39a93"
  positive: "#327044"
  positive-dark: "#a4d5a9"
typography:
  display:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 550
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  body-large:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  meta:
    fontFamily: "\"Archivo\", \"Segoe UI\", sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
rounded:
  default: "6px"
  lg: "12px"
  circle: "50%"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  page-pad: "clamp(1.25rem, 4vw, 3.5rem)"
  section: "clamp(4rem, 8vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.btn-bg}"
    textColor: "{colors.btn-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.default}"
    padding: "0.8rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.btn-bg-hover}"
  button-primary-dark:
    backgroundColor: "{colors.btn-bg-dark}"
    textColor: "{colors.btn-fg-dark}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.default}"
    padding: "0.8rem 1.25rem"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  text-link:
    textColor: "{colors.text}"
  contact-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.default}"
    padding: "0.85rem 1rem"
  field-error-message:
    textColor: "{colors.negative}"
  navigation:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text-secondary}"
  technology-select:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.default}"
    padding: "0.6rem 2.25rem 0.6rem 0.9rem"
  project-row:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    padding: "3.5rem 0"
  technology-tags:
    textColor: "{colors.text-muted}"
    typography: "{typography.meta}"
  engineering-disclosure:
    textColor: "{colors.text}"
  project-control:
    backgroundColor: "#fff"
    textColor: "#294038"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
---

# Design System: Euael M. Eshete

## Overview

**Creative North Star: "The Product Monograph"**

The Product Monograph gives real work room to speak. Pale green paper, charcoal type, clear hierarchy, and generous space create a professional setting for product imagery, an authentic portrait, and engineering explanations. The interface is calm; the artifacts provide character.

Light and dark follow the visitor’s operating system. Surfaces remain flat, with small translucent details on the scrolled navigation and project arrow controls. Motion responds to attention and action: short control transitions, a restrained name entrance, and gentle movement of product captures.

This record describes the finished implementation. Its shared language is reusable; the centered homepage name, PKI-first sequence, individual showcase colors, screenshot angles, and project order are compositions specific to their surfaces. Their direction remains in `.impeccable/surfaces/src-pages-index-astro.md`.

**Key Characteristics:**

- Real photography, verified product captures, and clearly conceptual system diagrams.
- Archivo throughout, with expressive headings and compact supporting metadata.
- Pale green and green charcoal system themes with restrained orange punctuation.
- Flat surfaces, fine rules, native disclosures, and limited liquid glass.
- Readable responsive layouts with visible keyboard focus and reduced-motion support.

## Colors

Muted green neutrals carry the interface; warm orange marks emphasis without competing with the work.

### Primary

- **Burnt orange / warm apricot** (`accent-text`): readable link emphasis, caret, and focus color.
- **Terracotta / soft copper** (`accent-mark`): punctuation in the name and wordmark, and the active-navigation underline.

### Neutral

- **Pale green paper / green charcoal** (`bg`): the page and solid navigation base.
- **Soft green paper / deep green shade** (`bg-subtle`): the about section’s tonal separation.
- **Inset green / lifted charcoal** (`surface`): fields and secondary-control hover fills.
- **Charcoal / pale sage ink** (`text`), **secondary ink** (`text-secondary`), and **muted ink** (`text-muted`): principal content, explanation, and supporting metadata.
- **Fine rule** (`border`) and **control edge** (`border-strong`): structural separation and input outlines.
- **Solid action** (`btn-bg`, `btn-fg`, `btn-bg-hover`): the primary action reverses from dark-on-light to light-on-dark.
- **Selection** (`selection-bg`, `selection-fg`): highlighted text retains a deliberately paired foreground.

### Feedback

- **Error red** (`negative`): invalid field outlines and error text.
- **Success green** (`positive`): confirmed contact-form success text.

The frontmatter gives each active color’s light value and its corresponding `-dark` value. The implementation selects the mode with `prefers-color-scheme: dark`; suffixes document the two values rather than introduce new runtime variables. Paired semantic variables remain the source used by components. Color metadata and eight-step display ramps live in the sidecar; synthesized ramps are previews, not additional implementation tokens.

**The Semantic Theme Rule.** Use the active semantic CSS variables for the interface. Keep product-image colors within their own showcase; they do not become a second site-wide accent palette.

## Typography

**Display and body font:** self-hosted Archivo, with Segoe UI and sans-serif fallbacks. The shipped regular and italic faces cover variable weights (100–900); only the observed roles in the frontmatter are normative here. Hind Mysuru is present in the font file but is not part of the active portfolio type system.

The hierarchy is fluid rather than a fixed modular ratio. Tighter tracking and moderate weights provide expression; ordinary body copy remains open and even. The `display` and `headline` roles are global starting points. Individual hero, contact, and case-study headings have responsive overrides and are not interchangeable global presets.

- **Display:** page-scale emphasis; the homepage name and case headings adjust the global role for their own line length.
- **Headline:** section introductions and larger narrative headings.
- **Title:** project captions; project-index titles scale independently with the row.
- **Body large:** introductory explanatory text.
- **Body:** normal reading text; supporting paragraphs often step down to (0.9375rem).
- **Label:** buttons and direct text actions.
- **Meta:** supporting technology and navigation information. Smaller image captions are local exceptions, not a default text size.

Metadata follows its heading. Labels use natural case; their job is orientation rather than decorative pre-heading treatment. Balanced headings and pretty-wrapped paragraphs support the reading rhythm.

**The Explicit Weight Rule.** Set Archivo’s weight explicitly. Its variable-font default is 600; unqualified font use can silently make supporting text too heavy.

## Layout

The shared container is centered and capped at (1240px), with the fluid `page-pad` inset. General sections use the `section` spacing value. Reading copy uses a normal measure of (68ch), with tighter blocks around (52ch); wide imagery is allowed to extend beyond those text measures. Recurring gaps and insets draw from the documented spacing scale.

The system accommodates broad media fields, two-column explanations, and fine-rule project rows. The homepage’s relative showcase sizes and PKI-first order are surface decisions, not requirements for new routes. Project-index and case-study layouts are different expressions of the same type, spacing, and border vocabulary.

| Media boundary | Implemented response |
| --- | --- |
| At or below 800px | Tighten showcase and about-grid gaps; adjust screenshot positioning and experience dates. |
| At or below 700px | Replace desktop navigation with the menu trigger; stack engineering and contact content; recompose the hero. |
| At or below 650px | Stack project-index rows and case-study columns; reflow the technology filter and supporting work rows. |
| At or below 600px | Stack homepage project and about grids; change the portrait from (4:5) to a square crop. |
| At or above 640px | Arrange the shared footer horizontally. |

The sticky header is (84px) tall on desktop and (72px) at its mobile boundary. Anchored sections account for the header; invalid contact fields scroll as an intact group so the label and error remain visible. The mobile drawer uses (100dvh), a width of `min(24rem, 88vw)`, and safe-area-aware bottom padding.

**The Reading Measure Rule.** Let imagery occupy broad fields while explanatory copy stays within a readable measure. Reflow columns when the content requires it; do not scale a desktop layout down as a single unit.

## Elevation & Depth

Flat fills and tonal separation establish most depth. Ordinary project rows and reading content rely on rules and spacing. Actual product captures carry a soft image shadow; the small project arrow controls add an inset highlight and diffuse lift when blur is supported. The navigation gains a fine lower rule after scrolling.

The scrolled header uses an (82%) background mix with a (16px) blur and (125%) saturation. Project arrow controls use a translucent white fill with a (12px) blur and (140%) saturation. Both have solid fallbacks. Exact shadow values are recorded only in the sidecar.

**The Limited Glass Rule.** Use translucent blur for the scrolled header and project arrow controls. Both retain solid backgrounds when backdrop filtering is unavailable or reduced transparency is requested.

State transitions use the shared decelerating curve. Controls use the standard duration; field borders use the fast duration. Showcase images ease over (700ms), and the homepage name settles over (850ms) only when motion is permitted. These longer effects belong to those media and entrance patterns. Reduced motion disables drawer transitions, nearly eliminates other animations and transitions, and restores instant scrolling.

## Shapes

Controls have gently rounded corners through `rounded.default`; broad media uses `rounded.lg`. Circular arrow controls use `rounded.circle`. Fine solid borders (1px) define controls and separate rows. Use the authored thin-stroke SVG vocabulary for arrows, close controls, and disclosure marks (1.5px on a 24-unit viewBox).

Product captures and diagrams keep their own clipping and internal geometry. The showcase arrow is (44px) on desktop and (36px) on small screens, but it is decoration inside the larger linked stage rather than a standalone mobile target. Regular buttons, navigation actions, and menu controls retain a minimum target height of (44px); contact inputs start at (48px).

## Components

### Buttons and text actions

Quiet and precise. Primary buttons use the paired solid-action colors; secondary buttons use a transparent fill and control-edge border. Both share the documented padding and gently rounded shape. Primary hover changes the fill; secondary hover adds the surface fill and a muted edge. The site-wide focus outline uses the semantic focus color (2px, offset 5px). Disabled primary actions reduce opacity; the contact submit action uses a waiting cursor during submission.

Text links retain inline arrows. Direct text actions keep a (44px) target and move their arrow slightly on hover; prose links underline with a subtle rule that becomes the accent color. Do not make the entire reading surface behave like a raised button.

### Fields and technology filtering

Plain filled controls with persistent labels. Contact fields use the inset surface, control-edge border, and documented padding. Placeholder text uses muted ink. Invalid controls keep their label, semantic red border, and associated message; the first invalid group is centered below the sticky header. A successful submission uses the positive color, and delivery failure offers a direct email link.

The technology filter is a labeled native select. It preserves native selection behavior, uses the page fill and the same control edge, and announces the resulting project count. The technology lists on projects are wrapping text metadata, not selectable pills.

### Navigation

A calm horizontal wordmark and link row, with the resume separated by a fine vertical rule. Active sections and hovered links gain an orange underline. The scrolled state uses the limited glass treatment above.

At the mobile boundary, a bordered square trigger opens a solid drawer over a dim scrim. The drawer traps focus, closes with Escape or the scrim, returns focus to the trigger, and is inert while closed. Its movement is removed for reduced motion.

### Project rows, media, and disclosures

The portfolio uses open project rows and media stages rather than a uniform enclosed card system. Each title precedes role and year metadata. Rows pair context with engineering detail and wrap into one column at the content boundary. Real screenshots and portrait images have purposeful crops, correct aspect ratios, and descriptive alternative text. Demo data is labeled visibly; conceptual diagrams remain identifiable as diagrams.

Native `details` and `summary` elements reveal engineering contributions, experience, and the contact form. A thin-stroke plus rotates (45deg) in the open state. Summary rows remain keyboard operable and inherit the global focus outline; expanded copy uses the same reading palette.

**The Evidence Before Decoration Rule.** Use real assets or labeled conceptual diagrams to explain the work. Keep controls quiet enough that the project remains the subject.

The sidecar contains ten representative, framework-free snippets: primary button, secondary button, text link, contact field, navigation, technology select, project row, technology metadata, engineering disclosure, and glass project arrow. Their classes are scoped for the design panel. Interactive application logic remains in the source components.

Source authority: `src/styles/tokens.css`, `global.css`, active section and UI styles, and the project routes. Final screenshots and the finish verdict are recorded under `.impeccable/review/`; shipping-image origins are in `asset-provenance.md`.

## Do's and Don'ts

### Do:

- Do use semantic colors so text, fields, borders, and controls adapt together to the operating-system theme.
- Do keep project titles before their smaller role and year metadata.
- Do preserve visible focus, native disclosure semantics, and the label–control–error relationship.
- Do label demo-data imagery and conceptual diagrams accurately.
- Do use the supplied portrait and verified product imagery, with provenance retained.

### Don't:

- Don't introduce gradients; the confirmed world uses flat color.
- Don't replace the real portrait with a generated avatar.
- Don't spread the localized glass treatment across reading surfaces.
- Don't turn a homepage arrangement, showcase hue, or screenshot angle into a rule for every page.
- Don't replace authored SVG interface icons with text glyphs or icon-font characters.
