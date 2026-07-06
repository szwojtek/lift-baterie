import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    /** Money page the article funnels to, as a site-absolute path. */
    ctaPath: z.string().default('/bezplatny-audyt'),
  }),
});

export const collections = { blog };
