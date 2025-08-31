import { Hero } from '@/components/Hero';
import { AtolyeAIPromo } from '@/components/AtolyeAI/AtolyeAIPromo';
import { FeaturedProjects } from '@/components/FeaturedProjects';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AGY Mimarlık',
    description: 'Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki mekanları gerçeğe dönüştürüyoruz. AI destekli eskizden tasarım ve yazıdan tasarım hizmetleri.',
    url: 'https://agy-mimarlik.vercel.app',
    logo: 'https://agy-mimarlik.vercel.app/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul'
    },
    sameAs: [
      'https://www.instagram.com/agy_mimarlik',
      'https://www.linkedin.com/company/agy-mimarlik'
    ],
    offers: {
      '@type': 'Service',
      name: 'AI Destekli İç Mimarlık Hizmetleri',
      description: 'Eskizden tasarım ve yazıdan tasarım hizmetleri ile modern iç mimarlık çözümleri',
      provider: {
        '@type': 'Organization',
        name: 'AGY Mimarlık'
      },
      areaServed: 'TR',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://agy-mimarlik.vercel.app/atolye'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AtolyeAIPromo />
      <FeaturedProjects />
    </>
  );
}