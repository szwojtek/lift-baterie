import type { ImageMetadata } from 'astro';

import batteryUnderRegeneration from '../assets/photos/battery-under-regeneration.jpg';
import batteryNameplate from '../assets/photos/battery-nameplate.jpg';
import clampMeterDiagnostics from '../assets/photos/clamp-meter-diagnostics.jpg';
import openCellsDetail from '../assets/photos/open-cells-detail.jpg';
import batteryCellsTopview from '../assets/photos/battery-cells-topview.jpg';
import cellsConnectorsDetail from '../assets/photos/cells-connectors-detail.jpg';
import batteryInTruck from '../assets/photos/battery-in-truck.jpg';
import sulphatedBatteryBefore from '../assets/photos/sulphated-battery-before.jpg';
import dischargeReport from '../assets/photos/discharge-report.jpg';
import cellTopsBefore from '../assets/photos/cell-tops-before.jpg';
import cellTopsAfter from '../assets/photos/cell-tops-after.jpg';
import heroIndexRegeneracja from '../assets/photos/hero-index-regeneracja.jpg';
import heroServis from '../assets/photos/hero-serwis.jpg';
import heroFormatowanie from '../assets/photos/hero-formatowanie.jpg';
import heroSzkolenia from '../assets/photos/hero-szkolenia.jpg';
import heroBezplatnaKonsultacja from '../assets/photos/hero-bezplatna-konsultacja.jpg';

export interface Photo {
  src: ImageMetadata;
  /** Describes what is in frame, for screen readers and for image search. */
  alt: string;
  /** Optional visible caption; omit where the photo is decorative in context. */
  caption?: string;
  /**
   * Where the subject sits in the frame, 0-100 on each axis, used as the hero backdrop's
   * `object-position` (LFB-005 Position 2). Only matters where the hero box's own aspect
   * departs from the photo's 2.2:1 export -- the 640-1023 band, the phone crop and `compact` --
   * `sm+` at 1024px+ shows the file close to its native ratio, so this rarely moves anything
   * there. Starting values from the LFB-005 analysis; correct after the review sheet.
   */
  focus?: { x: number; y: number };
}

/**
 * Every photo is our own documentation from real service jobs. Manufacturer
 * wordmarks were removed in post per BRIEF_ZDJECIA_LIFT_BATERIE.md rule 2, so
 * no alt text names equipment brands either — describing the hardware by type
 * and rating keeps the copy consistent with the retouched frames.
 */
export const PHOTOS = {
  /**
   * Replaced the workshop-bay frame the customer withdrew on 2026-09-17 (LFB-001).
   * The device's model wordmark behind the laptop is masked in post.
   */
  batteryUnderRegeneration: {
    src: batteryUnderRegeneration,
    alt: 'Bateria trakcyjna z podpiętymi przewodami urządzenia do regeneracji, obok laptop z zapisem cyklu',
    caption: 'Regeneracja w toku. Urządzenie prowadzi cykle, laptop zapisuje każdy z nich.',
  },
  batteryNameplate: {
    src: batteryNameplate,
    alt: 'Tabliczka znamionowa baterii trakcyjnej: 48 V, 775 Ah, 24 ogniwa, rok produkcji 2016',
    caption: 'Bateria z 2016 roku, wciąż w pracy. Dane z tabliczki trafiają do raportu.',
  },
  clampMeterDiagnostics: {
    src: clampMeterDiagnostics,
    alt: 'Pomiar prądu miernikiem cęgowym na ogniwach baterii trakcyjnej podczas diagnostyki',
    caption: 'Diagnostyka: pomiar na ogniwach przed decyzją o regeneracji.',
  },
  openCellsDetail: {
    src: openCellsDetail,
    alt: 'Odkryte ogniwa baterii trakcyjnej ze zdjętymi korkami podczas przeglądu serwisowego',
    caption: 'Przegląd ogniwo po ogniwie. Korki zdjęte, poziom i gęstość elektrolitu sprawdzamy osobno.',
  },
  batteryCellsTopview: {
    src: batteryCellsTopview,
    alt: 'Bateria trakcyjna widziana z góry: korki ogniw i łączniki międzyogniwowe',
    caption: 'Pakiet trakcyjny w wózku. Każde ogniwo mierzymy osobno.',
  },
  cellsConnectorsDetail: {
    src: cellsConnectorsDetail,
    alt: 'Zbliżenie na łączniki międzyogniwowe i korki ogniw baterii trakcyjnej',
    caption: 'Łączniki międzyogniwowe. Podwyższona rezystancja na połączeniu grzeje i zjada pojemność.',
  },
  /**
   * The source is a portrait, top-down shot. It is turned 90 degrees clockwise rather than cropped:
   * a 16:9 band cut from it kept under half the frame, and an upright frame broke the full-width
   * landscape slot every content photo uses. Top-down means no horizon, and turned this way the
   * truck's charge indicator reads upright. The label's wordmark, serial, barcode and part number
   * are blurred in post; the cell type designation stays legible, as on batteryNameplate.
   */
  batteryInTruck: {
    src: batteryInTruck,
    alt: 'Bateria trakcyjna zamontowana w wózku widłowym, obok wskaźnik naładowania',
    caption: 'Serwis na miejscu. Bateria zostaje w wózku, magazyn pracuje dalej.',
  },
  sulphatedBatteryBefore: {
    src: sulphatedBatteryBefore,
    alt: 'Zaniedbana bateria trakcyjna z nalotem siarczanu na łącznikach, stan przed regeneracją',
    caption: 'Stan przy przyjęciu: nalot na łącznikach i zasiarczone ogniwa.',
  },
  /**
   * A real report rendered from the device's own PDF export, not a photograph
   * of a printout: the first controlled discharge ("Przed") over the final one
   * ("Po") of the same 24 V / 271 Ah battery. The crop starts below the device
   * logo, the device-id header and both company blocks; inside the crop the
   * manufacturer and the serial number are redacted. Both capacity fields stay
   * as the device prints them (raw and temperature-corrected).
   */
  dischargeReport: {
    src: dischargeReport,
    alt: 'Raport testu rozładowania baterii trakcyjnej 24 V 271 Ah: 35% pojemności znamionowej przed regeneracją i 84% po niej',
    caption: 'Raport z urządzenia, przed i po. Taki dokument dostaje klient po każdej usłudze.',
  },
  /**
   * IMG_7171 / IMG_7172, 21.09.2026. Wojtek confirmed (STATE.md, 2026-09-22):
   * same battery; the "after" frame is post-COMPLETED regeneration, not just
   * the Phase 2 cleaning step that precedes desulfatation. Captions say only
   * that. Cropped and paired with artifacts/lift-baterie/LFB-003/scripts/
   * make_cell_tops_photos.py; no manufacturer marks were visible to redact.
   */
  cellTopsBefore: {
    src: cellTopsBefore,
    alt: 'Zabrudzone, zasiarczone pokrywy ogniw baterii trakcyjnej przed regeneracją',
    // Not "Ta sama bateria, przed regeneracją" — the section heading right
    // above this pair already says "Ta sama bateria, przed i po" (code review).
    caption: 'Przed regeneracją.',
  },
  cellTopsAfter: {
    src: cellTopsAfter,
    alt: 'Czyste pokrywy ogniw tej samej baterii trakcyjnej po zakończonej regeneracji',
    caption: 'Po zakończonej regeneracji.',
  },
  /**
   * Hero-only crops (LFB-005 Position 2), cut fresh from the full-resolution originals at the
   * hero box's own 2.2:1 instead of reusing the content-column files above (those cap out at
   * 1800-2000px, below the >=2200px a zoomed hero crop needs to stay sharp). Crop boxes:
   * artifacts/lift-baterie/LFB-005/scripts/make_hero_crops.py. Wordmarks on the index, serwis and
   * bezplatna-konsultacja heroes (and on batteryUnderRegeneration / clampMeterDiagnostics) are
   * removed letter by letter, not covered with patches: artifacts/lift-baterie/LFB-002/retouch/.
   */
  heroIndexRegeneracja: {
    src: heroIndexRegeneracja,
    alt: 'Urządzenie do regeneracji baterii trakcyjnych podłączone do wózka widłowego w hali klienta, obok laptop z wykresem cyklu ładowania',
    focus: { x: 72, y: 40 },
  },
  heroServis: {
    src: heroServis,
    alt: 'Urządzenie do regeneracji i laptop na palecie obok wózka wysokiego składowania w hali klienta',
    focus: { x: 65, y: 80 },
  },
  /**
   * Source identified visually (red paint mark + the EXTREME-HEAT warning device in frame),
   * not by pixel-exact match against the existing repo crop -- see the script docstring and
   * artifacts/lift-baterie/LFB-005/README.md for the confidence note.
   */
  heroFormatowanie: {
    src: heroFormatowanie,
    alt: 'Bateria trakcyjna widziana z góry: korki ogniw i łączniki międzyogniwowe',
    focus: { x: 65, y: 50 },
  },
  /** Source identified visually (same battery/session as heroFormatowanie's source frame). */
  heroSzkolenia: {
    src: heroSzkolenia,
    alt: 'Zbliżenie na łączniki międzyogniwowe i korki ogniw baterii trakcyjnej',
    focus: { x: 70, y: 50 },
  },
  heroBezplatnaKonsultacja: {
    src: heroBezplatnaKonsultacja,
    alt: 'Pomiar prądu miernikiem cęgowym na ogniwach baterii trakcyjnej podczas diagnostyki',
    focus: { x: 80, y: 95 },
  },
} satisfies Record<string, Photo>;
