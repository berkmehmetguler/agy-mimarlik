"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? "bg-[#F3F0E9] shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => go("/")}
          className="text-3xl font-serif font-bold text-[#2D2D2D]"
        >
          AGY
        </button>

        {/* Desktop Menü */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <button
              onClick={() => go("/projects")}
              className="font-medium hover:text-[#C0A062] transition-colors"
            >
              Projelerimiz
            </button>
          </li>
          <li>
            <button
              onClick={() => go("/atolye")}
              className="font-bold text-[#C0A062] hover:opacity-80 transition-opacity"
            >
              ATOLYE AI
            </button>
          </li>
          <li>
            <button
              onClick={() => go("/contact")}
              className="font-medium hover:text-[#C0A062] transition-colors"
            >
              İletişim
            </button>
          </li>
        </ul>

        {/* Mobil Menü Butonu */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobil Menü İçeriği */}
      <div
        className={`absolute top-full left-0 w-full bg-[#F3F0E9] md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen shadow-md" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 py-8">
          <li>
            <button
              onClick={() => go("/projects")}
              className="text-lg hover:text-[#C0A062]"
            >
              Projelerimiz
            </button>
          </li>
          <li>
            <button
              onClick={() => go("/atolye")}
              className="text-lg font-bold text-[#C0A062] hover:opacity-80"
            >
              ATOLYE AI
            </button>
          </li>
          <li>
            <button
              onClick={() => go("/contact")}
              className="text-lg hover:text-[#C0A062]"
            >
              İletişim
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
