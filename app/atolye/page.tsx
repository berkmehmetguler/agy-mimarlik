"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabaseClient";

import { AtolyeAI } from '@/components/AtolyeAI/AtolyeAI';
import Loading from "../loading";

 export default function AtolyePage() {
      const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login"); // login sayfasına yönlendir
      } else {
        setLoading(false); // kullanıcı var, sayfayı göster
      }
    };

    checkUser();
  }, [router]);

  if (loading) return <><Loading/></>;
    
    
    return <AtolyeAI />; }