"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import UserDropdown from "./UserDropDown";
import { PiBrainBold } from "react-icons/pi";
import { RiLoginBoxLine, RiMenu3Fill, RiCloseLargeFill } from "react-icons/ri";
import Link from "next/link";

import { RiCompasses2Line } from "react-icons/ri";

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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Menü dışında tıklama kontrolü
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
    router.push("/");
  };

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen || defaultBlack
          ? "bg-[#F3F0E9] text-black shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={"/"}
          className="text-4xl md:text-6xl font-serif font-bold cursor-pointer text-[#2D2D2D]"
          onClick={() => setIsMenuOpen(false)}
        >
          AGY
        </Link>

        {/* Desktop Menü */}
        <ul className="hidden lg:flex items-center space-x-8 mx-auto underline-offset-2 decoration-2 decoration-transparent hover:decoration-[#C0A062] transition-all uppercase">
          <li>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={`font-bold text-lg tracking-widest transition-colors duration-150 easy-in-out ${
                isHomePage
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              } hover:text-[#C0A062]`}
            >
              Projelerimiz
            </Link>
          </li>
          <li>
            <Link
              href="/atolye"
              onClick={() => setIsMenuOpen(false)}
              className="font-extrabold text-md flex text-[#C0A062] p-4 gap-2 rounded-full hover:decoration-[#6a5e46] underline hover:underline-offset-1 hover:scale-110 ease-in-out hover:opacity-80 transition-opacity"
            >
              <PiBrainBold
              className="hidden"
                title="ATOLYE AI"
                size={25}
                
              />{" "}
              <RiCompasses2Line
               className="flex"
                title="ATOLYE AI"
                size={25}
         
              />
              ATOLYE AI
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`font-bold text-lg tracking-widest transition-colors duration-150 easy-in-out ${
                isHomePage
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              } hover:text-[#C0A062]`}
            >
              İletişim
            </Link>
          </li>
        </ul>

        {/* Sağ buton */}
        <div className="hidden lg:flex">
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
              onClick={() => setIsMenuOpen(false)}
              className="flex bg-[#C0A062] text-[#2D2D2D] font-bold md:py-4 md:px-8 rounded-full text-lg uppercase hover:opacity-90 transition-all hover:shadow-lg hover:outline-1 hover:decoration-white hover:text-white items-center gap-2"
            >
              <RiLoginBoxLine size={25} /> Giriş Yap
            </Link>
          )}
        </div>

        <div className="flex items-center">
          {session && (
            <div className="md:hidden">
              <UserDropdown />
            </div>
          )}
          <button
            className="lg:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <RiCloseLargeFill size={25} />
            ) : (
              <RiMenu3Fill size={25} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobil Menü */}
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
              <Link
                href="/"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 bg-[#C0A062] text-white rounded-full font-medium hover:bg-[#A18E4A] transition"
              >
                Çıkış Yap
              </Link>
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
