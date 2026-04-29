"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

type Creator = {
  id: number;
  username: string;
  email: string;
};

const text = {
  ro: {
    title: "Creatori",
    subtitle: "Descoperă creatori premium și profilurile lor exclusive.",
    empty: "Nu există creatori încă.",
    viewProfile: "Vezi profil",
  },
  en: {
    title: "Creators",
    subtitle: "Discover premium creators and their exclusive profiles.",
    empty: "No creators yet.",
    viewProfile: "View profile",
  },
  es: {
    title: "Creadores",
    subtitle: "Descubre creadores premium y sus perfiles exclusivos.",
    empty: "Todavía no hay creadores.",
    viewProfile: "Ver perfil",
  },
};

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const { lang } = useLanguage();
  const tr = text[lang];

  useEffect(() => {
    async function loadCreators() {
      const res = await fetch("/api/creators");
      const data = await res.json();

      if (res.ok) {
        setCreators(Array.isArray(data.creators) ? data.creators : []);
      }
    }

    loadCreators();
  }, []);

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      {creators.length === 0 && (
        <div className="premium-card p-8">
          <p className="premium-muted">{tr.empty}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <div key={creator.id} className="premium-card p-6">
            <div className="h-28 rounded-3xl bg-gradient-to-br from-pink-500/40 to-purple-500/30 mb-5" />

            <h2 className="text-2xl font-black text-pink-500">
              {creator.username}
            </h2>

            <p className="premium-muted mb-5">{creator.email}</p>

            <Link
              href={`/profile/${creator.id}`}
              className="premium-button block text-center"
            >
              {tr.viewProfile}
            </Link>
          </div>
        ))}
      </div>
    </PremiumLayout>
  );
}