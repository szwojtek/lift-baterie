import type { ImageMetadata } from 'astro';

import heroRegenerationOnsite from '../assets/photos/hero-regeneration-onsite.jpg';
import workshopRegenerationBay from '../assets/photos/workshop-regeneration-bay.jpg';
import batteryNameplate from '../assets/photos/battery-nameplate.jpg';
import clampMeterDiagnostics from '../assets/photos/clamp-meter-diagnostics.jpg';
import openCellsDetail from '../assets/photos/open-cells-detail.jpg';
import batteryCellsTopview from '../assets/photos/battery-cells-topview.jpg';
import cellsConnectorsDetail from '../assets/photos/cells-connectors-detail.jpg';
import batteryInTruck from '../assets/photos/battery-in-truck.jpg';
import sulphatedBatteryBefore from '../assets/photos/sulphated-battery-before.jpg';

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
  },
  workshopRegenerationBay: {
    src: workshopRegenerationBay,
    alt: 'Stanowisko regeneracji baterii trakcyjnych: cztery urządzenia w pracy, ogniwa w komorze serwisowej i laptop z zapisem pomiarów',
    caption: 'Stanowisko regeneracji — cykle prowadzone równolegle na kilku bateriach.',
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
    caption: 'Przegląd ogniwo po ogniwie — korki zdjęte, poziom i gęstość elektrolitu sprawdzane osobno.',
  },
  batteryCellsTopview: {
    src: batteryCellsTopview,
    alt: 'Bateria trakcyjna widziana z góry: korki ogniw i łączniki międzyogniwowe',
  },
  cellsConnectorsDetail: {
    src: cellsConnectorsDetail,
    alt: 'Zbliżenie na łączniki międzyogniwowe i korki ogniw baterii trakcyjnej',
  },
  batteryInTruck: {
    src: batteryInTruck,
    alt: 'Bateria trakcyjna zamontowana w wózku widłowym, obok wskaźnik naładowania',
  },
  sulphatedBatteryBefore: {
    src: sulphatedBatteryBefore,
    alt: 'Zaniedbana bateria trakcyjna z nalotem siarczanu na łącznikach, stan przed regeneracją',
    caption: 'Stan przy przyjęciu: nalot na łącznikach i zasiarczone ogniwa.',
  },
} satisfies Record<string, Photo>;
