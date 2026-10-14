# Portfolio

Personal portfolio of Euael M. Eshete, live at [portfolio.euaell.me](https://portfolio.euaell.me).

Built with [Astro](https://astro.build), Tailwind CSS v4 and a few React islands, served by the Astro Node adapter.

## Development

```bash
bun install
cp .env.example .env   # only needed to test the contact form
bun run dev            # http://localhost:4321
```

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `bun run dev`     | Start the dev server              |
| `bun run check`   | Type check `.astro`, `.ts`, `.tsx` |
| `bun run build`   | Production build into `dist/`     |
| `bun run preview` | Serve the production build        |

## Layout

- `src/data/` holds all content (profile, experience, projects, skills). Edit these to update the site.
- `src/components/sections/` are the homepage sections; `src/components/ui/` are shared pieces.
- `src/styles/global.css` holds the Tailwind theme tokens and custom utilities (`glass-*`, `btn-*`, `reveal`).
- `src/pages/api/contact.ts` is the contact form endpoint.

Deployment is described in [doc/DEPLOYMENT.md](doc/DEPLOYMENT.md).
