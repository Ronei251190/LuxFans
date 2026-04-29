"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Creator",
    subtitle: "Activează profilul de creator ca să poți publica postări premium.",
    button: "Activează cont creator",
  },
  en: {
    title: "Creator",
    subtitle: "Activate your creator profile so you can publish premium posts.",
    button: "Activate creator account",
  },
  es: {
    title: "Creador",
    subtitle: "Activa tu perfil de creador para poder publicar publicaciones premium.",
    button: "Activar cuenta de creador",
  },
};

export default function CreatorPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      <div className="premium-card p-8 text-center">
        <button className="premium-button">
          {tr.button}
        </button>
      </div>
    </PremiumLayout>
  );
}