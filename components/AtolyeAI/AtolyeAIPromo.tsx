'use client';

import { useRouter } from 'next/navigation';

export function AtolyeAIPromo() {
  const router = useRouter();
  return (
    <section id="atolye-promo" className="py-20 bg-[#F3F0E9]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-[#2D2D2D]">
          Hayal Edin, Birlikte Tasarlayalım: ATOLYE AI
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Aklınızdaki mobilyayı tarif edin veya bir eskizini yükleyin. Yapay zeka
          destekli atölyemiz, fikrinizi saniyeler içinde görsel bir tasarıma dönüştürsün.
        </p>
        <button
          onClick={() => router.push('/atolye')}
          className="mt-8 bg-[#C0A062] text-[#2D2D2D] font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all"
        >
          Hemen Deneyin
        </button>
      </div>
    </section>
  );
}