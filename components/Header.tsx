"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import UserDropdown from "./UserDropDown";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null); // Supabase session
  const router = useRouter();

  useEffect(() => {
    // Scroll kontrolü
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    // Supabase session kontrolü
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    checkSession();

    // Session değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(( _event: string, session: Session | null) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      listener.subscription.unsubscribe();
    };
  }, []);

  const go = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
        <ul className="hidden md:flex items-center space-x-8 mx-auto">
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

        {/* Sağ buton */}
        <div className="hidden md:flex">
          {session && (
          <UserDropdown />
          )}
          {session ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
            >
              Çıkış Yap
            </button>
          ) : (
            <button
              onClick={() => go("/login")}
              className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
            >
              Giriş Yap
            </button>
          )}
        </div>

     <div className="flex items-center">
              {session && (
     <div className="md:hidden">     <UserDropdown/></div>
          )}
        {/* Mobil Menü Butonu */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
     </div>
      </nav>

      {/* Mobil Menü */}
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
          <li>
          
          {session ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
            >
              Çıkış Yap
            </button>
          ) : (
            <button
              onClick={() => go("/login")}
              className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
            >
              Giriş Yap
            </button>
          )}
          </li>
        </ul>
      </div>
    </header>
  );
}
