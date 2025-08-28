'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

export function QuoteRequestModal({ isOpen, onClose, imageUrl }: Props) {
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const recipient = 'teklif@agymobilya.com';
    const subject = encodeURIComponent('ATOLYE AI - Fiyat Teklifi Talebi');
    const body = encodeURIComponent(
`Merhaba AGY Mobilya,

ATOLYE AI aracılığıyla oluşturduğum ekteki tasarım için fiyat teklifi rica ediyorum.

İletişim Bilgilerim:
İsim: ${contactInfo.name}
E-posta: ${contactInfo.email}
Telefon: ${contactInfo.phone}

Teşekkürler.`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-serif font-bold text-center mb-4">Fiyat Teklifi Al</h2>
        <p className="text-center text-gray-600 mb-6">
          Aşağıdaki formu doldurun. E-posta gönderirken oluşturduğunuz tasarımı eklemeyi unutmayın.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <input name="name" placeholder="Adınız Soyadınız" value={contactInfo.name} onChange={handleChange} className="w-full p-3 border rounded-md" />
            <input name="email" placeholder="E-posta Adresiniz" value={contactInfo.email} onChange={handleChange} className="w-full p-3 border rounded-md" />
            <input name="phone" placeholder="Telefon Numaranız" value={contactInfo.phone} onChange={handleChange} className="w-full p-3 border rounded-md" />
          </div>
          <div className="text-center">
            {imageUrl && <img src={imageUrl} alt="Tasarım Önizleme" className="rounded-md shadow-md max-h-48 mx-auto mb-4" />}
            {imageUrl && (
              <a href={imageUrl} download="agy-atolye-ai-tasarim.jpg" className="inline-block w-full text-center bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-300 transition-all">
                Görseli İndir
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button onClick={handleSubmit} className="w-full bg-[#2D2D2D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all">
            Teklifi E-posta ile Gönder
          </button>
          <button onClick={onClose} className="w-full md:w-auto bg-transparent text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
