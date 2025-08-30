'use client';

type Props = { onOpen?: () => void };

export function ChatbotToggle({ onOpen }: Props) {
  const open = () => (onOpen ? onOpen() : document.getElementById('agy-chatbot-open')?.click());
  return (
    <button
      onClick={open}
      className="fixed bottom-5 right-5 z-40 bg-[#C0A062] text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-white hover:text-[#C0A062] hover:outline-1 decoration-[#C0A062] hover:bg-opacity-90 transition-all"
      aria-label="Sohbeti aç"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 21l1.264-3.793A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
  );
}
