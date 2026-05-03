"use client";

import Script from "next/script";

export function ChatbotScript() {
  return (
    <Script
      src="https://chatbot.jedroplus.com/chatbot-plus.js"
      strategy="afterInteractive"
      onLoad={() => {
        (window as any).ChatbotPlus?.init({
          companySlug: "jedroplus-d-o-o",
          webhookUrl: "https://chatbot.jedroplus.com/api/chat",
        });
      }}
    />
  );
}
