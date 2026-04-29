"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Mesaje",
    subtitle: "Chat privat cu creatorii tăi preferați.",
    heading: "Mesagerie premium",
    description: "Sistemul de mesaje private este în dezvoltare.",
    comingSoon: "În curând vei putea trimite și primi mesaje aici.",
  },
  en: {
    title: "Messages",
    subtitle: "Private chat with your favorite creators.",
    heading: "Premium messaging",
    description: "The private messaging system is under development.",
    comingSoon: "Soon you will be able to send and receive messages here.",
  },
  es: {
    title: "Mensajes",
    subtitle: "Chat privado con tus creadores favoritos.",
    heading: "Mensajería premium",
    description: "El sistema de mensajes privados está en desarrollo.",
    comingSoon: "Pronto podrás enviar y recibir mensajes aquí.",
  },
};

export default function MessagesPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      <div className="premium-card p-8 text-center">
        <h2 className="text-2xl font-black text-pink-500 mb-3">
          {tr.heading}
        </h2>

        <p className="premium-muted mb-2">{tr.description}</p>
        <p className="text-gray-500">{tr.comingSoon}</p>
      </div>
    </PremiumLayout>
  );
}