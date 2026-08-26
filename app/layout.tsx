import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.formansbilskalkylen.se'),
  title: 'Förmånsbilskalkylen 2026 – Räkna förmånsvärde & skatt på tjänstebil',
  description:
    'Vad kostar förmånsbilen efter skatt? Beräkna Skatteverkets förmånsvärde för elbil, hybrid och bensin samt jämför netto- mot bruttolöneavdrag.',
  alternates: {
    canonical: 'https://www.formansbilskalkylen.se',
  },
  openGraph: {
    title: 'Förmånsbilskalkylen 2026 – Räkna förmånsvärde & skatt på tjänstebil',
    description:
      'Vad kostar förmånsbilen efter skatt? Beräkna Skatteverkets förmånsvärde för elbil, hybrid och bensin samt jämför netto- mot bruttolöneavdrag.',
    url: 'https://www.formansbilskalkylen.se',
    siteName: 'Formansbilskalkylen.se',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Förmånsbilskalkylen 2026 – Räkna förmånsvärde & skatt på tjänstebil',
    description:
      'Vad kostar förmånsbilen efter skatt? Beräkna Skatteverkets förmånsvärde för elbil, hybrid och bensin samt jämför netto- mot bruttolöneavdrag.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hur beräknas förmånsvärdet på en elbil 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Förmånsvärdet beräknas utifrån bilens nybilspris satt i relation till en jämförbar fossilbil via Skatteverkets schablon, vilket sänker det beskattningsbara förmånsvärdet avsevärt för elbilar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad skiljer bruttolöneavdrag från nettolöneavdrag för förmånsbil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vid nettolöneavdrag betalar du med redan skattade pengar vilket minskar förmånsvärdet krona för krona. Vid bruttolöneavdrag dras summan före skatt vilket även minskar din pensionsgrundande inkomst och SGI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur beskattas drivmedel vid fri bil och tjänstekörning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Om arbetsgivaren betalar drivmedlet för privat körning ska du förmånsbeskattas för drivmedlets marknadsvärde multiplicerat med 1,2.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad är 7,5 basbelopps-regeln för förmånsbilar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'För bilar med ett nybilspris över 7,5 prisbasbelopp tillkommer ett extra tillägg i beräkningen på 20 % av det överstigande beloppet, vilket gör dyra premiumbilar proportionellt dyrare att ha som förmånsbil.',
      },
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Formansbilskalkylen.se',
  url: 'https://www.formansbilskalkylen.se',
  description:
    'Oberoende guide och beräkningsverktyg för tjänstebilar och förmånsbilar. Beräkna Skatteverkets officiella förmånsvärde, schablonjustering för miljöbilar och verklig nettokostnad per månad.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </body>
    </html>
  );
}
