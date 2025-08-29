"use client";

import React from "react";

const ForgotPasswordSection: React.FC = () => {
  return (
    <section className="relative h-screen pt-52 xs:pt-40 pb-16 md:pb-24 lg:pb-52 overflow-hidden">
      {/* Login link */}
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
          <form>
            <h3 className="text-4xl text-center font-medium mb-10 text-[#C0A062]">
              Şifremi Unuttum
            </h3>

            <p className="text-center mb-8 text-[#646A69]">
              Şifrenizi sıfırlamak için lütfen e-posta adresinizi girin.
            </p>

            <label className="block pl-4 mb-3 text-sm font-medium text-[#646A69]">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 mb-8 outline-none ring-offset-0 focus:ring-2 focus:ring-[#C0A062] shadow rounded-full"
            />

            <a
              href="#"
              className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-white hover:text-[#C0A062] border border-[#C0A062] bg-[#C0A062] hover:bg-white rounded-full transition duration-200"
            >
              Şifre Sıfırlama Linki Gönder
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordSection;
