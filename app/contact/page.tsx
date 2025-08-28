"use client";

import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = "teklif@agymobilya.com";
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Ad Soyad: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}

Mesaj:
${formData.message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="bg-white py-20 min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold">İletişime Geçin</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Projeleriniz, fikirleriniz veya bir kahve içmek için; bizimle
            iletişime geçmekten çekinmeyin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sol Kolon: Form ve Bilgiler */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold mb-4">
                İletişim Bilgileri
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-[#C0A062]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <a
                    href="mailto:teklif@agymobilya.com"
                    className="hover:text-[#C0A062]"
                  >
                    teklif@agymobilya.com
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-[#C0A062]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+905327391648"
                    className="hover:text-[#C0A062]"
                  >
                    +90 532 739 16 48 (Ahmet Güngör Yılmaz)
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-[#C0A062]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Maltepe, İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-4">
              Bize Mesaj Gönderin
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition"
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon Numaranız (İsteğe Bağlı)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Konu"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition"
              />
              <textarea
                name="message"
                placeholder="Mesajınız..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C0A062] focus:border-transparent transition"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#2D2D2D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all"
              >
                Mesajı Gönder
              </button>
            </form>
          </div>

          {/* Sağ Kolon: Harita */}
          <div className="w-full h-96 md:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192864.5721115161!2d29.09895082441405!3d40.9248450130006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac4f177395069%3A0x23f425a7a940332d!2sMaltepe%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1722020863925!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;