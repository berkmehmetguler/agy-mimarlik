"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoSparklesSharp, IoPersonSharp, IoMailSharp, IoLockClosedSharp } from "react-icons/io5";
import { RiStarFill, RiUserAddFill } from "react-icons/ri";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { usePremiumAlert } from "@/components/PremiumAlert";
import Link from "next/link";

const RegisterSection: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { success, error, AlertComponent } = usePremiumAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!formData.name || !formData.email || !formData.password) {
      error("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      error("Geçersiz Şifre", "Şifreniz en az 6 karakter olmalıdır.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.name } },
    });

    if (authError) {
      error("Kayıt Başarısız", authError.message);
    } else {
      success(
        "Kayıt Başarılı! 🎉",
        "Hesabınız başarıyla oluşturuldu. E-postanızı doğruladıktan sonra giriş yapabilirsiniz.",
        3000
      );
      setTimeout(() => router.push("/login"), 3000);
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F8F5F0] py-20 pt-32 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#C0A062]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#D4B876]/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,#C0A062_25px,#C0A062_26px,_transparent_27px,_transparent_74px,#C0A062_75px,_#C0A062_76px,_transparent_77px),_linear-gradient(#C0A062_1px,_transparent_1px)] bg-[length:75px_75px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Login Link */}
        <div className="absolute top-6 right-6">
          <p className="text-gray-600">
            <span>Zaten Hesabınız Var Mı? </span>
            <Link href="/login" className="font-semibold text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300">
              Giriş Yap
            </Link>
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-4 rounded-2xl shadow-lg">
                  <RiUserAddFill className="text-white" size={32} />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0A062]/10 to-[#D4B876]/10 border border-[#C0A062]/20 text-[#2D2D2D] px-4 py-2 rounded-full mb-4 text-sm font-semibold">
                <RiStarFill size={14} />
                <span>Premium Üyelik</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2D2D] mb-3">
                Bize Katılın
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Premium tasarım dünyasına adım atın ve hayallerinizi gerçeğe dönüştürün.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Ad Soyad</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoPersonSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] transition-all duration-300"
                    placeholder="Adınız ve Soyadınız"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Email Adresiniz</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoMailSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] transition-all duration-300"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Şifre Oluşturun</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoLockClosedSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] transition-all duration-300"
                    placeholder="En az 6 karakter"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Şifreniz en az 6 karakter olmalıdır</p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {loading ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
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

              {/* Google Register */}
              <button
                type="button"
                className="group relative w-full bg-white/80 border border-[#C0A062]/20 text-[#2D2D2D] font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-3">
                  <FcGoogle size={24} />
                  Google ile Kayıt Ol
                </span>
              </button>
            </form>

            {/* Benefits */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-2xl border border-[#C0A062]/10">
              <h4 className="font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
                <RiStarFill className="text-[#C0A062]" size={16} />
                Premium Avantajlar
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full"></div>
                  AI destekli tasarım araçları
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full"></div>
                  Sınırsız proje oluşturma
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full"></div>
                  Özel tasarım danışmanlığı
                </li>
              </ul>
            </div>

            {/* Bottom Text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Hesap oluşturarak{" "}
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

export default RegisterSection;
