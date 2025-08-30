"use client";

import Link from "next/link";

export function AtolyeAIPromo() {
  return (
    <section id="atolye-promo" className="py-20 bg-[#F3F0E9]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-[#2D2D2D]">
          Hayal Edin, Birlikte Tasarlayalım:{" "}
          <Link
            href="/atolye"
            className="underline-offset-2 underline decoration-[#C0A062]"
          >
            ATOLYE AI
          </Link>
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Aklınızdaki mobilyayı tarif edin veya bir eskizini yükleyin. Yapay
          zeka destekli atölyemiz, fikrinizi saniyeler içinde görsel bir
          tasarıma dönüştürsün.
        </p>
        <Link
          href="/atolye"
          className="bg-[#C0A062] text-[#2D2D2D] font-bold py-4 px-8 rounded-full text-lg hover:opacity-90 transition-all hover:shadow-lg hover:outline-1 hover:decoration-white hover:text-white inline-block"
        >
          Hemen Deneyin
        </Link>
      </div>
    </section>
  );
}
