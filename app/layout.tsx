import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.formansbilskalkylen.se'),
  title: 'Förmånsbilskalkylator 2026 – Räkna ut förmånsvärde & nettokostnad',
  description:
    'Beräkna den verkliga nettokostnaden för förmånsbil 2026. Se skatteeffekt vid marginalskatt, bränsleförmån och jämför förmånsbil mot privatköp.',
  keywords: [
    'förmånsbilskalkylator',
    'räkna förmånsvärde bil 2026',
    'förmånsbil nettokostnad per månad',
    'bränsleförmån skatt elbil',
    'förmånsbil vs privatköp kalkyl',
    'förmånsvärde elbil kalkylator',
  ],
  alternates: {
    canonical: 'https://www.formansbilskalkylen.se',
  },
  openGraph: {
    title: 'Förmånsbilskalkylator 2026 – Räkna ut förmånsvärde & nettokostnad',
    description:
      'Beräkna den verkliga nettokostnaden för förmånsbil 2026. Se skatteeffekt vid marginalskatt, bränsleförmån och jämför förmånsbil mot privatköp.',
    url: 'https://www.formansbilskalkylen.se',
    siteName: 'Formansbilskalkylen.se',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Förmånsbilskalkylator 2026 – Räkna ut förmånsvärde & nettokostnad',
    description:
      'Beräkna den verkliga nettokostnaden för förmånsbil 2026. Se skatteeffekt vid marginalskatt, bränsleförmån och jämför förmånsbil mot privatköp.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'tradedoubler-verification': 'TRADEDOUBLER_ID_PLACEHOLDER',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hur beräknas förmånsvärdet för en elbil 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Förmånsvärdet för en elbil 2026 beräknas enligt Skatteverkets schablon där grundbeloppet, räntedelen och prisdelen summeras. För elbilar appliceras en miljöbilsnedsättning som kan halvera förmånsvärdet jämfört med en motsvarande fossilbil, upp till max 50% nedsättning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad är skillnaden mellan förmånsbil och tjänstebil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En tjänstebil är en bil som arbetsgivaren ställer till förfogande för tjänsteresor. När du även använder bilen privat blir det en förmånsbil och du betalar skatt på förmånsvärdet. Alla förmånsbilar är tjänstebilar, men inte alla tjänstebilar är förmånsbilar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Lönar det sig att ta förmånsbil med 50% marginalskatt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vid hög marginalskatt blir förmånsbilen fördelaktig eftersom skatteavdraget per krona förmånsvärde är högre. En elbil med miljöjustering vid 50% marginalskatt ger ofta en nettokostnad under 3 000 kr/mån, vilket är betydligt billigare än att äga motsvarande bil privat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur beskattas drivmedelsförmån om företaget betalar bensinen eller elen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Om arbetsgivaren betalar drivmedel för privat körning ska du förmånsbeskattas för drivmedlets marknadsvärde multiplicerat med 1,2 enligt Skatteverkets schablon. För elbilar gäller motsvarande schablon för hemmaladdning om arbetsgivaren står för elen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Påverkar förmånsbil min framtida pension?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vid bruttolöneavdrag minskar din pensionsgrundande inkomst (PGI) och sjukpenninggrundande inkomst (SGI) eftersom avdraget sänker din bruttolön. Vid nettolöneavdrag påverkas varken PGI eller SGI eftersom du betalar med redan skattade pengar.',
      },
    },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Förmånsbilskalkylator 2026',
  url: 'https://www.formansbilskalkylen.se',
  description:
    'Oberoende kalkylator för att beräkna förmånsvärde, nettokostnad och bränsleförmån för tjänstebil 2026. Jämför förmånsbil mot privatköp.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  inLanguage: 'sv-SE',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Formansbilskalkylen.se',
    url: 'https://www.formansbilskalkylen.se',
  },
};

const financialProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'Förmånsbilskalkylator',
  url: 'https://www.formansbilskalkylen.se',
  description:
    'Beräkna nettokostnad för förmånsbil 2026 inklusive förmånsvärde, marginalskatt, bränsleförmån och jämförelse mot privat bilägande.',
  category: 'Tax & Benefits Calculator',
  inLanguage: 'sv-SE',
  provider: {
    '@type': 'Organization',
    name: 'Formansbilskalkylen.se',
    url: 'https://www.formansbilskalkylen.se',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <head>
        <meta name="tradedoubler-verification" content="TRADEDOUBLER_ID_PLACEHOLDER" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
        />
      </body>
    </html>
  );
}
