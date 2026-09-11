'use client';

import { motion } from 'framer-motion';
import {
  Scale,
  Car,
  FileText,
  HelpCircle,
  Leaf,
  TrendingDown,
  TrendingUp,
  Info,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Fuel,
  BatteryCharging,
  ShieldCheck,
  PiggyBank,
  Zap,
  ExternalLink,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const calculationSteps = [
  {
    icon: Calculator,
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
      'En räntekänslig del som baseras på statslåneräntan (SLR) plus 1 procentenhet, multiplicerat med bilens nybilspris.',
  },
  {
    icon: Car,
    title: 'Prisdel',
    formula: '13% upp till 7,5 PBB + 20% på överstigande',
    description:
      '13% av nybilspriset upp till 7,5 prisbasbelopp, plus 20% på den överstigande delen. Detta gör dyrare bilar proportionellt dyrare i förmånsskatt.',
  },
  {
    icon: Leaf,
    title: 'Miljöbilsjustering',
    formula: 'Schablonnedsättning mot jämförbar fossilbil',
    description:
      'För miljöbilar sätts förmånsvärdet i relation till en motsvarande bensin- eller dieselbil, med upp till 50% nedsättning för elbilar.',
  },
];

const comparisonRows = [
  {
    aspect: 'Månadskostnad',
    benefit: 'Förmånsvärde × marginalskatt',
    private: 'Värdeminskning + försäkring + skatt',
    leasing: 'Fast månadshyra',
  },
  {
    aspect: 'Skattefördel',
    benefit: 'Hög marginalskatt = låg nettokostnad',
    private: 'Ingen skatteförmån',
    leasing: 'Ingen skatteförmån',
  },
  {
    aspect: 'Påverkan på pension',
    benefit: 'Brutto: sänker PGI/SGI • Netto: ingen påverkan',
    private: 'Ingen påverkan',
    leasing: 'Ingen påverkan',
  },
  {
    aspect: 'Flexibilitet',
    benefit: 'Bunden till arbetsgivarens bilpolicy',
    private: 'Full frihet att byta/sälja',
    leasing: 'Bunden till leasingperiod',
  },
  {
    aspect: 'Risk för värdeminskning',
    benefit: 'Arbetsgivaren bär risken',
    private: 'Du bär hela risken',
    leasing: 'Leasingbolaget bär risken',
  },
  {
    aspect: 'Bränslekostnad',
    benefit: 'Kan ingå via drivmedelsförmån (1,2× schablon)',
    private: 'Du betalar fullt marknadspris',
    leasing: 'Du betalar fullt marknadspris',
  },
];

const faqItems = [
  {
    question: 'Hur beräknas förmånsvärdet för en elbil 2026?',
    answer:
      'Förmånsvärdet för en elbil 2026 beräknas enligt Skatteverkets schablon där grundbeloppet, räntedelen och prisdelen summeras. För elbilar appliceras en miljöbilsnedsättning som kan halvera förmånsvärdet jämfört med en motsvarande fossilbil, upp till max 50% nedsättning.',
  },
  {
    question: 'Vad är skillnaden mellan förmånsbil och tjänstebil?',
    answer:
      'En tjänstebil är en bil som arbetsgivaren ställer till förfogande för tjänsteresor. När du även använder bilen privat blir det en förmånsbil och du betalar skatt på förmånsvärdet. Alla förmånsbilar är tjänstebilar, men inte alla tjänstebilar är förmånsbilar.',
  },
  {
    question: 'Lönar det sig att ta förmånsbil med 50% marginalskatt?',
    answer:
      'Vid hög marginalskatt blir förmånsbilen fördelaktig eftersom skatteavdraget per krona förmånsvärde är högre. En elbil med miljöjustering vid 50% marginalskatt ger ofta en nettokostnad under 3 000 kr/mån, vilket är betydligt billigare än att äga motsvarande bil privat.',
  },
  {
    question: 'Hur beskattas drivmedelsförmån om företaget betalar bensinen eller elen?',
    answer:
      'Om arbetsgivaren betalar drivmedel för privat körning ska du förmånsbeskattas för drivmedlets marknadsvärde multiplicerat med 1,2 enligt Skatteverkets schablon. För elbilar gäller motsvarande schablon för hemmaladdning om arbetsgivaren står för elen.',
  },
  {
    question: 'Påverkar förmånsbil min framtida pension?',
    answer:
      'Vid bruttolöneavdrag minskar din pensionsgrundande inkomst (PGI) och sjukpenninggrundande inkomst (SGI) eftersom avdraget sänker din bruttolön. Vid nettolöneavdrag påverkas varken PGI eller SGI eftersom du betalar med redan skattade pengar.',
  },
];

export function GuideSection() {
  return (
    <section id="formansvarde-2026" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skatteverkets modell"
          title="Förmånsbil 2026 – Regler, nedsättning och marginalskattens effekt"
          description="Förmånsvärdet för tjänstebil består av fyra delar som tillsammans utgör det beskattningsbara värdet. Här är hur varje del fungerar och hur miljöbilsnedsättningen påverkar slutkostnaden."
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
              <Card className="h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200">
                    <step.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-400">Steg {i + 1}</span>
                    <CardTitle className="text-base font-bold text-slate-900 mt-1">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-emerald-700 border border-slate-200">
                    {step.formula}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 ring-1 ring-indigo-200">
                  <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Sammanlagt förmånsvärde
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    De fyra delarna summeras och divideras med 12 för att få det månatliga förmånsvärdet.
                    För miljöbilar appliceras schablonjusteringen som sätter förmånsvärdet i relation
                    till en jämförbar fossilbil, vilket kan halvera det beskattningsbara värdet.
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

export function ComparisonTableSection() {
  return (
    <section id="jamfor-privat" className="py-16 sm:py-24 bg-slate-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Jämförelse 2026"
          title="Förmånsbil vs Privatköp vs Privatleasing"
          description="För- och nackdelar för plånboken – se hur upplägget påverkar din månadskostnad, skatt och pension."
          icon={Car}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 hover:bg-transparent bg-slate-50">
                    <TableHead className="font-bold text-slate-900">Aspekt</TableHead>
                    <TableHead className="font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <BatteryCharging className="h-4 w-4 text-emerald-600" />
                        Förmånsbil
                      </span>
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Car className="h-4 w-4 text-slate-500" />
                        Privatköp
                      </span>
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-slate-500" />
                        Privatleasing
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row) => (
                    <TableRow key={row.aspect} className="border-slate-100">
                      <TableCell className="font-semibold text-slate-700">
                        {row.aspect}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        <span className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          {row.benefit}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        <span className="flex items-start gap-1.5">
                          <Info className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                          {row.private}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        <span className="flex items-start gap-1.5">
                          <Info className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                          {row.leasing}
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
          <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">Elbil ~50% billigare</p>
                <p className="text-xs text-slate-500">Miljöjustering halverar förmånsvärdet</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 bg-indigo-50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-indigo-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">Schablontryggt</p>
                <p className="text-xs text-slate-500">Enligt Skatteverket 2026</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">Premiumbilar dyrare</p>
                <p className="text-xs text-slate-500">7,5 PBB-regeln slår till på dyra bilar</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export function TaxTipsSection() {
  return (
    <section id="brutto-vs-netto" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skattetips"
          title="Brutto- vs nettolöneavdrag vid bilförmån"
          description="Valet mellan brutto- och nettolöneavdrag påverkar inte bara månadskostnaden utan också din framtida pension och sjukpenning."
          icon={FileText}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg text-slate-900">Nettokostnadsformeln</CardTitle>
                </div>
                <CardDescription className="text-slate-500">
                  Den grundläggande formeln för att beräkna vad förmånsbilen kostar dig per månad efter skatt.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-center font-mono text-sm sm:text-base text-slate-900 leading-relaxed">
                    Nettokostnad/mån =<br />
                    <span className="text-emerald-600 font-bold">Förmånsvärde</span> ×{' '}
                    <span className="text-indigo-600 font-bold">Marginalskatt</span><br />
                    + <span className="text-amber-600 font-bold">Drivmedelsförmån</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-100 text-xs font-bold text-emerald-700 mt-0.5">1</div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="text-slate-900 font-semibold">Förmånsvärde</span> — det beskattningsbara värdet av bilförmånen, beräknat enligt Skatteverkets modell.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-100 text-xs font-bold text-indigo-700 mt-0.5">2</div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="text-slate-900 font-semibold">Marginalskatt</span> — din högsta skattesats (vanligtvis 30–55% beroende på kommun och inkomst).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-100 text-xs font-bold text-amber-700 mt-0.5">3</div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="text-slate-900 font-semibold">Drivmedelsförmån</span> — tillkommer om arbetsgivaren betalar drivmedel för privat körning.
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
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Fuel className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg text-slate-900">Fri drivmedel & trängselskatt</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Om arbetsgivaren betalar drivmedlet för privat körning ska du förmånsbeskattas
                    för drivmedlets{' '}
                    <span className="text-slate-900 font-semibold">marknadsvärde multiplicerat med 1,2</span>.
                    Detta innebär att du beskattas för 120% av det verkliga värdet.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="text-slate-900 font-semibold">Trängselskatt</span> som arbetsgivaren
                    betalar för privat körning är också en skattepliktig förmån, medan trängselskatt för
                    tjänsteresor är avdragsgill för arbetsgivaren.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5 mb-1">
                  <Scale className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg text-slate-900">Brutto- vs nettolöneavdrag</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                    <Badge variant="outline" className="text-indigo-600 bg-indigo-100 border-indigo-200 mb-2">
                      Bruttolöneavdrag
                    </Badge>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Dras före skatt. Minskar förmånsvärdet och skatten, men även pensionsgrundande
                      inkomst (PGI) och sjukpenninggrundande inkomst (SGI).
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <Badge variant="outline" className="text-emerald-700 bg-emerald-100 border-emerald-200 mb-2">
                      Nettolöneavdrag
                    </Badge>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Betalas med redan skattade pengar. Minskar förmånsvärdet krona för krona utan att
                      påverka PGI eller SGI.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                  <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Vid operativ leasing ingår bilen i arbetsgivarens flotta. Vid personalbil via
                    bruttolöneavdrag äger eller leasar du bilen själv via löneväxling.
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

export function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-100/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vanliga frågor"
          title="Frågor och svar om förmånsbil 2026"
          icon={HelpCircle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-slate-200 rounded-lg px-4 hover:bg-slate-50 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600 leading-relaxed">
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

export function CrossLinksSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Relaterade kalkylatorer"
          title="Räkna vidare på din bil- och reseekonomi"
          description="Förmånsbilen är en del av din totala bil- och reseekonomi. Använd våra andra kalkylatorer för att få hela bilden."
          icon={Zap}
        />

        <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
          <a
            href="https://www.milkostnadskalkylen.se"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200">
                <Car className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-base font-bold text-slate-900">Milkostnadskalkylen</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Räkna ut din verkliga milkostnad vid privat bilägande – inklusive värdeminskning,
                  försäkring och bränsle.
                </p>
              </div>
            </div>
          </a>

          <a
            href="https://www.reseavdragskalkylen.se"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 ring-1 ring-indigo-200">
                <PiggyBank className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-base font-bold text-slate-900">Reseavdragskalkylen</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Kolla om du kan göra reseavdrag för resor till och från arbetet – och hur mycket du
                  kan spara på att deklarera rätt.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 mb-4">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-slate-600 text-balance leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}
