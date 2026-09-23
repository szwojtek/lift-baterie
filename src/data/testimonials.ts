/**
 * LFB-007 P5: three testimonials were pasted verbatim into two files each (the page they
 * belong to thematically, plus /realizacje's gallery of all cases) -- a text change in one
 * copy would silently drift from the other. Single source here; both call sites import from
 * it. Quote text unchanged character-for-character from what the customer said.
 */
export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export const testimonialUnimax: Testimonial = {
  quote: 'Prace zaplanowane w oknach serwisowych, produkcja nie stanęła. Wózki wróciły do pracy szybciej, niż zakładaliśmy.',
  author: 'Unimax, Kielce',
  context: 'Produkcja nie stanęła',
};

export const testimonialFirmaLogistyczna: Testimonial = {
  quote: 'Po audycie dostaliśmy jasną wycenę. Regeneracja obniżyła koszt o około 40% przy zachowaniu parametrów pracy baterii.',
  author: 'Firma logistyczna, Mazowsze',
  context: '−40% kosztu w tej realizacji',
};

export const testimonialOsmWloszczowa: Testimonial = {
  quote: 'Zrobiliście audyt i formatowanie baterii w oknach serwisowych, bez wstrzymywania załadunków. Po wdrożeniu zaleceń wózki pracują stabilnie także w chłodniach.',
  author: 'OSM Włoszczowa',
  context: 'Praca ciągła, także w chłodniach',
};
