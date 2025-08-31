import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Chatbot } from "@/components/Chatbot";
import { ChatbotToggle } from "@/components/ChatbotToggle";
import { Suspense } from "react";

export const metadata = {
  title: 'AGY Mimarlık - Ustalığı Sanatla Buluşturuyoruz | AI Destekli İç Mimarlık',
  description: 'Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki mekanları gerçeğe dönüştürüyoruz. AI destekli eskizden tasarım ve yazıdan tasarım hizmetleri.',
  keywords: 'mimarlık, iç mimarlık, tasarım, AI tasarım, eskizden tasarım, yazıdan tasarım, mutfak tasarımı, yatak odası, oturma odası, AGY Mimarlık',
  authors: [{ name: 'AGY Mimarlık' }],
  creator: 'AGY Mimarlık',
  publisher: 'AGY Mimarlık',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agy-mimarlik.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AGY Mimarlık - Ustalığı Sanatla Buluşturuyoruz',
    description: 'Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki mekanları gerçeğe dönüştürüyoruz. AI destekli eskizden tasarım ve yazıdan tasarım hizmetleri.',
    url: 'https://agy-mimarlik.vercel.app',
    siteName: 'AGY Mimarlık',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AGY Mimarlık - AI Destekli İç Mimarlık Hizmetleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGY Mimarlık - Ustalığı Sanatla Buluşturuyoruz',
    description: 'AI destekli eskizden tasarım ve yazıdan tasarım hizmetleri ile hayallerinizdeki mekanları gerçeğe dönüştürüyoruz.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AGY Mimarlık" />
        <meta name="application-name" content="AGY Mimarlık" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1f2937" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.modelslab.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        {/* Header is client */}
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        {/* Chat widget (client) */}
        <Suspense>
          <Chatbot />
          <ChatbotToggle />
        </Suspense>
      </body>
    </html>
  );
}
