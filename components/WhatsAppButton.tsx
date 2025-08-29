'use client';

import Link from "next/link";


export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/905327391648"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-40 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      aria-label="WhatsApp ile iletişim"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.06 24 1.75 17.84A11.9 11.9 0 0 1 0 11.89C.01 5.33 5.35 0 11.9 0c3.18 0 6.17 1.24 8.41 3.49 2.25 2.25 3.49 5.24 3.49 8.41C23.78 18.46 18.44 23.8 11.88 23.8c-1.99 0-3.95-.5-5.69-1.45L-.06 24zM6.65 20.19c1.68 1 3.28 1.59 5.39 1.59 5.45 0 9.88-4.43 9.88-9.88 0-5.46-4.42-9.89-9.88-9.89-5.45 0-9.89 4.43-9.89 9.89 0 2.27.66 4.36 1.85 6.07l-1.28 4.66 4.93-1.44zm2.7-12.18c-.09-.23-.3-.37-.53-.37H8.1c-.23 0-.5.08-.75.33-.26.27-1 .99-1 2.43 0 1.44 1.03 2.83 1.18 3 .15.18 2.01 3.24 4.88 4.31 2.35.86 2.89.83 3.42.75.53-.08 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.36-.07-.13-.27-.22-.55-.37-.28-.16-1.69-.83-1.95-.93-.26-.1-.47-.16-.67.16-.2.31-.74.94-.92 1.11-.18.17-.34.19-.62.03-.28-.16-1.18-.43-2.25-1.38-1.34-1.05-1.81-1.86-2.01-2.2-.2-.34-.02-.53.14-.69.15-.15.32-.37.47-.55.15-.18.2-.3.3-.61z"/>
      </svg>
    </Link>
  );
}

