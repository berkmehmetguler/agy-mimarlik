"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import UserDropdown from "./UserDropDown";

import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseLargeFill } from "react-icons/ri";
import Link from "next/link";

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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    checkSession();

    // Session değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setSession(session);
      }
    );

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
        scrolled || isMenuOpen ? "bg-[#F3F0E9] text-black shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={"/"}
          className="text-4xl md:text-5xl font-serif font-bold cursor-pointer text-[#2D2D2D]"
        >
          AGY
        </Link>

        {/* Desktop Menü */}
        <ul className="hidden md:flex items-center space-x-8 mx-auto underline-offset-2 underlime ">
          <li>
            <Link
              href="/projects"
              className="font-bold text-lg tracking-widest  hover:text-[#C0A062] transition-colors"
            >
              Projelerimiz
            </Link>
          </li>
          <li>
            <Link
              href="/atolye"
              className="font-extrabold text-md  text-[#C0A062] p-4 hover:outline-2 rounded-full hover:outline-[#C0A062] hover:opacity-80 transition-opacity"
            >
              ATOLYE AI
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="font-bold text-lg tracking-widest  hover:text-[#C0A062] transition-colors"
            >
              İletişim
            </Link>
          </li>
        </ul>

        {/* Sağ buton */}
        <div className="hidden md:flex">
          {session && <UserDropdown />}
          {session ? (
            <Link
              href="/"
              onClick={handleLogout}
              className="px-6 py-2 text-bold text-xl bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
            >
              Çıkış Yap
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 text-bold text-xl bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition-all"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        <div className="flex items-center">
          {session && (
            <div className="md:hidden">
              {" "}
              <UserDropdown />
            </div>
          )}
          {/* Mobil Menü Butonu */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <RiCloseLargeFill size={25}/> : <RiMenu3Fill size={25} className="p=4" />}
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
            <Link
              href="/projects"
              className="text-lg hover:text-[#C0A062]"
            >
              Projelerimiz
            </Link>
          </li>
          <li>
            <Link
              href="/atolye"
              className="text-lg font-bold text-[#C0A062] hover:opacity-80 "
            >
              ATOLYE AI
            </Link>
          </li>
          <li>
            <Link
            href="/contact"
              className="text-lg hover:text-[#C0A062]"
            >
              İletişim
            </Link>
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
