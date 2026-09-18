export const SITE = {
  name: 'LIFT Baterie',
  legalName: 'FTU „LIFT” Dariusz Kozieł',
  tagline: 'Przywróć moc, nie kupuj nowych.',
  domain: 'https://lift-baterie.pl',
  phoneDisplay: '695 946 842',
  phoneHref: 'tel:+48695946842',
  email: 'kontakt@lift-baterie.pl',
  address: {
    street: 'Wojska Polskiego 7 lok. 5A',
    zip: '25-364',
    city: 'Kielce',
    region: 'świętokrzyskie',
  },
  geo: { lat: 50.8661, lng: 20.6286 },
  nip: '6581395539',
  regon: '290903504',
  foundingYear: 2009,

  gtmId: 'GTM-N5SMB285',
  cookieYesKey: '1963f26a38fdaf8f6732ff5533a298e6',
  gscVerification: 'W53ptc3d17CfjxdNvkYTf47mXSk8YQJBZgIOS32IOyA',

  // Public by design: the browser posts straight to Web3Forms, so the key ships in the page source
  // either way. Abuse is limited in the Web3Forms panel (allowed domains), not by hiding it.
  web3formsKey: '20d2eb84-a6b1-4241-9ec6-a9b178c537ef',
  googleReviewsUrl: '',
} as const;
