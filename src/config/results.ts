/**
 * Measured regeneration results, transcribed from the device's own DISCHARGE
 * TEST REPORT exports. Each row is a single battery: the capacity its first
 * controlled discharge delivered, and the capacity its final discharge
 * delivered after the formatting programme finished.
 *
 * Three deliberate choices about what is published here:
 *
 * 1. `Capacity %` is used, not the report's `Real capacity`. The latter is
 *    temperature-corrected (0.75%/°C against a 30°C nominal) and reads above
 *    100% for some jobs (105% on the 465 Ah report), which looks like puffery
 *    and needs a paragraph to explain. The raw measured figure is the
 *    conservative, defensible one. The report graphic shows both fields
 *    exactly as the device prints them, so nothing is hidden: the customer's
 *    own reading of the 271 Ah job ("48% -> 96%") is the corrected pair.
 *
 * 2. Batteries are identified by rating, not by manufacturer. The photographs
 *    had every manufacturer wordmark removed; naming brands in the copy would
 *    undo that, and these are customers' assets. `check-content` bans the
 *    brand names that appear on the source reports.
 *
 * 3. The FAQ on the regeneration page no longer states a "typical" band of
 *    recovery. It is generated from this table (three real cases) plus the
 *    80% end-of-life line, because the measured set (93, 95, 84, 82, 84%)
 *    never supported "typowo 90-100%", and a band anchored on 80 reads, to a
 *    layperson, as the result rather than the floor (Wojtek, 2026-09-18).
 *
 * Withheld, for the record: 48 V / 620 Ah 69% -> 82%, 24 V / 175 Ah 70% -> 84%,
 * 24 V / 250 Ah 58% -> 76% (below the 80% line, so publishing it would
 * contradict our own footnote). All real, all in the reports folder.
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
  /** Discharge duration at the same current, before and after, where the report gives it. */
  beforeTime?: string;
  afterTime?: string;
  /** Discharge current in amps, rounded, for the time line. */
  currentA?: number;
}

/**
 * Order is display order. The 271 Ah job leads because it is the largest
 * recovery in the set and the one whose before-and-after report is shown
 * next to the table. 84% is below 90 and is published anyway: it clears the
 * 80% line, and hiding it would mean the table only ever showed the two best
 * cases while the FAQ described them as typical.
 */
export const RESULTS: RegenerationResult[] = [
  { battery: 'Bateria 24 V / 271 Ah, 4 monobloki 6 V', before: 35, after: 84, beforeAh: 96.1, afterAh: 227.8, nominalAh: 271, beforeTime: '1 h 47 min', afterTime: '4 h 14 min', currentA: 54 },
  { battery: 'Bateria 24 V / 465 Ah, rocznik 2015', before: 65, after: 93, beforeAh: 303.3, afterAh: 433.9, nominalAh: 465 },
  { battery: 'Bateria 48 V / 620 Ah', before: 84, after: 95, beforeAh: 524.8, afterAh: 589.6, nominalAh: 620 },
];

/** Largest single recovery in the set, used for the headline figures. */
export const BEST_RESULT = RESULTS.reduce((best, r) =>
  r.after - r.before > best.after - best.before ? r : best,
);

/** How many times more capacity the best case delivered after the job (227.8 / 96.1 = 2.37). */
export const GAIN_FACTOR = BEST_RESULT.afterAh / BEST_RESULT.beforeAh;

/** "2,4" for copy: one decimal, Polish comma. */
export const GAIN_FACTOR_LABEL = GAIN_FACTOR.toLocaleString('pl-PL', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * End-of-life line the industry uses for traction batteries. The site prints
 * it only as a floor in a second sentence, never as a headline figure: a
 * reader skimming "80%" takes it for the result (Wojtek, 2026-09-18).
 */
export const END_OF_LIFE_PCT = 80;

/**
 * The FAQ clause listing real cases, built here so the page cannot drift from
 * the table: "bateria, która oddawała 35% pojemności, po regeneracji oddaje
 * 84%; inna wróciła z 65% do 93%, kolejna z 84% do 95%".
 */
export function resultsSentence(): string {
  const [first, ...rest] = RESULTS;
  const head = `bateria, która oddawała ${first.before}% pojemności, po regeneracji oddaje ${first.after}%`;
  const tail = rest.map((r, i) => `${i === 0 ? 'inna wróciła' : 'kolejna'} z ${r.before}% do ${r.after}%`);
  return tail.length ? `${head}; ${tail.join(', ')}` : head;
}
