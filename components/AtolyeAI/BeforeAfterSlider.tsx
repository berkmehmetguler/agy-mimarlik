'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = { beforeImage: string; afterImage: string };

export function BeforeAfterSlider({ beforeImage, afterImage }: Props) {
  const [pos, setPos] = useState(50);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);

  return (
    <div className="relative w-full h-full group select-none">
      {/* Arka plan placeholder */}
      {!afterLoaded && (
        <div className="absolute inset-0 bg-gray-200 rounded-lg shadow-xl animate-pulse" />
      )}

      {/* Sonuç resmi */}
      <Image
        src={afterImage}
        alt="Tasarım"
        width={800}
        height={600}
        onLoad={() => setAfterLoaded(true)}
        className={`w-full h-full object-contain rounded-lg shadow-xl transition-opacity duration-500 ${afterLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Eskiz & kaydırıcı */}
      {afterLoaded && (
        <>
          <div
            className="absolute top-0 left-0 h-full w-full overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`
            }}
          >
            {!beforeLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <Image
              src={beforeImage}
              alt="Eskiz"
              width={800}
              height={600}
              onLoad={() => setBeforeLoaded(true)}
             className={`w-full h-full object-contain rounded-lg shadow-xl transition-opacity duration-500 ${afterLoaded ? 'opacity-100' : 'opacity-0'}`}
      />  

          </div>

          {/* Kaydırıcı çizgisi */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize opacity-50 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${pos}% - 2px)` }}
          >
            <div className="bg-white rounded-full w-10 h-10 absolute top-1/2 -translate-y-1/2 -ml-5 flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>

          {/* Gizli input */}
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="Eskiz ve tasarım karşılaştırma kaydırıcısı"
          />

          {/* Etiketler */}
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-bold pointer-events-none">
            ESKİZ
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-bold pointer-events-none">
            TASARIM
          </div>
        </>
      )}
    </div>
  );
}