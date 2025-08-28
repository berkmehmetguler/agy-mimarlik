'use client';

import { useState } from 'react';

type Msg = { text: string; from: 'bot' | 'user' };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { text: "AGY Mobilya & Dekorasyon'a hoş geldiniz! Size nasıl yardımcı olabilirim?", from: 'bot' }
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const add = (userText: string, botText: string) => {
    setMessages((m) => [...m, { text: userText, from: 'user' }, { text: botText, from: 'bot' }]);
    setShowOptions(false);
  };

  return (
    <>
      {/* Toggle için gizli buton */}
      <button
        id="agy-chatbot-open"
        onClick={() => setOpen(true)}
        className="hidden"
        aria-hidden="true"
      />
      
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
          <header className="bg-[#2D2D2D] p-3 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">AGY Destek</h3>
            <button onClick={() => setOpen(false)} className="text-xl" aria-label="Kapat">×</button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <p
                  className={`p-2 rounded-lg max-w-[80%] text-sm ${m.from === 'bot' ? 'bg-gray-200' : 'bg-[#C0A062] text-white'}`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          {showOptions && (
            <div className="border-t p-2">
              <button
                onClick={() =>
                  add(
                    'Proje hakkında bilgi almak istiyorum.',
                    'Harika! Projeleriniz için uzman ekibimizle görüşmek için +90 532 739 16 48 üzerinden ulaşabilirsiniz.'
                  )
                }
                className="w-full text-left p-2 text-sm text-blue-600 hover:bg-gray-100 rounded"
              >
                Proje hakkında bilgi al
              </button>

              <button
                onClick={() =>
                  add(
                    'ATOLYE AI nasıl çalışır?',
                    'ATOLYE AI, metin veya eskiz ile görsel taslak oluşturur. Menülerden “ATOLYE AI” sayfasını ziyaret edin.'
                  )
                }
                className="w-full text-left p-2 text-sm text-blue-600 hover:bg-gray-100 rounded"
              >
                ATOLYE AI nasıl çalışır?
              </button>

              <button
                onClick={() =>
                  add(
                    'Bir yetkiliyle görüşmek istiyorum.',
                    'Elbette! Ahmet Bey ve ekip size yardımcı olacaktır: +90 532 739 16 48.'
                  )
                }
                className="w-full text-left p-2 text-sm text-blue-600 hover:bg-gray-100 rounded"
              >
                Bir yetkiliyle görüş
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
