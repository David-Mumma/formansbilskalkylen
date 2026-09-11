import type { FuelType } from './calculator';

export interface AffiliateOffer {
  id: string;
  name: string;
  tradeDoublerId?: number;
  trigger: (ctx: AffiliateContext) => boolean;
  cta: string;
  microtext: string;
  url: string;
  accentClass: string;
  badgeClass: string;
  icon: string;
}

export interface AffiliateContext {
  fuelType: FuelType;
  homeCharging: boolean;
  showPrivateComparison: boolean;
}

export const AFFILIATES: AffiliateOffer[] = [
  {
    id: 'compricer',
    name: 'Compricer',
    tradeDoublerId: 396315,
    trigger: (ctx) => ctx.showPrivateComparison,
    cta: 'Funderar du på att äga privat istället? Jämför bilförsäkring och sänk ägarkostnaden hos Compricer',
    microtext: 'Kostnadsfritt & ej bindande • Jämför 30+ bolag • BankID',
    url: 'https://www.compricer.se/bilforsakring',
    accentClass: 'border-emerald-300 bg-emerald-50',
    badgeClass: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    icon: 'shield',
  },
  {
    id: 'sambla',
    name: 'Sambla',
    trigger: (ctx) => ctx.showPrivateComparison,
    cta: 'Köpa loss eller privatleasa? Jämför billån från 4,95% hos Sambla',
    microtext: 'Ansök utan UC • Jämför 20+ långivare • Besked direkt',
    url: 'https://www.sambla.se/billan',
    accentClass: 'border-sky-300 bg-sky-50',
    badgeClass: 'text-sky-700 bg-sky-100 border-sky-200',
    icon: 'banknote',
  },
  {
    id: 'elskling',
    name: 'Elskling',
    tradeDoublerId: 41147,
    trigger: (ctx) => ctx.fuelType === 'electric' && ctx.homeCharging,
    cta: 'Laddar du tjänstebilen hemma? Jämför elavtal för billigare laddning hos Elskling',
    microtext: 'Kostnadsfritt • Byt på 5 minuter • Inget bindningstid',
    url: 'https://www.elskling.se/elavtal',
    accentClass: 'border-amber-300 bg-amber-50',
    badgeClass: 'text-amber-700 bg-amber-100 border-amber-200',
    icon: 'zap',
  },
];

export function getActiveAffiliates(ctx: AffiliateContext): AffiliateOffer[] {
  return AFFILIATES.filter((a) => a.trigger(ctx));
}

export const TRANSPARENCY_NOTICE =
  'Sidan innehåller samarbetslänkar. Kalkylatorn är helt kostnadsfri och oberoende.';
