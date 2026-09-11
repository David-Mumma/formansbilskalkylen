'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  type CalculatorInput,
  calculate,
  DEFAULT_INPUT,
  paramsToInput,
  inputToParams,
  formatCurrency,
} from '@/lib/calculator';
import { TRANSPARENCY_NOTICE } from '@/lib/affiliates';
import { Calculator as CalculatorWidget } from '@/components/calculator';
import {
  GuideSection,
  ComparisonTableSection,
  TaxTipsSection,
  FAQSection,
  CrossLinksSection,
} from '@/components/content-sections';
import { MobileStickyBar } from '@/components/mobile-sticky-bar';

const navLinks = [
  { href: '#kalkylator', label: 'Kalkylator' },
  { href: '#formansvarde-2026', label: 'Förmånsvärde 2026' },
  { href: '#jamfor-privat', label: 'Jämför' },
  { href: '#brutto-vs-netto', label: 'Brutto vs Netto' },
  { href: '#faq', label: 'FAQ' },
];

export default function Home() {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parsed = paramsToInput(params);
    if (Object.keys(parsed).length > 0) {
      setInput({ ...DEFAULT_INPUT, ...parsed });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const result = calculate(input);

  const scrollToComparison = useCallback(() => {
    const el = document.getElementById('jamfor-privat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToCalc = useCallback(() => {
    const el = document.getElementById('kalkylator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-50">
      <Header
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onScrollToCalc={scrollToCalc}
      />

      <HeroSection onScrollToCalc={scrollToCalc} />

      <section id="kalkylator" className="relative py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalculatorWidget
            input={input}
            setInput={setInput}
            onScrollToComparison={scrollToComparison}
          />
        </div>
      </section>

      <GuideSection />
      <ComparisonTableSection />
      <TaxTipsSection />
      <FAQSection />
      <CrossLinksSection />

      <Footer />

      <MobileStickyBar
        monthlyNetCost={result.monthlyNetCost}
        onCompare={scrollToComparison}
      />
    </main>
  );
}

function Header({
  scrolled,
  mobileOpen,
  setMobileOpen,
  onScrollToCalc,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  onScrollToCalc: () => void;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 ring-1 ring-emerald-200 transition-all group-hover:bg-emerald-200">
              <Calculator className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Förmånsbilskalkylen<span className="text-emerald-600">.se</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              onClick={onScrollToCalc}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              <Calculator className="h-3.5 w-3.5" />
              Räkna nu
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-slate-200"
        >
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => {
                setMobileOpen(false);
                onScrollToCalc();
              }}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              <Calculator className="h-3.5 w-3.5" />
              Räkna nu
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function HeroSection({ onScrollToCalc }: { onScrollToCalc: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-200/20 rounded-full blur-[120px] opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-emerald-200 bg-emerald-50 text-emerald-700 gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Uppdaterad för Skatteverkets regler 2026
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]"
          >
            Räkna ut din förmånsbilskostnad 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed text-balance max-w-3xl mx-auto"
          >
            Beräkna förmånsvärde, nettokostnad och bränsleförmån för din tjänstebil.
            Jämför förmånsbil mot privatköp och se hur marginalskatten påverkar din plånbok.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={onScrollToCalc}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              <Calculator className="h-4 w-4" />
              Starta kalkylatorn
            </Button>
            <a href="#formansvarde-2026">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              >
                Läs guiden
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Enligt Skatteverket 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Info className="h-4 w-4 text-emerald-600" />
              Helt kostnadsfri & oberoende
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 ring-1 ring-emerald-200">
                <Calculator className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900">
                Förmånsbilskalkylen<span className="text-emerald-600">.se</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Oberoende kalkylator för tjänstebilar och förmånsbilar i Sverige. Beräkna
              Skatteverkets officiella förmånsvärde och verklig nettokostnad per månad.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Navigering</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Resurser</h3>
            <ul className="space-y-2">
              <li>
                <a href="/llms.txt" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  llms.txt
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-200" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 max-w-2xl">
            <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">{TRANSPARENCY_NOTICE}</p>
          </div>
          <p className="text-xs text-slate-400 shrink-0">
            © 2026 Förmånsbilskalkylen.se
          </p>
        </div>
      </div>
    </footer>
  );
}
