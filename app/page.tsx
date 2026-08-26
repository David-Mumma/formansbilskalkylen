'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Zap,
  Fuel,
  BatteryCharging,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CircleDollarSign,
  Car,
  Leaf,
  Scale,
  FileText,
  HelpCircle,
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

const navLinks = [
  { href: '#formansvarde-2026', label: 'Förmånsvärde 2026' },
  { href: '#elbil-vs-bensin', label: 'Elbil vs Bensin' },
  { href: '#brutto-vs-netto', label: 'Brutto vs Netto' },
  { href: '#faq', label: 'FAQ' },
];

const carComparison = [
  {
    name: 'Tesla Model Y Long Range',
    price: '600 000 kr',
    type: 'Ren Elbil',
    adjustment: 'Miljöjustering aktiv',
    grossMonthly: '6 200 kr',
    net32: '1 984 kr',
    net50: '3 100 kr',
    isElectric: true,
  },
  {
    name: 'Volvo EX40 / EC40 Single Motor',
    price: '575 000 kr',
    type: 'Ren Elbil',
    adjustment: 'Miljöjustering aktiv',
    grossMonthly: '5 800 kr',
    net32: '1 856 kr',
    net50: '2 900 kr',
    isElectric: true,
  },
  {
    name: 'Volkswagen ID.7 Pro',
    price: '625 000 kr',
    type: 'Ren Elbil',
    adjustment: 'Miljöjustering aktiv',
    grossMonthly: '6 500 kr',
    net32: '2 080 kr',
    net50: '3 250 kr',
    isElectric: true,
  },
  {
    name: 'Volvo XC60 B5 Bensin/MHEV',
    price: '650 000 kr',
    type: 'Bensin/MHEV',
    adjustment: 'Ej miljöjusterad',
    grossMonthly: '10 500 kr',
    net32: '3 360 kr',
    net50: '5 250 kr',
    isElectric: false,
  },
];

const faqItems = [
  {
    question: 'Hur beräknas förmånsvärdet på en elbil 2026?',
    answer:
      'Förmånsvärdet beräknas utifrån bilens nybilspris satt i relation till en jämförbar fossilbil via Skatteverkets schablon, vilket sänker det beskattningsbara förmånsvärdet avsevärt för elbilar.',
  },
  {
    question: 'Vad skiljer bruttolöneavdrag från nettolöneavdrag för förmånsbil?',
    answer:
      'Vid nettolöneavdrag betalar du med redan skattade pengar vilket minskar förmånsvärdet krona för krona. Vid bruttolöneavdrag dras summan före skatt vilket även minskar din pensionsgrundande inkomst och SGI.',
  },
  {
    question: 'Hur beskattas drivmedel vid fri bil och tjänstekörning?',
    answer:
      'Om arbetsgivaren betalar drivmedlet för privat körning ska du förmånsbeskattas för drivmedlets marknadsvärde multiplicerat med 1,2.',
  },
  {
    question: 'Vad är 7,5 basbelopps-regeln för förmånsbilar?',
    answer:
      'För bilar med ett nybilspris över 7,5 prisbasbelopp tillkommer ett extra tillägg i beräkningen på 20 % av det överstigande beloppet, vilket gör dyra premiumbilar proportionellt dyrare att ha som förmånsbil.',
  },
];

const calculationSteps = [
  {
    icon: CircleDollarSign,
    title: 'Prisbasbeloppsdel',
    formula: '0,29 × Prisbasbeloppet (PBB)',
    description:
      'En fast schablondel baserad på årets prisbasbelopp. För 2026 utgör detta grundvalen av förmånsvärdet och är lika för alla bilar.',
  },
  {
    icon: TrendingUp,
    title: 'Ränterelaterad del',
    formula: '(Statslåneräntan + 1%) × Nybilspris',
    description:
      'En räntekänslig del som baseras på statslåneräntan (SLR) plus 1 procentenheter, multiplicerat med bilens nybilspris.',
  },
  {
    icon: Car,
    title: 'Prisdel',
    formula: '13% av pris upp till 7,5 PBB + 20% på överstigande',
    description:
      '13 % av nybilspriset upp till 7,5 prisbasbelopp, plus 20 % på den överstigande delen. Detta gör dyrare bilar proportionellt dyrare i förmånsskatt.',
  },
  {
    icon: Leaf,
    title: 'Miljöbilsjustering',
    formula: 'Schablonnedsättning mot jämförbar fossilbil',
    description:
      'För miljöbilar sätts förmånsvärdet till nybilspriset för en motsvarande bensin- eller dieselbil, max 50 % nedgång eller schablonbelopp för elbilar.',
  },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 transition-all group-hover:bg-primary/20 group-hover:ring-primary/50">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Formansbilskalkylen<span className="text-primary">.se</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-accent/40 bg-accent/10 text-accent gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Lanseras snart
            </Badge>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 pt-3">
                <Badge
                  variant="outline"
                  className="border-accent/40 bg-accent/10 text-accent gap-1.5"
                >
                  <Sparkles className="h-3 w-3" />
                  Kalkylator under utveckling
                </Badge>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/10 text-primary gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Kalkylator under utveckling – Lanseras snart
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]"
          >
            Förmånsbilskalkylen — Räkna ut förmånsvärde, skatt & nettokostnad för tjänstebil
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto"
          >
            Oberoende guide och beräkningsverktyg för tjänstebilar och förmånsbilar. Snart lanserar vi Sveriges smartaste förmånsbilskalkylator för att beräkna Skatteverkets officiella förmånsvärde, schablonjustering för miljöbilar och verklig nettokostnad per månad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Calculator className="h-4 w-4" />
              Prova kalkylatorn (snart)
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-border bg-secondary/50">
              Läs guiden
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <StatusCard />
        </motion.div>
      </div>
    </section>
  );
}

function StatusCard() {
  const [fuelType, setFuelType] = useState('Ren Elbil');
  const [price, setPrice] = useState('600 000');
  const [taxRate, setTaxRate] = useState(50);
  const [deductionType, setDeductionType] = useState('Bruttolöneavdrag');

  const fuelOptions = ['Ren Elbil', 'Laddhybrid', 'Bensin/Diesel'];
  const deductionOptions = ['Bruttolöneavdrag', 'Nettolöneavdrag'];

  return (
    <Card className="relative overflow-hidden border-border bg-card/80 backdrop-blur-xl shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <BatteryCharging className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">
              Interaktiv förmånssimulator
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Lanseras inom kort – förhandsgranskning
            </CardDescription>
          </div>
        </div>
        <Badge
          variant="outline"
          className="hidden sm:flex border-accent/40 bg-accent/10 text-accent gap-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Preview
        </Badge>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Nybilspris (SEK)
            </label>
            <div className="flex items-center rounded-lg border border-input bg-secondary/30 px-3 py-2.5">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/50"
                placeholder="600 000"
              />
              <span className="text-xs text-muted-foreground ml-2">kr</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Drivmedel
            </label>
            <div className="flex items-center rounded-lg border border-input bg-secondary/30 p-1 gap-1">
              {fuelOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFuelType(option)}
                  className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
                    fuelType === option
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Marginalskatt: {taxRate}%
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-input bg-secondary/30 px-3 py-2.5">
              <input
                type="range"
                min={30}
                max={55}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-semibold text-primary min-w-[3rem] text-right">
                {taxRate}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Löneavdrag
            </label>
            <div className="flex items-center rounded-lg border border-input bg-secondary/30 p-1 gap-1">
              {deductionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setDeductionType(option)}
                  className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
                    deductionType === option
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-secondary/40 p-4">
            <p className="text-xs text-muted-foreground mb-1">Beräknat förmånsvärde</p>
            <p className="text-xl font-bold text-foreground">~6 200 kr</p>
            <p className="text-xs text-muted-foreground">per månad</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4 ring-1 ring-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Nettokostnad</p>
            <p className="text-xl font-bold text-primary">~{(6200 * (taxRate / 100)).toFixed(0)} kr</p>
            <p className="text-xs text-muted-foreground">vid {taxRate}% skatt</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-lg bg-accent/10 p-4 ring-1 ring-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Miljöjustering</p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <p className="text-sm font-semibold text-accent">Aktiv</p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{fuelType}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 text-primary" />
          <span>
            Detta är en interaktiv förhandsgranskning. Exakta beräkningar enligt Skatteverkets modell 2026 blir tillgängliga vid lansering.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground text-balance leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function CalculationModelSection() {
  return (
    <section id="formansvarde-2026" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skatteverkets modell"
          title="Så beräknas förmånsvärdet 2026"
          description="Förmånsvärdet för tjänstebil består av fyra delar som tillsammans utgör det beskattningsbara värdet. Här är hur varje del fungerar."
          icon={Scale}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {calculationSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-colors group">
                <CardHeader className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Steg {i + 1}
                    </span>
                    <CardTitle className="text-base font-semibold mt-1">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md bg-secondary/50 px-3 py-2 font-mono text-xs text-primary border border-border">
                    {step.formula}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="border-border bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
                  <Info className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">
                    Sammanlagt förmånsvärde
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    De fyra delarna summeras och divideras med 12 för att få det månatliga förmånsvärdet. För miljöbilar appliceras schablonjusteringen som sätter förmånsvärdet i relation till en jämförbar fossilbil, vilket kan halvera det beskattningsbara värdet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  return (
    <section id="elbil-vs-bensin" className="relative py-20 sm:py-28 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Jämförelse 2026"
          title="Förmånsvärde & nettokostnad per modell"
          description="Se hur förmånsvärdet och nettokostnaden skiljer sig mellan populära elbilar och en motsvarande bensinbil. Miljöjusteringen gör stor skillnad."
          icon={Car}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-semibold text-foreground">Modell</TableHead>
                    <TableHead className="font-semibold text-foreground">Nybilspris</TableHead>
                    <TableHead className="font-semibold text-foreground hidden sm:table-cell">Miljöjustering</TableHead>
                    <TableHead className="font-semibold text-foreground">Brutto/mån</TableHead>
                    <TableHead className="font-semibold text-foreground hidden md:table-cell">Netto @ 32%</TableHead>
                    <TableHead className="font-semibold text-foreground">Netto @ 50%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carComparison.map((car) => (
                    <TableRow key={car.name} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${car.isElectric ? 'bg-accent/10' : 'bg-secondary'}`}>
                            {car.isElectric ? (
                              <Zap className="h-4 w-4 text-accent" />
                            ) : (
                              <Fuel className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{car.name}</p>
                            <p className="text-xs text-muted-foreground">{car.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{car.price}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {car.isElectric ? (
                          <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent gap-1">
                            <Leaf className="h-3 w-3" />
                            Ja
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            Nej
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{car.grossMonthly}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{car.net32}</TableCell>
                      <TableCell>
                        <span className={car.isElectric ? 'font-semibold text-accent' : 'font-semibold text-destructive'}>
                          {car.net50}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 grid gap-4 sm:grid-cols-3"
        >
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-5 flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-accent shrink-0" />
              <div>
                <p className="text-sm font-semibold">Elbil ~50% billigare</p>
                <p className="text-xs text-muted-foreground">Miljöjustering halverar förmånsvärdet</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">Schablontryggt</p>
                <p className="text-xs text-muted-foreground">Enligt Skatteverket 2026</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-5 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-semibold">Premiumbilar dyrare</p>
                <p className="text-xs text-muted-foreground">7,5 PBB-regeln slår till på dyra bilar</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function TechnicalGuideSection() {
  return (
    <section id="brutto-vs-netto" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Teknisk SEO-Guide & Formel"
          title="Exakt formel för nettokostnad"
          description="Förstå den exakta matematiken bakom förmånsbeskattning och hur drivmedel, trängselskatt och löneavdrag påverkar din slutkostnad."
          icon={FileText}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Nettokostnadsformeln</CardTitle>
                </div>
                <CardDescription>
                  Den grundläggande formeln för att beräkna vad förmånsbilen kostar dig per månad efter skatt.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                  <p className="text-center font-mono text-sm sm:text-base text-foreground leading-relaxed">
                    Nettokostnad/mån =<br />
                    <span className="text-primary">Förmånsvärde (kr/mån)</span> ×{' '}
                    <span className="text-accent">Marginalskatt (%)</span><br />
                    + <span className="text-destructive">Drivmedelsförmån</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/15 text-xs font-bold text-primary mt-0.5">1</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">Förmånsvärde</span> — det beskattningsbara värdet av bilförmånen, beräknat enligt Skatteverkets modell.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/15 text-xs font-bold text-accent mt-0.5">2</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">Marginalskatt</span> — din högsta skattesats (vanligtvis 30–55% beroende på kommun och inkomst).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-destructive/15 text-xs font-bold text-destructive mt-0.5">3</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">Drivmedelsförmån</span> — tillkommer om arbetsgivaren betalar drivmedel för privat körning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Fuel className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Fri drivmedel & trängselskatt</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-secondary/40 p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Om arbetsgivaren betalar drivmedlet för privat körning ska du förmånsbeskattas för drivmedlets{' '}
                    <span className="text-foreground font-medium">marknadsvärde multiplicerat med 1,2</span>. Detta innebär att du beskattas för 120% av det verkliga värdet.
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/40 p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Trängselskatt</span> som arbetsgivaren betalar för privat körning är också en skattepliktig förmån, medan trängselskatt för tjänsteresor är avdragsgillt för arbetsgivaren.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Scale className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Brutto- vs nettolöneavdrag</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary mb-2">
                      Bruttolöneavdrag
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dras före skatt. Minskar förmånsvärdet och skatten, men även pensionsgrundande inkomst (PGI) och sjukpenninggrundande inkomst (SGI).
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent mb-2">
                      Nettolöneavdrag
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Betalas med redan skattade pengar. Minskar förmånsvärdet krona för krona utan att påverka PGI eller SGI.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-secondary/30 px-4 py-3">
                  <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Vid operativ leasing ingår bilen i arbetsgivarens flotta. Vid personalbil via bruttolöneavdrag äger eller leasar du bilen själv via löneväxling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-secondary/10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vanliga frågor"
          title="Frågor och svar om förmånsbil"
          icon={HelpCircle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-border rounded-lg px-4 hover:bg-secondary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] opacity-50" />
            <CardContent className="relative p-8 sm:p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30 mb-6">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance mb-4">
                Sveriges smartaste förmånsbilskalkylator lanseras snart
              </h2>
              <p className="text-muted-foreground text-balance max-w-2xl mx-auto mb-8 leading-relaxed">
                Få exakta beräkningar av förmånsvärde, miljöjustering och nettokostnad för din tjänstebil — helt enligt Skatteverkets officiella modell för 2026.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Få notis vid lansering
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-border bg-secondary/50 gap-2">
                  Läs FAQ
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                Formansbilskalkylen<span className="text-primary">.se</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Oberoende guide och beräkningsverktyg för tjänstebilar och förmånsbilar i Sverige. Beräkna Skatteverkets officiella förmånsvärde och verklig nettokostnad per månad.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Navigering</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Resurser</h3>
            <ul className="space-y-2">
              <li>
                <a href="/llms.txt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  llms.txt
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 rounded-lg bg-secondary/30 px-4 py-3 max-w-2xl">
            <Info className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Formansbilskalkylen.se är en oberoende jämförelseportal. Sidan innehåller annonslänkar via affiliatenätverk.
            </p>
          </div>
          <p className="text-xs text-muted-foreground shrink-0">
            © 2026 Formansbilskalkylen.se
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CalculationModelSection />
      <ComparisonTableSection />
      <TechnicalGuideSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
