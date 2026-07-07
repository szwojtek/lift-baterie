import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Shorter variant for the <title> tag when the H1 title exceeds ~60 chars. */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    /** Money page the article funnels to, as a site-absolute path. */
    ctaPath: z.string().default('/bezplatny-audyt'),
  }),
});

export const collections = { blog };
