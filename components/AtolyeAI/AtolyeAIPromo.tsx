"use client";

import Link from "next/link";

export function AtolyeAIPromo() {
  return (
    <section id="atolye-promo" className="py-20 bg-gradient-to-br from-[#F3F0E9] via-[#F8F5EE] to-[#F3F0E9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C0A062] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#D4B876] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C0A062] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#C0A062]"></div>
          <svg className="w-8 h-8 text-[#C0A062]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#C0A062]"></div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-6 leading-tight">
          Hayal Edin, Birlikte Tasarlayalım
        </h2>
        
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="text-2xl font-serif font-bold text-[#2D2D2D]">Yapay Zeka Destekli</span>
          <Link
            href="/atolye"
            className="text-2xl font-serif font-bold bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-300 relative group"
          >
            ATOLYE AI
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C0A062] to-[#D4B876] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed mb-10">
          Aklınızdaki mobilyayı tarif edin veya bir eskizini yükleyin. Yapay
          zeka destekli atölyemiz, fikrinizi saniyeler içinde görsel bir
          tasarıma dönüştürsün.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/atolye"
            className="group bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-8 rounded-full text-lg hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-300  transform hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Hemen Deneyin</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ücretsiz</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Hızlı Sonuç</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Profesyonel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}