'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Fuel,
  BatteryCharging,
  Car,
  TrendingDown,
  TrendingUp,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Leaf,
  Copy,
  Check,
  Home,
  Calculator as CalcIcon,
  Sparkles,
  ChevronDown,
  Wallet,
  PiggyBank,
  Gauge,
  Share2,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type CalculatorInput,
  type FuelType,
  type DeductionType,
  type CalcMode,
  PRESETS,
  FUEL_LABELS,
  calculate,
  estimateBenefitValue,
  formatCurrency,
  formatNumber,
  inputToParams,
  paramsToInput,
  DEFAULT_INPUT,
} from '@/lib/calculator';
import {
  getActiveAffiliates,
  type AffiliateContext,
  TRANSPARENCY_NOTICE,
} from '@/lib/affiliates';

const fuelOptions: { value: FuelType; label: string; icon: typeof Zap }[] = [
  { value: 'electric', label: 'Ren Elbil', icon: BatteryCharging },
  { value: 'hybrid', label: 'Laddhybrid', icon: Leaf },
  { value: 'gasoline', label: 'Bensin', icon: Fuel },
  { value: 'diesel', label: 'Diesel', icon: Gauge },
];

const presetIcons: Record<string, typeof Zap> = {
  electric: BatteryCharging,
  hybrid: Leaf,
  gasoline: Car,
};

interface CalculatorProps {
  input: CalculatorInput;
  setInput: (input: CalculatorInput) => void;
  onScrollToComparison: () => void;
}

export function Calculator({ input, setInput, onScrollToComparison }: CalculatorProps) {
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculate(input), [input]);

  const update = useCallback((patch: Partial<CalculatorInput>) => {
    setInput({ ...input, ...patch });
  }, [input, setInput]);

  const applyPreset = useCallback((presetInput: Partial<CalculatorInput>) => {
    setInput({ ...DEFAULT_INPUT, ...presetInput } as CalculatorInput);
  }, [setInput]);

  const shareCalc = useCallback(() => {
    const params = new URLSearchParams(inputToParams(input));
    const url = `${window.location.origin}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [input]);

  const affiliateCtx: AffiliateContext = {
    fuelType: input.fuelType,
    homeCharging: input.homeCharging,
    showPrivateComparison: true,
  };
  const activeAffiliates = getActiveAffiliates(affiliateCtx);

  const estimatedBenefit = useMemo(() => {
    if (input.mode === 'quick') {
      return estimateBenefitValue(input.carPrice, input.fuelType);
    }
    return input.benefitValue;
  }, [input.mode, input.carPrice, input.fuelType, input.benefitValue]);

  return (
    <div className="space-y-6">
      <PresetBar onApply={applyPreset} activePreset={input} />

      <Card className="border-slate-200 bg-white shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200">
                <CalcIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Förmånsbilskalkylator 2026
                </CardTitle>
                               <CardDescription className="text-sm text-slate-500">
                  Beräkna din verkliga nettokostnad per månad
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={shareCalc}
              className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Kopierad
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  Dela kalkyl
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <ModeToggle mode={input.mode} onChange={(m) => update({ mode: m })} />

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-5">
              <FuelSelector value={input.fuelType} onChange={(f) => update({ fuelType: f })} />

              {input.mode === 'direct' ? (
                <NumberInput
                  label="Förmånsvärde från Skatteverket"
                  value={input.benefitValue}
                  onChange={(v) => update({ benefitValue: v })}
                  suffix="kr/mån"
                  hint="Det officiella förmånsvärdet från din arbetsgivare eller Skatteverket"
                />
              ) : (
                <NumberInput
                  label="Nybilspris"
                  value={input.carPrice}
                  onChange={(v) => update({ carPrice: v })}
                  suffix="kr"
                  hint="Schablonberäkning med automatisk miljöbilsnedsättning"
                />
              )}

              <TaxSlider value={input.taxRate} onChange={(t) => update({ taxRate: t })} />
            </div>

            <div className="space-y-5">
              <DeductionSelector
                type={input.deductionType}
                onChange={(d) => update({ deductionType: d })}
              />

              {input.deductionType === 'netto' && (
                <NumberInput
                  label="Nettolöneavdrag"
                  value={input.nettoDeduction}
                  onChange={(v) => update({ nettoDeduction: v })}
                  suffix="kr/mån"
                  hint="Minskar förmånsvärdet krona för krona mot nettolön"
                />
              )}

              <FuelBenefitToggle
                hasFuelBenefit={input.hasFuelBenefit}
                onChange={(v) => update({ hasFuelBenefit: v })}
              />

              {input.fuelType === 'electric' && (
                <HomeChargingToggle
                  homeCharging={input.homeCharging}
                  onChange={(v) => update({ homeCharging: v })}
                />
              )}
            </div>
          </div>

          <Separator className="bg-slate-100" />

          <ResultsDashboard
            result={result}
            taxRate={input.taxRate}
            deductionType={input.deductionType}
          />

          {(result.pensionImpact || result.sgiImpact) && (
            <PensionWarning
              showPension={result.pensionImpact}
              showSGI={result.sgiImpact}
              deductionType={input.deductionType}
            />
          )}

          <ComparisonPanel
            result={result}
            onScrollToComparison={onScrollToComparison}
          />
        </CardContent>
      </Card>

      <AffiliateSection affiliates={activeAffiliates} />

      <div className="flex items-start gap-2.5 rounded-xl bg-slate-100/60 border border-slate-200 px-4 py-3">
        <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">{TRANSPARENCY_NOTICE}</p>
      </div>
    </div>
  );
}

function PresetBar({
  onApply,
  activePreset,
}: {
  onApply: (input: Partial<CalculatorInput>) => void;
  activePreset: CalculatorInput;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {PRESETS.map((preset) => {
        const Icon = presetIcons[preset.icon] || Car;
        const isActive =
          activePreset.fuelType === preset.input.fuelType &&
          activePreset.benefitValue === preset.input.benefitValue &&
          activePreset.taxRate === preset.input.taxRate;
        return (
          <button
            key={preset.id}
            onClick={() => onApply(preset.input)}
            className={`text-left rounded-xl border p-4 transition-all duration-200 ${
              isActive
                ? 'border-emerald-400 bg-emerald-50 shadow-sm ring-1 ring-emerald-200'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isActive ? 'bg-emerald-100' : 'bg-slate-100'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
              </div>
              <span className="text-sm font-semibold text-slate-900">{preset.name}</span>
              {isActive && (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 ml-auto" />
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{preset.description}</p>
          </button>
        );
      })}
    </div>
  );
}

function ModeToggle({ mode, onChange }: { mode: CalcMode; onChange: (m: CalcMode) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1 w-fit">
      <button
        onClick={() => onChange('direct')}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
          mode === 'direct'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Förmånsvärde direkt
      </button>
      <button
        onClick={() => onChange('quick')}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
          mode === 'quick'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Snabbräknare från pris
      </button>
    </div>
  );
}

function FuelSelector({ value, onChange }: { value: FuelType; onChange: (f: FuelType) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Drivlina
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {fuelOptions.map((opt) => {
          const Icon = opt.icon;
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all ${
                active
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="text-xs font-medium">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-200 transition-all">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-300"
          placeholder="0"
        />
        <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">{suffix}</span>
      </div>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function TaxSlider({ value, onChange }: { value: number; onChange: (t: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Marginalskatt
        </label>
        <span className="text-sm font-bold text-emerald-600">{value}%</span>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
        <input
          type="range"
          min={28}
          max={55}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-emerald-600"
        />
        <div className="flex gap-1">
          {[32, 50, 52].map((preset) => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-all ${
                value === preset
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Badge variant="outline" className="text-indigo-600 bg-indigo-50 border-indigo-200 text-xs">
          ~32% kommunalskatt
        </Badge>
        <Badge variant="outline" className="text-indigo-600 bg-indigo-50 border-indigo-200 text-xs">
          ~50-52% statlig skatt
        </Badge>
      </div>
    </div>
  );
}

function DeductionSelector({
  type,
  onChange,
}: {
  type: DeductionType;
  onChange: (d: DeductionType) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Upplägg för bilförmån
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange('brutto')}
          className={`rounded-lg border p-3 text-left transition-all ${
            type === 'brutto'
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-semibold ${type === 'brutto' ? 'text-emerald-700' : 'text-slate-700'}`}>
              Bruttolöneavdrag
            </span>
          </div>
          <p className="text-xs text-slate-500">Dras före skatt. Sänker PGI & SGI.</p>
        </button>
        <button
          onClick={() => onChange('netto')}
          className={`rounded-lg border p-3 text-left transition-all ${
            type === 'netto'
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-semibold ${type === 'netto' ? 'text-emerald-700' : 'text-slate-700'}`}>
              Nettolöneavdrag
            </span>
          </div>
          <p className="text-xs text-slate-500">Skattade pengar. Påverkar ej pension.</p>
        </button>
      </div>
    </div>
  );
}

function FuelBenefitToggle({
  hasFuelBenefit,
  onChange,
}: {
  hasFuelBenefit: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Drivmedelsförmån (privat körning)
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
        <button
          onClick={() => onChange(true)}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            hasFuelBenefit
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Ja, arbetsgivaren betalar
        </button>
        <button
          onClick={() => onChange(false)}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            !hasFuelBenefit
              ? 'bg-slate-200 text-slate-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Nej, jag betalar själv
        </button>
      </div>
      {hasFuelBenefit && (
        <p className="text-xs text-slate-400 flex items-start gap-1.5">
          <Info className="h-3 w-3 mt-0.5 shrink-0" />
          Drivmedelsförmån beräknas till 1,2 × marknadsvärdet enligt Skatteverkets schablon.
        </p>
      )}
    </div>
  );
}

function HomeChargingToggle({
  homeCharging,
  onChange,
}: {
  homeCharging: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
        <Home className="h-3 w-3" />
        Hemmaladdning
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
        <button
          onClick={() => onChange(true)}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            homeCharging
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Ja, laddar hemma
        </button>
        <button
          onClick={() => onChange(false)}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            !homeCharging
              ? 'bg-slate-200 text-slate-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Nej
        </button>
      </div>
    </div>
  );
}

function ResultsDashboard({
  result,
  taxRate,
  deductionType,
}: {
  result: ReturnType<typeof calculate>;
  taxRate: number;
  deductionType: DeductionType;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="h-5 w-5 text-emerald-100" />
          <span className="text-sm font-medium text-emerald-50">Faktisk nettokostnad</span>
        </div>
        <div className="flex items-baseline gap-2">
          <motion.span
            key={result.monthlyNetCost}
            initial={{ opacity: 0.5, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            {formatCurrency(result.monthlyNetCost)}
          </motion.span>
          <span className="text-lg text-emerald-100">/mån</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-emerald-50">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            {formatCurrency(result.annualNetCost)} / år
          </span>
          <span className="flex items-center gap-1.5">
            <Scale className="h-4 w-4" />
            Vid {taxRate}% marginalskatt
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ResultCard
          label="Förmånsvärde"
          value={formatCurrency(result.benefitValueMonthly)}
          sub="kr/mån"
          icon={CalcIcon}
          color="slate"
        />
        <ResultCard
          label="Bränsleförmån"
          value={formatCurrency(result.fuelBenefitMonthly)}
          sub="kr/mån"
          icon={Fuel}
          color="amber"
        />
        <ResultCard
          label="Beskattningsbart"
          value={formatCurrency(result.taxableBenefitMonthly)}
          sub="kr/mån"
          icon={Gauge}
          color="indigo"
        />
        <ResultCard
          label="Årlig kostnad"
          value={formatCurrency(result.annualNetCost)}
          sub="kr/år"
          icon={PiggyBank}
          color="emerald"
        />
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof Zap;
  color: 'slate' | 'amber' | 'indigo' | 'emerald';
}) {
  const colors = {
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };
  const iconColors = {
    slate: 'text-slate-400',
    amber: 'text-amber-500',
    indigo: 'text-indigo-500',
    emerald: 'text-emerald-500',
  };
  return (
    <div className={`rounded-xl border p-3 ${colors[color]}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`h-3.5 w-3.5 ${iconColors[color]}`} />
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className="text-base font-bold">{value}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function PensionWarning({
  showPension,
  showSGI,
  deductionType,
}: {
  showPension: boolean;
  showSGI: boolean;
  deductionType: DeductionType;
}) {
  if (deductionType === 'netto') return null;
  return (
    <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
        <Info className="h-4 w-4 text-amber-600" />
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-800 mb-0.5">
          Påverkan på pension och SGI
        </p>
        <p className="text-xs text-amber-700 leading-relaxed">
          {showPension && 'Bruttolöneavdrag sänker din pensionsgrundande inkomst (PGI). '}
          {showSGI && 'Även din sjukpenninggrundande inkomst (SGI) kan påverkas. '}
          Överväg nettolöneavdrag om du vill skydda din framtida pension.
        </p>
      </div>
    </div>
  );
}

function ComparisonPanel({
  result,
  onScrollToComparison,
}: {
  result: ReturnType<typeof calculate>;
  onScrollToComparison: () => void;
}) {
  const savings = result.savings;
  const isPositive = savings > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 bg-white">
        <Scale className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-700">
          Förmånsbil vs privatköp
        </h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Car className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Förmånsbil</span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">
              {formatCurrency(result.monthlyNetCost)}
            </p>
            <p className="text-xs text-slate-500">per månad</p>
          </div>
          <div className="rounded-xl bg-slate-100 border border-slate-200 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Wallet className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Privatköp</span>
            </div>
            <p className="text-2xl font-bold text-slate-700">
              {formatCurrency(result.privateCarMonthly)}
            </p>
            <p className="text-xs text-slate-500">per månad</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl p-4 ${
            isPositive
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-rose-50 border border-rose-200'
          }`}
        >
          {isPositive ? (
            <TrendingDown className="h-6 w-6 text-emerald-600 shrink-0" />
          ) : (
            <TrendingUp className="h-6 w-6 text-rose-600 shrink-0" />
          )}
          <div>
            <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isPositive
                ? `Du sparar ${formatCurrency(Math.abs(savings))}/mån med förmånsbil`
                : `Privatköp är ${formatCurrency(Math.abs(savings))}/mån billigare`}
            </p>
            <p className="text-xs text-slate-500">
              {isPositive
                ? `${formatCurrency(Math.abs(savings) * 12)} sparade per år`
                : 'Överväg privatköp eller privatleasing'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onScrollToComparison}
          className="w-full gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          Se fullständig jämförelse
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AffiliateSection({
  affiliates,
}: {
  affiliates: ReturnType<typeof getActiveAffiliates>;
}) {
  if (affiliates.length === 0) return null;

  const iconMap: Record<string, typeof Zap> = {
    shield: ShieldCheck,
    banknote: PiggyBank,
    zap: Zap,
  };

  return (
    <div className="space-y-3">
      {affiliates.map((offer) => {
        const Icon = iconMap[offer.icon] || Zap;
        return (
          <a
            key={offer.id}
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`block rounded-xl border p-4 transition-all hover:shadow-md group ${offer.accentClass}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/80 ring-1 ring-slate-200">
                <Icon className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={`text-xs ${offer.badgeClass}`}>
                    {offer.name}
                  </Badge>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug">
                  {offer.cta} →
                </p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {offer.microtext}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
