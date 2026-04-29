"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Abonamente",
    subtitle: "Acces premium la conținut exclusiv",
    basic: "Basic",
    pro: "Pro",
    vip: "VIP",
    month: "lună",
    choose: "Alege",
  },
  en: {
    title: "Subscriptions",
    subtitle: "Premium access to exclusive content",
    basic: "Basic",
    pro: "Pro",
    vip: "VIP",
    month: "month",
    choose: "Choose",
  },
  es: {
    title: "Suscripciones",
    subtitle: "Acceso premium a contenido exclusivo",
    basic: "Básico",
    pro: "Pro",
    vip: "VIP",
    month: "mes",
    choose: "Elegir",
  },
};

export default function SubscriptionsPage() {
  const { lang } = useLanguage();
  const t = text[lang];

  return (
    <PremiumLayout title={t.title} subtitle={t.subtitle}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="premium-card p-6 text-center">
          <h2 className="text-xl font-bold mb-2">{t.basic}</h2>
          <p className="premium-muted mb-4">5€/{t.month}</p>
          <button className="premium-button w-full">{t.choose}</button>
        </div>

        <div className="premium-card p-6 text-center">
          <h2 className="text-xl font-bold mb-2">{t.pro}</h2>
          <p className="premium-muted mb-4">10€/{t.month}</p>
          <button className="premium-button w-full">{t.choose}</button>
        </div>

        <div className="premium-card p-6 text-center">
          <h2 className="text-xl font-bold mb-2">{t.vip}</h2>
          <p className="premium-muted mb-4">20€/{t.month}</p>
          <button className="premium-button w-full">{t.choose}</button>
        </div>
      </div>
    </PremiumLayout>
  );
}