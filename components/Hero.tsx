"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiCompasses2Line, RiArrowRightLine, RiStarFill } from "react-icons/ri";
import { IoSparklesSharp } from "react-icons/io5";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F1E8] via-white to-[#F8F5F0]">
      
      {/* Background Image with Mobile-First Approach */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed' // Mobile'da fixed attachment iOS safari sorunlu
        }}
      >
        {/* Mobile-Optimized Sophisticated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/95 via-[#2D2D2D]/85 to-[#2D2D2D]/75 sm:from-[#2D2D2D]/90 sm:via-[#2D2D2D]/75 sm:to-[#2D2D2D]/60 md:from-[#2D2D2D]/85 md:via-[#2D2D2D]/70 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/98 via-[#2D2D2D]/30 to-[#2D2D2D]/60 sm:from-[#2D2D2D]/95 sm:via-transparent sm:to-[#2D2D2D]/40 md:from-[#2D2D2D]/90 md:to-[#2D2D2D]/20" />
      </div>

      {/* Mobile-Optimized Geometric Accent Elements */}
      <div className="absolute top-6 right-2 w-12 h-12 sm:top-10 sm:right-4 sm:w-16 sm:h-16 md:top-20 md:right-20 md:w-32 md:h-32 bg-gradient-to-br from-[#C0A062]/20 to-[#D4B876]/10 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-10 left-2 w-16 h-16 sm:bottom-16 sm:left-4 sm:w-24 sm:h-24 md:bottom-32 md:left-16 md:w-48 md:h-48 bg-gradient-to-tr from-[#C0A062]/15 to-transparent rounded-full blur-xl sm:blur-2xl" />

      {/* Main Content - Mobile-First Layout */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto pt-safe">
        
        {/* Premium Badge - Mobile Optimized */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/98 backdrop-blur-sm text-[#2D2D2D] px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full mb-4 sm:mb-6 md:mb-8 shadow-xl border border-[#C0A062]/30 animate-fade-in">
          <RiStarFill className="text-[#C0A062] flex-shrink-0" size={12} />
          <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">Premium Furniture Solutions</span>
        </div>

        {/* Main Headline - Mobile-First Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight animate-slide-up">
          <span className="block">Ustalığı</span>
          <span className="block bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent">
            Sanatla
          </span>
          <span className="block">Buluşturuyoruz</span>
        </h1>

        {/* Subtitle - Mobile Readable */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0 animate-fade-in-delayed">
          Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki
          <span className="text-[#C0A062] font-medium"> premium mekanları</span> gerçeğe dönüştürüyoruz.
        </p>

        {/* Call-to-Action Buttons - Mobile-First Design */}
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row justify-center items-center w-full max-w-lg sm:max-w-none mx-auto animate-bounce-in">
          
          {/* Primary CTA - Mobile Optimized */}
          <Link
            href="/projects"
            className="group relative bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-xl sm:rounded-2xl text-base sm:text-lg hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[#C0A062]/25 inline-flex items-center justify-center gap-2 sm:gap-3 border border-[#C0A062]/30 backdrop-blur-sm w-full sm:w-auto min-h-[60px] touch-manipulation"
          >
            <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <span className="whitespace-nowrap">Projelerimizi Keşfedin</span>
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" size={18} />
            </span>
          </Link>

          {/* Secondary CTA - Mobile Optimized */}
          <Link
            href="/atolye"
            className="group relative bg-white/98 backdrop-blur-sm text-[#2D2D2D] border-2 border-white/60 font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-xl sm:rounded-2xl text-base sm:text-lg hover:bg-gradient-to-r hover:from-[#C0A062] hover:to-[#D4B876] hover:text-white hover:border-[#C0A062] transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto min-h-[60px] touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C0A062]/10 to-[#D4B876]/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <RiCompasses2Line className="group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" size={20} />
              <span className="whitespace-nowrap">Atolye AI</span>
            </span>
          </Link>

        </div>

        {/* Stats or Trust Indicators - Mobile-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mt-12 sm:mt-16 text-white/80 max-w-lg sm:max-w-none mx-auto">
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-1">500+</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide leading-tight">Tamamlanan<br className="sm:hidden" /><span className="hidden sm:inline"> </span>Proje</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-1">30+</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide leading-tight">Yıllık<br className="sm:hidden" /><span className="hidden sm:inline"> </span>Deneyim</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-1">AI</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide leading-tight">Destekli<br className="sm:hidden" /><span className="hidden sm:inline"> </span>Tasarım</div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator - Mobile Friendly */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce cursor-pointer hover:text-white/80 transition-colors duration-300" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-light hidden sm:block">Keşfet</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </section>
  );
}