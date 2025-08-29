"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2'

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email ve şifre gerekli.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("E-mail veya Şifreniz Yanlış! " );
      console.log(error.message);

    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Başarıyla giriş yaptınız!",
        showConfirmButton: false,
        timer: 1500
        });
      router.push("/atolye"); // yönlendirme
    }
  };

  return (
    <section className="relative h-screen pt-52 xs:pt-40 pb-16 md:pb-24 lg:pb-52 overflow-hidden">
      <p className="absolute top-0 right-0 mt-32 xs:mt-12 mr-5">
        <span> Hesabınız Yok Mu? </span>
        <a
          href="/register"
          className="inline-block font-medium underline hover:text-[#C0A062]"
        >
          Kayıt Ol
        </a>
      </p>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleLogin}>
            <h3 className="text-4xl text-center font-medium mb-10">Giriş Yap</h3>

            {message && (
              <p className="text-center text-red-500 mb-4">{message}</p>
            )}

            <label className="block pl-4 mb-3 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block pl-4 mb-3 text-sm font-medium">Şifre</label>
            <div className="relative mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                className="relative w-full px-4 py-3 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4"
              >
                👁
              </button>
            </div>

            <div className="text-right mb-6">
              <a
                href="/forget-password"
                className="text-sm underline font-medium hover:text-[#C0A062]"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-white hover:text-[#C0A062] border border-[#C0A062] bg-[#C0A062] hover:bg-white rounded-full transition duration-200"
            >
              Login
            </button>

            <span className="block text-center py-4 mx-auto text-gray-700">or</span>

            <a
              href="#"
              className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-black hover:text-white border border-teal-900 hover:bg-gray-700 rounded-full transition duration-200"
            >
              <FcGoogle size={35} />
              <span className="ml-4">Continue with Google</span>
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
