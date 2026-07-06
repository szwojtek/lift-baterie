# lift-baterie

Strona lift-baterie.pl — Astro 5 + Tailwind CSS 4, statyczny build.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) publikuje stronę na GitHub Pages przy każdym pushu
do `main`. Konfiguracja środowiska (SITE_URL / BASE_PATH / flagi `PUBLIC_*`) znajduje się w pliku
workflow.
