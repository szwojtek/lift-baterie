const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an absolute site path with the configured base path (GitHub Pages preview vs production). */
export const href = (path: string): string => `${base}${path.startsWith('/') ? path : `/${path}`}`;
