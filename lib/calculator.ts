export type FuelType = 'electric' | 'hybrid' | 'gasoline' | 'diesel';
export type DeductionType = 'brutto' | 'netto';
export type CalcMode = 'direct' | 'quick';

export interface CalculatorInput {
  mode: CalcMode;
  fuelType: FuelType;
  carPrice: number;
  benefitValue: number;
  taxRate: number;
  deductionType: DeductionType;
  nettoDeduction: number;
  hasFuelBenefit: boolean;
  homeCharging: boolean;
}

export interface CalculatorResult {
  benefitValueMonthly: number;
  benefitValueAnnual: number;
  fuelBenefitMonthly: number;
  fuelBenefitAnnual: number;
  taxableBenefitMonthly: number;
  monthlyNetCost: number;
  annualNetCost: number;
  privateCarMonthly: number;
  privateCarAnnual: number;
  savings: number;
  pensionImpact: boolean;
  sgiImpact: boolean;
}

export const PBB_2026 = 61500;
export const BASE_AMOUNT_ANNUAL = 25000;
export const SLR_PLUS_1 = 0.03;
export const SEVEN_FIVE_PBB = PBB_2026 * 7.5;

export const FUEL_LABELS: Record<FuelType, string> = {
  electric: 'Ren Elbil',
  hybrid: 'Laddhybrid',
  gasoline: 'Bensin',
  diesel: 'Diesel',
};

export const FUEL_MARKET_VALUES: Record<FuelType, number> = {
  electric: 800,
  hybrid: 1200,
  gasoline: 1800,
  diesel: 1600,
};

export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  input: Partial<CalculatorInput>;
}

export const PRESETS: Preset[] = [
  {
    id: 'elbil',
    name: 'Populär Elbil',
    description: 'Tjänstebil · 550 000 kr · 50% marginalskatt',
    icon: 'electric',
    input: {
      mode: 'direct',
      fuelType: 'electric',
      carPrice: 550000,
      benefitValue: 5400,
      taxRate: 50,
      deductionType: 'brutto',
      nettoDeduction: 0,
      hasFuelBenefit: false,
      homeCharging: true,
    },
  },
  {
    id: 'hybrid',
    name: 'Kombi Hybrid',
    description: 'Standard · 420 000 kr · 32% marginalskatt',
    icon: 'hybrid',
    input: {
      mode: 'direct',
      fuelType: 'hybrid',
      carPrice: 420000,
      benefitValue: 6100,
      taxRate: 32,
      deductionType: 'brutto',
      nettoDeduction: 0,
      hasFuelBenefit: false,
      homeCharging: false,
    },
  },
  {
    id: 'premium',
    name: 'Premiumsugen',
    description: 'Företagsledaren · 850 000 kr · 50% + nettolöneavdrag',
    icon: 'gasoline',
    input: {
      mode: 'direct',
      fuelType: 'gasoline',
      carPrice: 850000,
      benefitValue: 10500,
      taxRate: 50,
      deductionType: 'netto',
      nettoDeduction: 3000,
      hasFuelBenefit: true,
      homeCharging: false,
    },
  },
];

export function estimateBenefitValue(price: number, fuelType: FuelType): number {
  const basePart = BASE_AMOUNT_ANNUAL;
  const interestPart = SLR_PLUS_1 * price;
  const pricePart =
    price <= SEVEN_FIVE_PBB
      ? 0.13 * price
      : 0.13 * SEVEN_FIVE_PBB + 0.2 * (price - SEVEN_FIVE_PBB);

  let annual = basePart + interestPart + pricePart;

  if (fuelType === 'electric') {
    const fossilComparison = BASE_AMOUNT_ANNUAL + SLR_PLUS_1 * (price * 0.8) + 0.13 * (price * 0.8);
    const reduction = Math.min(annual * 0.5, Math.max(0, annual - fossilComparison * 0.6));
    annual = annual - reduction;
  } else if (fuelType === 'hybrid') {
    annual = annual * 0.75;
  }

  return Math.round(annual / 12);
}

export function calculate(input: CalculatorInput): CalculatorResult {
  const benefitValueMonthly =
    input.mode === 'direct'
      ? input.benefitValue
      : estimateBenefitValue(input.carPrice, input.fuelType);

  const benefitValueAnnual = benefitValueMonthly * 12;

  const fuelBenefitMonthly = input.hasFuelBenefit
    ? Math.round(FUEL_MARKET_VALUES[input.fuelType] * 1.2)
    : 0;
  const fuelBenefitAnnual = fuelBenefitMonthly * 12;

  let taxableBenefitMonthly = benefitValueMonthly + fuelBenefitMonthly;

  let monthlyNetCost: number;
  let pensionImpact = false;
  let sgiImpact = false;

  if (input.deductionType === 'netto' && input.nettoDeduction > 0) {
    const deduction = Math.min(input.nettoDeduction, benefitValueMonthly);
    taxableBenefitMonthly = benefitValueMonthly - deduction + fuelBenefitMonthly;
    const taxOnBenefit = taxableBenefitMonthly * (input.taxRate / 100);
    monthlyNetCost = taxOnBenefit + deduction;
  } else {
    const taxOnBenefit = taxableBenefitMonthly * (input.taxRate / 100);
    monthlyNetCost = taxOnBenefit;
    if (benefitValueMonthly > 8000) {
      pensionImpact = true;
      sgiImpact = true;
    }
  }

  const annualNetCost = monthlyNetCost * 12;

  const privateCarMonthly = estimatePrivateCarCost(input.carPrice, input.fuelType);
  const privateCarAnnual = privateCarMonthly * 12;
  const savings = privateCarMonthly - monthlyNetCost;

  return {
    benefitValueMonthly,
    benefitValueAnnual,
    fuelBenefitMonthly,
    fuelBenefitAnnual,
    taxableBenefitMonthly,
    monthlyNetCost: Math.round(monthlyNetCost),
    annualNetCost: Math.round(annualNetCost),
    privateCarMonthly: Math.round(privateCarMonthly),
    privateCarAnnual: Math.round(privateCarAnnual),
    savings: Math.round(savings),
    pensionImpact,
    sgiImpact,
  };
}

export function estimatePrivateCarCost(price: number, fuelType: FuelType): number {
  const depreciation = (price * 0.15) / 12;
  const insurance = 1000;
  const vehicleTax = fuelType === 'electric' ? 80 : 150;
  const fuel = FUEL_MARKET_VALUES[fuelType];
  const maintenance = 600;
  const financing = (price * 0.05) / 12;

  return depreciation + insurance + vehicleTax + fuel + maintenance + financing;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(value);
}

export function inputToParams(input: CalculatorInput): Record<string, string> {
  return {
    mode: input.mode,
    fuel: input.fuelType,
    price: String(input.carPrice),
    benefit: String(input.benefitValue),
    tax: String(input.taxRate),
    ded: input.deductionType,
    netto: String(input.nettoDeduction),
    fuelben: String(input.hasFuelBenefit),
    home: String(input.homeCharging),
  };
}

export function paramsToInput(params: URLSearchParams): Partial<CalculatorInput> {
  const result: Partial<CalculatorInput> = {};
  const mode = params.get('mode');
  const fuel = params.get('fuel');
  const price = params.get('price');
  const benefit = params.get('benefit');
  const tax = params.get('tax');
  const ded = params.get('ded');
  const netto = params.get('netto');
  const fuelben = params.get('fuelben');
  const home = params.get('home');

  if (mode === 'direct' || mode === 'quick') result.mode = mode;
  if (fuel && ['electric', 'hybrid', 'gasoline', 'diesel'].includes(fuel))
    result.fuelType = fuel as FuelType;
  if (price) result.carPrice = Number(price) || 0;
  if (benefit) result.benefitValue = Number(benefit) || 0;
  if (tax) result.taxRate = Number(tax) || 32;
  if (ded === 'brutto' || ded === 'netto') result.deductionType = ded;
  if (netto) result.nettoDeduction = Number(netto) || 0;
  if (fuelben) result.hasFuelBenefit = fuelben === 'true';
  if (home) result.homeCharging = home === 'true';

  return result;
}

export const DEFAULT_INPUT: CalculatorInput = {
  mode: 'direct',
  fuelType: 'electric',
  carPrice: 550000,
  benefitValue: 5400,
  taxRate: 50,
  deductionType: 'brutto',
  nettoDeduction: 0,
  hasFuelBenefit: false,
  homeCharging: true,
};
