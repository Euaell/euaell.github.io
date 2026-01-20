import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.euaell.me',
  output: 'hybrid',  // Pre-render pages, SSR for API routes
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
