"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { IoSparklesSharp, IoLockClosedSharp, IoMailSharp, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { RiStarFill } from "react-icons/ri";
import { usePremiumAlert } from "@/components/PremiumAlert"
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { success, error, AlertComponent } = usePremiumAlert();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      error("Eksik Bilgi", "Email ve şifre alanları doldurulması zorunludur.");
      setIsLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      error("Giriş Başarısız", "E-mail veya şifreniz hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
      console.log(authError.message);
    } else {
      success(
        "Hoş Geldiniz! 🎉", 
        "Başarıyla giriş yaptınız. Premium Atölye'ye yönlendiriliyorsunuz...",
        2000
      );
      setTimeout(() => {
        router.push("/atolye");
      }, 2000);
      console.log(data);
    }
    
    setIsLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F8F5F0] py-20 pt-32 overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#C0A062]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#D4B876]/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,#C0A062_25px,#C0A062_26px,_transparent_27px,_transparent_74px,#C0A062_75px,_#C0A062_76px,_transparent_77px),_linear-gradient(#C0A062_1px,_transparent_1px)] bg-[length:75px_75px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Navigation Link */}
        <div className="absolute top-6 right-6">
          <p className="text-gray-600">
            <span>Hesabınız Yok Mu? </span>
            <Link
              href="/register"
              className="font-semibold text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>

        <div className="max-w-md mx-auto">
          
          {/* Premium Login Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-8 lg:p-10">
            
            {/* Header */}
            <div className="text-center mb-8">
              
              {/* Logo/Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-4 rounded-2xl shadow-lg">
                  <RiStarFill className="text-white" size={32} />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0A062]/10 to-[#D4B876]/10 border border-[#C0A062]/20 text-[#2D2D2D] px-4 py-2 rounded-full mb-4 text-sm font-semibold">
                <IoLockClosedSharp size={14} />
                <span>Güvenli Giriş</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2D2D] mb-3">
                Hoş Geldiniz
              </h1>
              
              <p className="text-gray-600 leading-relaxed">
                Premium tasarım deneyimine devam etmek için giriş yapın.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {message && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-center">
                  <p className="font-medium">{message}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                  Email Adresiniz
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoMailSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                  Şifreniz
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoLockClosedSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
                  >
                    {passwordVisible ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/forget-password"
                  className="text-sm font-medium text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
                >
                  Şifremi Unuttum
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {isLoading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </span>
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#C0A062]/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">veya</span>
                </div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                className="group relative w-full bg-white/80 border border-[#C0A062]/20 text-[#2D2D2D] font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-3">
                  <FcGoogle size={24} />
                  Google ile Devam Et
                </span>
              </button>
            </form>

            {/* Bottom Text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Giriş yaparak{" "}
                <Link href="#" className="text-[#C0A062] hover:underline">
                  Kullanım Şartları
                </Link>{" "}
                ve{" "}
                <Link href="#" className="text-[#C0A062] hover:underline">
                  Gizlilik Politikası
                </Link>
                &apos;nı kabul etmiş olursunuz.
              </p>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <span>Premium deneyim ile güçlendirildi</span>
              <div className="flex items-center gap-1 text-[#C0A062]">
                <IoSparklesSharp size={14} />
                <span className="font-medium">AGY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Alert Component */}
      <AlertComponent />
    </section>
  );
};

export default LoginPage;