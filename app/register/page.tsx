"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RegisterSection: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.name }, // Supabase profil metadata
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Kayıt başarılı! Lütfen e-postanızı doğrulayın.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push("/login");
      });
    }

    setLoading(false);
  };

  return (
    <section className="relative h-screen pt-52 xs:pt-40 pb-16 md:pb-24 lg:pb-52 overflow-hidden">
      <p className="absolute top-0 right-0 mt-32 xs:mt-12 mr-5">
        <span> Hesabınız Var Mı? </span>
        <a
          href="/login"
          className="inline-block font-medium underline hover:text-[#C0A062]"
        >
          Giriş Yap
        </a>
      </p>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleRegister}>
            <h3 className="text-4xl text-center font-medium mb-10">Kayıt Ol</h3>

            {/* Full Name */}
            <label className="block pl-4 mb-3 text-sm font-medium">
              Ad Soyad
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
            />

            {/* Email */}
            <label className="block pl-4 mb-3 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
            />

            {/* Password */}
            <label className="block pl-4 mb-3 text-sm font-medium">Şifre</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
            />

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-white hover:text-[#C0A062] border border-[#C0A062] bg-[#C0A062] hover:bg-white rounded-full transition duration-200"
            >
              {loading ? "Kayıt olunuyor..." : "Hesap Oluştur"}
            </button>

            {/* Message */}
            {message && (
              <p className="text-center mt-4 text-sm text-red-600">{message}</p>
            )}

            <span className="block text-center py-4 mx-auto text-gray-700">
              veya
            </span>

            {/* Google Register */}
            <a
              href="#"
              className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-black hover:text-white border border-teal-900 hover:bg-gray-700 rounded-full transition duration-200"
            >
              <FcGoogle size={35} />
              <span className="ml-4">Google ile Kayıt Ol</span>
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
