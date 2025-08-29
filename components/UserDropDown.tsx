"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabaseClient";

export default function UserDropdown() {
  const [session, setSession] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mevcut session
    supabase.auth.getSession().then(res => setSession(res.data.session));

    // Session değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Dropdown dışında tıklayınca kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      router.push("/"); // çıkış sonrası anasayfa
    }
  };

  if (!session) {
    // Giriş yapılmamışsa sadece Giriş Yap butonu
    return (
      <button
        onClick={() => router.push("/login")}
        className="px-4 py-2 bg-[#C0A062] text-white rounded-full hover:bg-[#A18E4A] transition"
      >
        Giriş Yap
      </button>
    );
  }

  return (
    <div className="relative " ref={dropdownRef}>
      <img
        id="avatarButton"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 me-4 rounded-full border-2 border-[#C0A062] object-center cursor-pointer"
        src="/default-avatar.jpg"
        alt="User avatar"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>{session.user?.user_metadata?.full_name || "User"}</div>
            <div className="font-medium truncate">{session.user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/earnings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Earnings
              </button>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
