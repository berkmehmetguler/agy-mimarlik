import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Chatbot } from "@/components/Chatbot";
import { ChatbotToggle } from "@/components/ChatbotToggle";
import { Suspense } from "react";

export const metadata = {
  title: 'AGY Mimarlık - Ustalığı Sanatla Buluşturuyoruz',
  description: 'Zanaatkar ellerde şekillenen, size özel tasarımlarla hayallerinizdeki mekanları gerçeğe dönüştürüyoruz.',
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {/* Header is client */}
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        {/* Chat widget (client) */}
        <Suspense>
          <Chatbot />
          <ChatbotToggle />
        </Suspense>
      </body>
    </html>
  );
}
