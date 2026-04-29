"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";
import { useEffect, useState } from "react";

const text = {
  ro: {
    title: "Dashboard",
    subtitle: "Bine ai venit în contul tău LuxFans.",
    welcome: "Cont premium activ",
    description: "De aici poți accesa feed-ul, creatorii, abonamentele și setările contului.",
    loggedOut: "Nu ești logat.",
  },
  en: {
    title: "Dashboard",
    subtitle: "Welcome to your LuxFans account.",
    welcome: "Premium account active",
    description: "From here you can access the feed, creators, subscriptions, and account settings.",
    loggedOut: "You are not logged in.",
  },
  es: {
    title: "Panel",
    subtitle: "Bienvenido a tu cuenta de LuxFans.",
    welcome: "Cuenta premium activa",
    description: "Desde aquí puedes acceder al feed, creadores, suscripciones y ajustes de la cuenta.",
    loggedOut: "No has iniciado sesión.",
  },
};

export default function DashboardPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("luxfans_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      <div className="premium-card p-8">
        <h2 className="text-2xl font-black text-pink-500 mb-3">
          {user ? `${tr.welcome}, ${user.username}` : tr.loggedOut}
        </h2>

        <p className="premium-muted">
          {tr.description}
        </p>
      </div>
    </PremiumLayout>
  );
}