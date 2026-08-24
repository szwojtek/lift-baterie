#!/usr/bin/env node
/**
 * Sweeps the BUILT site for content that should no longer be anywhere.
 *
 * Why this exists: decisions about copy kept getting applied to the first place
 * they appeared and missed elsewhere. Em dashes came back into a codebase that
 * had been cleaned to zero; withheld measurement figures were assumed gone
 * because one page looked right. Both are mechanical to check and neither was
 * caught by `astro build`, which only cares that the site compiles.
 *
 * It reads `dist/`, not `src/`, because that is where the decisions are
 * actually observable: a value can reach the page from config, from a
 * component, or from an article, and only the output shows all three.
 *
 * Run: npm run check   (after npm run build)
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

/** Text that must not appear in any rendered page, with the reason why. */
const BANNED = [
  {
    pattern: /—/g,
    label: 'długa pauza (—)',
    why: 'PLAN_LIFT_BATERIE_MYSLNIKI: zero w treści widocznej. Popraw przebudową zdania, nie podmianą znaku.',
  },
  {
    pattern: /\bTODO\b|\bFIXME\b|Lorem ipsum|wkrótce dostępne/gi,
    label: 'placeholder',
    why: 'Niedokończona treść nie może trafić na produkcję.',
  },
  {
    pattern: /430,9 Ah|509 Ah|123,4 Ah|148 Ah|190,1 Ah|145,5 Ah/g,
    label: 'wycofany wynik pomiaru',
    why: 'src/config/results.ts publikuje wyłącznie wybrane realizacje (65→93, 84→95). Reszta jest świadomie wstrzymana.',
  },
  {
    pattern: /druga sztuka/g,
    label: 'etykieta wycofanego wyniku',
    why: 'Pozostałość po pełnej liście wyników.',
  },
  {
    pattern: /HOFFMANN|Jungheinrich|ACCUMULATOREN|MARATHOM/gi,
    label: 'marka producenta sprzętu',
    why: 'BRIEF_ZDJECIA reguła 2: żadna nazwa producenta nie może być czytelna.',
  },
  {
    pattern: /UNIMAX filia|Brodzicki/gi,
    label: 'dane klienta końcowego',
    why: 'Dane z raportów muszą być zamaskowane przed publikacją.',
  },
];

/** Pages allowed to carry no photograph, with the reason. */
const NO_PHOTO_OK = new Set([
  '404.html',
  'dziekujemy.html',
  'kontakt.html',
  'privacy-policy.html',
  'baza-wiedzy.html',
  'regeneracja-akumulatorow-ciezarowych.html', // designed stat band instead; no lorry frame exists yet
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function visibleText(html) {
  // Drop script/style bodies and tags, so we test what a reader sees.
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

if (!existsSync(DIST)) {
  console.error(`✗ brak katalogu ${DIST}/. Uruchom najpierw: npm run build`);
  process.exit(2);
}

const pages = walk(DIST);
const problems = [];

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const text = visibleText(html);
  const name = relative(DIST, page).replace(/\\/g, '/');

  for (const rule of BANNED) {
    const hits = text.match(rule.pattern);
    if (hits) {
      problems.push({ name, label: rule.label, count: hits.length, why: rule.why });
    }
  }

  if (/<img[^>]+src=(""|'')/.test(html)) {
    problems.push({ name, label: 'pusty <img src>', count: 1, why: 'Slot bez obrazu wygląda jak zepsuta strona.' });
  }

  // Two <img> is the baseline: the logo in the header and in the footer.
  const imgCount = (html.match(/<img/g) || []).length;
  const base = name.split('/').pop();
  if (imgCount <= 2 && !NO_PHOTO_OK.has(base) && !name.startsWith('baza-wiedzy/')) {
    problems.push({
      name,
      label: 'strona bez zdjęcia',
      count: 0,
      why: 'Podstrona usługowa bez zdjęcia odstaje od sąsiednich. Dodaj zdjęcie albo dopisz ją do NO_PHOTO_OK z powodem.',
    });
  }
}

// --- mixed captioning inside one page ---------------------------------------
// A grid where some frames carry a caption and some do not reads as unfinished.
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const name = relative(DIST, page).replace(/\\/g, '/');
  const figures = html.match(/<figure[\s\S]*?<\/figure>/g) || [];
  const withImg = figures.filter((f) => /<img/.test(f));
  if (withImg.length < 2) continue;
  const captioned = withImg.filter((f) => /<figcaption/.test(f)).length;
  if (captioned !== 0 && captioned !== withImg.length) {
    problems.push({
      name,
      label: 'niespójne podpisy zdjęć',
      count: withImg.length - captioned,
      why: `${captioned} z ${withImg.length} zdjęć ma podpis. Albo wszystkie, albo żadne.`,
    });
  }
}

// --- the same copy repeated across pages ------------------------------------
// Shared navigation, the CTA band, the contact form and article teasers are
// meant to repeat. Body copy is not: the results block was pasted onto four
// pages and read as padding to anyone browsing between them.
const SHARED_OK = [
  'Telefon odbiera technik',          // CTA band
  'Liczba baterii / pojazdów',        // contact form
  'Imię i nazwisko Firma Telefon',    // contact form
  'Czytaj →',                         // article teasers
  'Czytaj także',
];

const sentenceIndex = new Map();
for (const page of pages) {
  const name = relative(DIST, page).replace(/\\/g, '/');
  const text = readFileSync(page, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  for (const s of text.split(/(?<=[.?!])\s+/)) {
    const t = s.trim();
    if (t.length < 60) continue;
    if (SHARED_OK.some((ok) => t.includes(ok))) continue;
    if (!sentenceIndex.has(t)) sentenceIndex.set(t, new Set());
    sentenceIndex.get(t).add(name);
  }
}
for (const [sentence, on] of sentenceIndex) {
  if (on.size >= 3) {
    problems.push({
      name: [...on].join(', '),
      label: 'ta sama treść na 3+ stronach',
      count: on.size,
      why: `„${sentence.slice(0, 70)}…" Wydziel wariant skrócony albo zostaw blok na jednej stronie.`,
    });
  }
}

console.log(`Sprawdzono ${pages.length} stron w ${DIST}/`);

if (problems.length === 0) {
  console.log('✓ czysto');
  process.exit(0);
}

const byLabel = new Map();
for (const p of problems) {
  if (!byLabel.has(p.label)) byLabel.set(p.label, { why: p.why, hits: [] });
  byLabel.get(p.label).hits.push(`${p.name}${p.count ? ` (${p.count}×)` : ''}`);
}

for (const [label, { why, hits }] of byLabel) {
  console.error(`\n✗ ${label}`);
  console.error(`  ${why}`);
  for (const h of hits) console.error(`    - ${h}`);
}
console.error(`\nRAZEM: ${problems.length} znalezisk`);
process.exit(1);
