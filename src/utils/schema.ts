import { SITE } from '../config/site';

interface ServiceOpts {
  name: string;
  description: string;
  path: string;
}

export const serviceSchema = ({ name, description, path }: ServiceOpts) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: name,
  url: `${SITE.domain}${path}`,
  areaServed: 'PL',
  provider: { '@id': `${SITE.domain}/#business` },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE.domain}${item.path}`,
  })),
});

interface ArticleOpts {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}

export const articleSchema = ({ title, description, path, datePublished }: ArticleOpts) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished,
  inLanguage: 'pl-PL',
  mainEntityOfPage: `${SITE.domain}${path}`,
  author: { '@type': 'Organization', name: SITE.name, url: SITE.domain },
  publisher: { '@id': `${SITE.domain}/#business` },
});
