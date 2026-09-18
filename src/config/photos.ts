import type { ImageMetadata } from 'astro';

import heroRegenerationOnsite from '../assets/photos/hero-regeneration-onsite.jpg';
import batteryUnderRegeneration from '../assets/photos/battery-under-regeneration.jpg';
import hallRegenerationWide from '../assets/photos/hall-regeneration-wide.jpg';
import batteryNameplate from '../assets/photos/battery-nameplate.jpg';
import clampMeterDiagnostics from '../assets/photos/clamp-meter-diagnostics.jpg';
import openCellsDetail from '../assets/photos/open-cells-detail.jpg';
import batteryCellsTopview from '../assets/photos/battery-cells-topview.jpg';
import cellsConnectorsDetail from '../assets/photos/cells-connectors-detail.jpg';
import batteryInTruck from '../assets/photos/battery-in-truck.jpg';
import sulphatedBatteryBefore from '../assets/photos/sulphated-battery-before.jpg';
import dischargeReport from '../assets/photos/discharge-report.jpg';

export interface Photo {
  src: ImageMetadata;
  /** Describes what is in frame, for screen readers and for image search. */
  alt: string;
  /** Optional visible caption; omit where the photo is decorative in context. */
  caption?: string;
}

/**
 * Every photo is our own documentation from real service jobs. Manufacturer
 * wordmarks were removed in post per BRIEF_ZDJECIA_LIFT_BATERIE.md rule 2, so
 * no alt text names equipment brands either — describing the hardware by type
 * and rating keeps the copy consistent with the retouched frames.
 */
export const PHOTOS = {
  heroRegenerationOnsite: {
    src: heroRegenerationOnsite,
    alt: 'Urządzenie do regeneracji baterii trakcyjnych podłączone do wózka widłowego w hali klienta, obok laptop z wykresem cyklu ładowania',
    caption: 'Regeneracja u klienta na hali. Urządzenie pracuje przy wózku, laptop zapisuje przebieg cyklu.',
  },
  /**
   * Replaced the workshop-bay frame the customer withdrew on 2026-09-17 (LFB-001).
   * The device's model wordmark behind the laptop is masked in post.
   */
  batteryUnderRegeneration: {
    src: batteryUnderRegeneration,
    alt: 'Bateria trakcyjna z podpiętymi przewodami urządzenia do regeneracji, obok laptop z zapisem cyklu',
    caption: 'Regeneracja w toku. Urządzenie prowadzi cykle, laptop zapisuje każdy z nich.',
  },
  /** Wide hall frame for the service hero; the manufacturer wordmark on the unit is masked in post. */
  hallRegenerationWide: {
    src: hallRegenerationWide,
    alt: 'Urządzenie do regeneracji i laptop na palecie obok wózka wysokiego składowania w hali klienta',
    caption: 'Serwis u klienta: urządzenie staje przy wózku, hala pracuje dalej.',
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
} satisfies Record<string, Photo>;
