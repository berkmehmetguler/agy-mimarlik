"use client";

import Link from "next/link";
import { IoSparklesSharp, IoRocketSharp } from "react-icons/io5";
import { RiStarFill, RiMagicLine } from "react-icons/ri";

export function AtolyeAIPromo() {
  return (
    <section id="atolye-promo" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#2D2D2D] via-[#3A3A3A] to-[#2D2D2D] relative overflow-hidden">
      
      {/* Premium Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 opacity-15 sm:opacity-20">
        <div className="absolute top-8 left-4 w-32 h-32 sm:top-20 sm:left-20 sm:w-96 sm:h-96 bg-gradient-to-br from-[#C0A062] to-[#D4B876] rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-8 right-4 w-28 h-28 sm:bottom-20 sm:right-20 sm:w-80 sm:h-80 bg-gradient-to-tl from-[#D4B876] to-[#C0A062] rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-64 sm:h-64 bg-gradient-to-r from-[#C0A062] to-[#D4B876] rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern - Mobile Responsive */}
      <div className="absolute inset-0 opacity-3 sm:opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,#C0A062_25px,#C0A062_26px,_transparent_27px,_transparent_74px,#C0A062_75px,_#C0A062_76px,_transparent_77px),_linear-gradient(#C0A062_1px,_transparent_1px)] bg-[length:50px_50px] sm:bg-[length:75px_75px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        
        {/* AI Badge - Mobile Optimized */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#C0A062]/20 to-[#D4B876]/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-2xl border border-[#C0A062]/30 animate-fade-in">
          <RiStarFill className="text-[#C0A062] flex-shrink-0" size={16} />
          <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">AI-Powered Design</span>
        </div>
        
        {/* Main Title - Mobile-First Typography */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up">
          <span className="block">Hayal Edin,</span>
          <span className="block bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent">
            AI ile Tasarlayalım
          </span>
        </h2>
        
        {/* AI Brand - Mobile Responsive */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8 animate-fade-in-delayed">
          <RiMagicLine className="text-[#C0A062] flex-shrink-0" size={20} />
          <span className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white/90">Yapay Zeka Destekli</span>
          <Link
            href="/atolye"
            className="text-lg sm:text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-300 relative group touch-manipulation"
          >
            ATOLYE AI
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C0A062] to-[#D4B876] group-hover:w-full transition-all duration-500"></span>
          </Link>
        </div>
        
        {/* Description - Mobile Readable */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-2 sm:px-0 animate-fade-in-delayed">
          Aklınızdaki mobilyayı tarif edin veya bir eskizini yükleyin. 
          <span className="text-[#C0A062] font-medium"> Yapay zeka destekli atölyemiz</span>, 
          fikrinizi saniyeler içinde premium görsel tasarıma dönüştürsün.
        </p>

        {/* Features Grid - Mobile-First Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto animate-bounce-in">
          
          {/* Text to Design - Mobile Optimized */}
          <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#C0A062]/50 transition-all duration-500 hover:bg-white/10 touch-manipulation">
            <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mx-auto mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">Yazıdan Tasarım</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Mobilyanızı tarif edin, AI ile görselleştirin</p>
          </div>

          {/* Sketch to Render - Mobile Optimized */}
          <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#C0A062]/50 transition-all duration-500 hover:bg-white/10 touch-manipulation">
            <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mx-auto mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">Eskizden Render</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Çiziminizi yükleyin, profesyonel render alın</p>
          </div>

          {/* Premium Results - Mobile Optimized */}
          <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#C0A062]/50 transition-all duration-500 hover:bg-white/10 touch-manipulation sm:col-span-2 md:col-span-1">
            <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mx-auto mb-3 sm:mb-4">
              <RiStarFill className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">Premium Kalite</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Yüksek çözünürlük, profesyonel sonuçlar</p>
          </div>

        </div>
        
        {/* CTA Section - Mobile-First */}
        <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
          
          {/* Primary CTA - Mobile Optimized */}
          <Link
            href="/atolye"
            className="group relative bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-xl sm:rounded-2xl text-base sm:text-lg hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[#C0A062]/25 inline-flex items-center justify-center gap-2 sm:gap-3 border border-[#C0A062]/30 w-full max-w-xs sm:w-auto touch-manipulation"
          >
            <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 sm:gap-3">
              <IoRocketSharp className="group-hover:scale-125 transition-transform duration-300 flex-shrink-0" size={18} />
              <span className="whitespace-nowrap">Hemen Deneyin</span>
            </span>
          </Link>

          {/* Features Pills - Mobile Responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm max-w-lg">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-green-500/20 text-green-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold whitespace-nowrap">Ücretsiz</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-500/20 text-blue-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-semibold whitespace-nowrap">Anında Sonuç</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-purple-500/20 text-purple-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-purple-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="font-semibold whitespace-nowrap">AI Destekli</span>
            </div>
          </div>

        </div>

          {/* Stats or Trust Indicators - Mobile-First Grid */}
        {/* Stats or Trust Indicators - Premium Style */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mt-12 sm:mt-16 max-w-lg sm:max-w-none mx-auto">
  {/* Stat 1 */}
  <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-[#C0A062]/20 shadow-lg p-6 hover:border-[#C0A062]/50 transition-all duration-300">
    <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-2">
      500+
    </div>
    <div className="text-xs sm:text-sm uppercase tracking-wide text-white/90 leading-tight">
      Tamamlanan
      <br className="sm:hidden" />
      <span className="hidden sm:inline"> </span>Proje
    </div>
  </div>

  {/* Stat 2 */}
  <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-[#C0A062]/20 shadow-lg p-6 hover:border-[#C0A062]/50 transition-all duration-300">
    <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-2">
      30+
    </div>
    <div className="text-xs sm:text-sm uppercase tracking-wide text-white/90 leading-tight">
      Yıllık
      <br className="sm:hidden" />
      <span className="hidden sm:inline"> </span>Deneyim
    </div>
  </div>

  {/* Stat 3 */}
  <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-[#C0A062]/20 shadow-lg p-6 hover:border-[#C0A062]/50 transition-all duration-300">
    <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] group-hover:scale-110 transition-transform duration-300 mb-2">
      AI
    </div>
    <div className="text-xs sm:text-sm uppercase tracking-wide text-white/90 leading-tight">
      Destekli
      <br className="sm:hidden" />
      <span className="hidden sm:inline"> </span>Tasarım
    </div>
  </div>
</div>

      </div>
    </section>
  );
}