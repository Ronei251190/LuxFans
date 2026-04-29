"use client";

import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Panou Admin",
    subtitle: "Administrare utilizatori, creatori, postări și raportări.",
    users: "Utilizatori",
    creators: "Creatori",
    reports: "Raportări",
    revenue: "Venituri",
    recentReports: "Raportări recente",
    reportedPost: "Postare raportată",
    creatorVerification: "Creator în verificare",
    review: "Verifică",
    verify: "Aprobă",
  },
  en: {
    title: "Admin Panel",
    subtitle: "Manage users, creators, posts, and reports.",
    users: "Users",
    creators: "Creators",
    reports: "Reports",
    revenue: "Revenue",
    recentReports: "Recent Reports",
    reportedPost: "Reported post",
    creatorVerification: "Creator pending verification",
    review: "Review",
    verify: "Verify",
  },
  es: {
    title: "Panel Admin",
    subtitle: "Administra usuarios, creadores, publicaciones y reportes.",
    users: "Usuarios",
    creators: "Creadores",
    reports: "Reportes",
    revenue: "Ingresos",
    recentReports: "Reportes recientes",
    reportedPost: "Publicación reportada",
    creatorVerification: "Creador pendiente de verificación",
    review: "Revisar",
    verify: "Verificar",
  },
};

export default function AdminPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          [tr.users, "124"],
          [tr.creators, "18"],
          [tr.reports, "7"],
          [tr.revenue, "€2,430"],
        ].map(([label, value]) => (
          <div key={label} className="premium-card p-6">
            <h2 className="text-gray-400">{label}</h2>
            <p className="text-3xl font-black text-pink-500 mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="premium-card p-6">
        <h2 className="text-2xl font-bold mb-4">{tr.recentReports}</h2>

        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center">
            <span>{tr.reportedPost}</span>
            <button className="premium-button">{tr.review}</button>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center">
            <span>{tr.creatorVerification}</span>
            <button className="premium-button">{tr.verify}</button>
          </div>
        </div>
      </div>
    </PremiumLayout>
  );
}