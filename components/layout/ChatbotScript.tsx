"use client";

import Script from "next/script";

export function ChatbotScript() {
  return (
    <Script
      src="https://chatbot.jedroplus.com/chatbot-plus.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as {
          ChatbotPlus?: { init: (options: Record<string, string>) => void };
        };
        w.ChatbotPlus?.init({
          companySlug: "jedroplus-d-o-o",
          webhookUrl: "https://chatbot.jedroplus.com/api/chat",
        });
      }}
    />
  );
}
