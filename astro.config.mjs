import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL / BASE_PATH are injected by the deploy workflow:
// - GitHub Pages preview: SITE_URL=https://szwojtek.github.io, BASE_PATH=/lift-baterie
// - Production (custom domain): defaults below (https://lift-baterie.pl, /)
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://lift-baterie.pl',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'never',
  build: {
    // 'file' => /sciezka.html served as /sciezka on GitHub Pages (clean URLs, no trailing slash)
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/dziekujemy') && !page.includes('/404'),
      serialize: (item) => {
        // build.format 'file' emits .html suffixes; sitemap must list the clean served URLs
        item.url = item.url.replace(/index\.html$/, '').replace(/\.html$/, '');
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
