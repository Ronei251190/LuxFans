"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

const termsText = {
  ro: {
    title: "Termeni & Reguli",
    subtitle: "Regulile platformei LuxFans pentru siguranță, conținut și abonamente.",
    items: [
      "Platforma LuxFans este destinată utilizatorilor de peste 18 ani.",
      "Creatorii trebuie să confirme identitatea și vârsta înainte de monetizare.",
      "Este interzis conținutul ilegal, furat, neconsensual sau care implică minori.",
      "Toate persoanele care apar în conținut trebuie să își fi dat consimțământul.",
      "Utilizatorii pot raporta conținut, iar administratorii pot elimina rapid materialele problematice.",
    ],
  },
  en: {
    title: "Terms & Rules",
    subtitle: "LuxFans platform rules for safety, content, and subscriptions.",
    items: [
      "LuxFans is intended for users over 18 years old.",
      "Creators must verify their identity and age before monetization.",
      "Illegal, stolen, non-consensual, or minor-related content is prohibited.",
      "All people appearing in content must have given clear consent.",
      "Users can report content, and administrators can quickly remove problematic material.",
    ],
  },
  es: {
    title: "Términos y Reglas",
    subtitle: "Reglas de LuxFans sobre seguridad, contenido y suscripciones.",
    items: [
      "LuxFans está destinado a usuarios mayores de 18 años.",
      "Los creadores deben verificar su identidad y edad antes de monetizar.",
      "Está prohibido el contenido ilegal, robado, no consensuado o relacionado con menores.",
      "Todas las personas que aparecen en el contenido deben haber dado su consentimiento claro.",
      "Los usuarios pueden reportar contenido y los administradores pueden eliminar rápidamente material problemático.",
    ],
  },
};

export default function TermsPage() {
  const { lang } = useLanguage();
  const text = termsText[lang];

  return (
    <PremiumLayout title={text.title} subtitle={text.subtitle}>
      <div className="premium-card p-8 space-y-5 text-gray-300">
        {text.items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </PremiumLayout>
  );
}