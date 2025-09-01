"use client";

import React, { useState } from "react";
import { IoSparklesSharp, IoMailSharp, IoCallSharp, IoLocationSharp, IoPersonSharp, IoSendSharp } from "react-icons/io5";
import { RiStarFill, RiCustomerServiceFill } from "react-icons/ri";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const recipient = "teklif@agymobilya.com";
  const subject = encodeURIComponent(formData.subject);
  const body = encodeURIComponent(
    `Ad Soyad: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}

Mesaj:
${formData.message}`
  );

  setTimeout(() => {
    // Buradaki mailto kısmı backtick ile template literal olmalı
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  }, 500);
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
        
        {/* Premium Header */}
        <div className="text-center mb-16">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#2D2D2D] px-6 py-3 rounded-full mb-8 shadow-lg border border-[#C0A062]/20">
            <RiCustomerServiceFill className="text-[#C0A062]" size={16} />
            <span className="font-semibold text-sm tracking-wide uppercase">Bize Ulaşın</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#2D2D2D] mb-6 leading-tight">
            <span className="block">İletişime</span>
            <span className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent">
              Geçin
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Projeleriniz, fikirleriniz veya özel danışmanlık için{" "}
            <span className="text-[#C0A062] font-medium">bizimle iletişime geçin</span>.
            Premium destek ekibimiz size yardımcı olmaya hazır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Sol Kolon: İletişim Bilgileri ve Form */}
          <div className="space-y-12">
            
            {/* İletişim Bilgileri */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-3 rounded-2xl shadow-lg">
                  <RiStarFill className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">
                  İletişim Bilgileri
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-2xl border border-[#C0A062]/10">
                  <div className="bg-[#C0A062]/20 p-3 rounded-lg border border-[#C0A062]/30 mt-1">
                    <IoMailSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">E-posta</p>
                    <a
                      href="mailto:teklif@agymobilya.com"
                      className="text-[#2D2D2D] font-semibold hover:text-[#C0A062] transition-colors duration-300"
                    >
                      teklif@agymobilya.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-2xl border border-[#C0A062]/10">
                  <div className="bg-[#C0A062]/20 p-3 rounded-lg border border-[#C0A062]/30 mt-1">
                    <IoCallSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Telefon</p>
                    <a
                      href="tel:+905327391648"
                      className="text-[#2D2D2D] font-semibold hover:text-[#C0A062] transition-colors duration-300"
                    >
                      +90 532 739 16 48
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Ahmet Güngör Yılmaz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-2xl border border-[#C0A062]/10">
                  <div className="bg-[#C0A062]/20 p-3 rounded-lg border border-[#C0A062]/30 mt-1">
                    <IoLocationSharp className="text-[#C0A062]" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Lokasyon</p>
                    <p className="text-[#2D2D2D] font-semibold">Maltepe, İstanbul</p>
                    <p className="text-gray-500 text-sm mt-1">Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-8 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-3 rounded-2xl shadow-lg">
                  <IoSendSharp className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">
                  Bize Mesaj Gönderin
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                    Adınız Soyadınız
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IoPersonSharp className="text-[#C0A062]" size={20} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                      placeholder="Adınız ve Soyadınız"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

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
                      name="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                    Telefon (İsteğe Bağlı)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IoCallSharp className="text-[#C0A062]" size={20} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                      placeholder="+90 5xx xxx xx xx"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                    Konu
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300"
                    placeholder="Mesajınızın konusu"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-4 bg-white/80 border border-[#C0A062]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Projeniz hakkında detaylı bilgi verebilirsiniz..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                    <IoSendSharp size={20} />
                    {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </span>
                </button>
              </form>
            </div>



          </div>

          {/* Sağ Kolon: Harita */}
          <div className="relative">
            <div className="sticky ">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C0A062]/10 p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-3 rounded-2xl shadow-lg">
                    <IoLocationSharp className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">
                    Konum
                  </h3>
                </div>
                
                <div className="h-96 rounded-2xl overflow-hidden border border-[#C0A062]/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192864.5721115161!2d29.09895082441405!3d40.9248450130006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac4f177395069%3A0x23f425a7a940332d!2sMaltepe%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1722020863925!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span>Premium iletişim deneyimi</span>
            <div className="flex items-center gap-1 text-[#C0A062]">
              <IoSparklesSharp size={14} />
              <span className="font-medium">AGY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;