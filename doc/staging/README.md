# Design staging area

Drop raw material for the UI redesign here. **The payload folders are gitignored**, so
nothing you place in them reaches git history — only the `README.md` files and anything
`tools/` produces from them are tracked.

The whole `doc/` tree is exempted from the repo's aggressive `*.` ignore rule, so you can
see and edit these files normally in your editor and file explorer.

## Where things go

| Folder | Put here | Examples |
|---|---|---|
| `colors/` | Palette references — swatches, screenshots of palettes, hex lists, brand links | `palette.png`, `brand.md`, a Coolors/Radix export |
| `images/` | Avatars, headshots, project screenshots, logos | `headshot.jpg`, `distro-kv.png` |
| `resume/` | Updated résumé files, in any format | `resume.pdf`, `resume.md`, `resume.docx` |
| `references/` | Sites whose look you admire, with notes on *what* you like | `refs.md`, screenshots |
| `notes/` | Anything else — copy changes, section ideas, must-haves | `notes.md`, `wants.md` |
| `tools/` | Working space for extraction/organisation scripts | *(I own this folder)* |

## What I will do with it

1. Read everything you drop in.
2. Extract and organise it — for example, pull an accurate palette out of a screenshot and
   turn it into theme tokens, resize and optimise avatars, normalise résumé content into
   the existing `src/data/*.ts` shapes.
3. Move final, optimised assets into `src/assets/`, and delete the oversized originals from
   `public/images/`.
4. Report what I found and where each piece landed before building any UI on top of it.

## Notes for me

- `references/` matters more than it looks: note *why* a site appeals, not just the URL.
  "Clean" and "impressive" are directions, and the specifics decide the design.
- Current content in `src/data/` is already broadly in sync with
  `doc/Euael_Eshete_CV_04_01_2026.md`, so a résumé update is likely to be additive.
- The site currently has **no résumé file** in `public/`, and `FloatingResumeButton.astro`
  is imported but unused in `src/pages/projects.astro`. A résumé drop resolves both.
