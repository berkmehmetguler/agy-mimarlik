"use client";

import React, { useState } from "react";
import { IoSparklesSharp, IoMailSharp, IoLockClosedSharp, IoArrowBackSharp } from "react-icons/io5";
import { RiShieldKeyholeFill } from "react-icons/ri";
import Link from "next/link";

const ForgotPasswordSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate password reset request
    setTimeout(() => {
      setMessage("Şifre sıfırlama linki e-posta adresinize gönderildi.");
      setIsSubmitting(false);
    }, 1500);
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
        
        {/* Navigation Links */}
        <div className="absolute top-6 right-6">
          <p className="text-gray-600">
            <span>Hesabınız Var Mı? </span>
            <Link
              href="/login"
              className="font-semibold text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
            >
              Giriş Yap
            </Link>
          </p>
        </div>

        <div className="max-w-md mx-auto">
          
          {/* Premium Reset Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-8 lg:p-10">
            
            {/* Header */}
            <div className="text-center mb-8">
              
              {/* Logo/Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-4 rounded-2xl shadow-lg">
                  <RiShieldKeyholeFill className="text-white" size={32} />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0A062]/10 to-[#D4B876]/10 border border-[#C0A062]/20 text-[#2D2D2D] px-4 py-2 rounded-full mb-4 text-sm font-semibold">
                <IoLockClosedSharp size={14} />
                <span>Güvenli Sıfırlama</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2D2D] mb-3">
                Şifremi Unuttum
              </h1>
              
              <p className="text-gray-600 leading-relaxed">
                Şifrenizi sıfırlamak için e-posta adresinizi girin. 
                <span className="text-[#C0A062] font-medium"> Güvenli bir link</span> göndereceğiz.
              </p>
            </div>

            {!message ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                    E-posta Adresiniz
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
                  <p className="text-xs text-gray-500 mt-2">
                    Kayıtlı e-posta adresinizi girin
                  </p>
                </div>

                {/* Reset Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                    {isSubmitting ? "Gönderiliyor..." : "Şifre Sıfırlama Linki Gönder"}
                  </span>
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
                  >
                    <IoArrowBackSharp size={16} />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">E-posta Gönderildi!</h3>
                  </div>
                  <p className="text-sm">{message}</p>
                  <p className="text-xs mt-2 text-green-600">
                    E-postanızı kontrol edin ve spam klasörünü de unutmayın.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setMessage("");
                      setEmail("");
                    }}
                    className="w-full bg-white/80 border border-[#C0A062]/20 text-[#2D2D2D] font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg"
                  >
                    Tekrar Dene
                  </button>
                  
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-[#C0A062] hover:text-[#D4B876] transition-colors duration-300"
                  >
                    <IoArrowBackSharp size={16} />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </div>
            )}

            {/* Security Note */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <IoLockClosedSharp className="text-blue-600" size={16} />
                <h4 className="font-semibold text-blue-900 text-sm">Güvenlik Notu</h4>
              </div>
              <p className="text-xs text-blue-700">
                Şifre sıfırlama linkimiz 24 saat geçerlidir ve tek kullanımlıktır. 
                Güvenliğiniz için linki kimseyle paylaşmayın.
              </p>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <span>Güvenli şifre sıfırlama</span>
              <div className="flex items-center gap-1 text-[#C0A062]">
                <IoSparklesSharp size={14} />
                <span className="font-medium">AGY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordSection;