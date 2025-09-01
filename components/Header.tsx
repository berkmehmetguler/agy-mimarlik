"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import UserDropdown from "./UserDropDown";

import { RiLoginBoxLine, RiMenu3Fill, RiCloseLargeFill, RiCompasses2Line } from "react-icons/ri";
import Link from "next/link";
import { usePremiumAlert } from "@/components/PremiumAlert";

type HeaderProps = {
  defaultBlack?: boolean;
};

export function Header({ defaultBlack = false }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const { success, AlertComponent } = usePremiumAlert();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    success(
      "Güle Güle! 👋",
      "Başarıyla çıkış yaptınız. Tekrar görüşmek üzere!",
      2500
    );
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  const brandIsLight = !(scrolled || isMenuOpen || defaultBlack);

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isMenuOpen || defaultBlack
          ? "bg-white/95 backdrop-blur-md text-[#2D2D2D] shadow-2xl border-b border-[#C0A062]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center overflow-visible">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold transition-all duration-500 hover:scale-105 relative ${
            brandIsLight ? "text-white drop-shadow-2xl" : "text-[#2D2D2D]"
          }`}
        >
          <span className="relative">
            <span className="absolute inset-0 bg-gradient-to-r from-[#C0A062]/20 to-[#D4B876]/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            <span className="relative">AGY</span>
          </span>
        </Link>

        {/* Desktop Menü (yapı ilk kod gibi, stil ikinciye uyumlu) */}
        <ul className="hidden lg:flex items-center space-x-12 mx-auto">
          <li>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={`relative font-bold text-base tracking-wide transition-all duration-300 group ${
                isHomePage
                  ? brandIsLight
                    ? "text-white"
                    : "text-[#2D2D2D]"
                  : "text-[#2D2D2D]"
              } hover:text-[#C0A062]`}
            >
              Projelerimiz
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C0A062] to-[#D4B876] group-hover:w-full transition-all duration-300" />
            </Link>
          </li>

          <li>
            <Link
              href="/atolye"
              onClick={() => setIsMenuOpen(false)}
              className="group relative bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold px-6 py-3 rounded-full text-sm hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 border border-[#C0A062]/20"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <RiCompasses2Line size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                ATOLYE AI
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`relative font-bold text-base tracking-wide transition-all duration-300 group ${
                isHomePage
                  ? brandIsLight
                    ? "text-white"
                    : "text-[#2D2D2D]"
                  : "text-[#2D2D2D]"
              } hover:text-[#C0A062]`}
            >
              İletişim
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C0A062] to-[#D4B876] group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
        </ul>

        {/* Sağ taraf (ilk koddaki kullanım korunur) */}
        <div className="hidden lg:flex items-center gap-4">
          {session && (
            <div className="relative z-50">
              <UserDropdown />
            </div>
          )}

          {session ? (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="group relative bg-gradient-to-r from-[#2D2D2D] to-[#4A4A4A] text-white font-bold px-6 py-3 rounded-full text-sm hover:from-[#C0A062] hover:to-[#D4B876] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Çıkış Yap</span>
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="group relative bg-white/90 backdrop-blur-sm text-[#2D2D2D] border-2 border-[#C0A062]/30 font-bold px-6 py-3 rounded-full text-sm hover:bg-gradient-to-r hover:from-[#C0A062] hover:to-[#D4B876] hover:text-white hover:border-[#C0A062] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <RiLoginBoxLine size={18} className="group-hover:scale-110 transition-transform duration-300" />
                Giriş Yap
              </span>
            </Link>
          )}
        </div>

        {/* Mobil sağ taraf */}
        <div className="flex items-center gap-2">
          {session && (
            <div className="md:hidden relative z-50">
              <UserDropdown />
            </div>
          )}
          <button
            className={`lg:hidden z-50 transition-all duration-300 p-2 rounded-lg ${
              brandIsLight ? "text-white drop-shadow-lg" : "text-[#2D2D2D]"
            }`}
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <RiCloseLargeFill size={24} /> : <RiMenu3Fill size={24} />}
          </button>
        </div>
      </nav>

      {/* Premium Alert */}
      <AlertComponent />

      {/* Mobil Menü (ilk koddaki içerik, ikinci koddaki stil) */}
      <div
        className={`absolute top-full left-0 w-full bg-[#F3F0E9] lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen shadow-md" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 py-8">
          <li>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-[#C0A062]"
            >
              Projelerimiz
            </Link>
          </li>
          <li>
            <Link
              href="/atolye"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold text-[#C0A062] hover:opacity-80"
            >
              ATOLYE AI
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-[#C0A062]"
            >
              İletişim
            </Link>
          </li>
          <li>
            {session ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
              >
                Çıkış Yap
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
              >
                Giriş Yap
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
