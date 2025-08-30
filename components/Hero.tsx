"use client";

import Link from "next/link";
import { RiCompasses2Line } from "react-icons/ri";

export function Hero() {

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop')",
      }}
    >
      {/* Koyu katman */}
      <div className="absolute inset-0 bg-black/50" />

      {/* İçerik */}
      <div className="relative z-10 text-center text-white p-6">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4 leading-tight">
          Ustalığı Sanatla Buluşturuyoruz
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki
          mekanları gerçeğe dönüştürüyoruz.
        </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/projects"
            className="group bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-8 rounded-full text-lg hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-300  transform hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span> 
              Projelerimizi İnceleyin
            </span>
          </Link>

         <Link
            href="/atolye"
            className="group bg-white text-[#C0A062] border-2 border-[#C0A062] font-bold py-4 px-8 rounded-full text-lg hover:bg-gradient-to-r hover:from-[#C0A062] hover:to-[#D4B876] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center gap-2"
          >
            
           <RiCompasses2Line size={23} /> 
           <span>Atolye AI</span>
          </Link>

          </div>
      </div>
    </section>
  );
}
