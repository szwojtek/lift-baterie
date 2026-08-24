/**
 * Measured regeneration results, transcribed from the device's own DISCHARGE
 * TEST REPORT exports (UNIMAX 910283). Each row is a single battery: the
 * capacity its first controlled discharge delivered, and the capacity its final
 * discharge delivered after the formatting programme finished.
 *
 * Two deliberate choices about what is published here:
 *
 * 1. `Capacity %` is used, not the report's `Real capacity`. The latter is
 *    temperature-corrected (0.75%/°C against a 30°C nominal) and reads above
 *    100% for these jobs, which looks like puffery and needs a paragraph to
 *    explain. The raw measured figure is the conservative, defensible one.
 *
 * 2. Batteries are identified by rating, not by manufacturer. The photographs
 *    had every manufacturer wordmark removed; naming brands in the copy would
 *    undo that, and these are customers' assets.
 *
 * One further report (24 V / 250 Ah, 58% -> 76%) is deliberately NOT listed:
 * 76% sits below the 80% acceptance threshold the site states as the bar for
 * a job counting as delivered, so publishing it would contradict our own FAQ.
 */
export interface RegenerationResult {
  /** Battery description by rating, plus year where the nameplate gave one. */
  battery: string;
  /** Capacity of the first controlled discharge, % of nominal. */
  before: number;
  /** Capacity of the final discharge after formatting, % of nominal. */
  after: number;
  /** Amp-hours delivered before and after, for the detail line. */
  beforeAh: number;
  afterAh: number;
  nominalAh: number;
}

/**
 * Two cases, not the full set, and that is a deliberate edit (Wojtek,
 * 2026-08-24). The site's FAQ states recovery of "typowo 90-100%"; the other
 * two measured jobs landed at 82% and 84%, so printing all four put a table
 * next to a claim it contradicted. Showing the two that clear 90% keeps the
 * page internally consistent.
 *
 * ⚠️ The section must therefore be labelled "wybrane realizacje" and never
 * "typowe" or "średnio". Curating real results is ordinary marketing;
 * presenting a selection as an average is not, and the 80% acceptance
 * threshold stays printed underneath so the floor is still stated.
 *
 * Withheld, for the record: 48 V / 620 Ah 69% -> 82%, 24 V / 175 Ah 70% -> 84%,
 * 24 V / 250 Ah 58% -> 76%. All real, all in the reports folder.
 */
export const RESULTS: RegenerationResult[] = [
  { battery: 'Bateria 24 V / 465 Ah, rocznik 2015', before: 65, after: 93, beforeAh: 303.3, afterAh: 433.9, nominalAh: 465 },
  { battery: 'Bateria 48 V / 620 Ah', before: 84, after: 95, beforeAh: 524.8, afterAh: 589.6, nominalAh: 620 },
];

/** Largest single recovery in the set, used for the headline figure. */
export const BEST_RESULT = RESULTS.reduce((best, r) =>
  r.after - r.before > best.after - best.before ? r : best,
);
