"use client";

import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

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
        <button
          onClick={() => router.push("/projects")}
          className="bg-[#C0A062] text-[#2D2D2D] font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-all"
        >
          Projelerimizi Keşfedin
        </button>
      </div>
    </section>
  );
}
