"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";

const heroText = {
  ro: {
    email: "Email",
    password: "Parolă",
    noAccount: "Nu ai cont?",
    createNow: "Creează unul acum!",
    premium: "Premium",
    panelTitle: "Exclusive Creator Feed",
    panelText:
      "Acces la postări premium, profile private și conținut exclusiv pentru abonați.",
    discover: "Descoperă acum →",
    verified: "Utilizatori verificați",
    vip: "Acces premium",
    secure: "Conținut securizat",
    active: "Platformă activă",
  },
  en: {
    email: "Email",
    password: "Password",
    noAccount: "Don’t have an account?",
    createNow: "Create one now!",
    premium: "Premium",
    panelTitle: "Exclusive Creator Feed",
    panelText:
      "Access premium posts, private profiles, and exclusive subscriber content.",
    discover: "Discover now →",
    verified: "Verified users",
    vip: "Premium access",
    secure: "Secure content",
    active: "Active platform",
  },
  es: {
    email: "Correo",
    password: "Contraseña",
    noAccount: "¿No tienes cuenta?",
    createNow: "¡Crea una ahora!",
    premium: "Premium",
    panelTitle: "Feed Exclusivo de Creadores",
    panelText:
      "Accede a publicaciones premium, perfiles privados y contenido exclusivo para suscriptores.",
    discover: "Descubrir ahora →",
    verified: "Usuarios verificados",
    vip: "Acceso premium",
    secure: "Contenido seguro",
    active: "Plataforma activa",
  },
};

export default function HomePage() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const h = heroText[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login error");
      return;
    }

    localStorage.setItem("luxfans_user", JSON.stringify(data.user));
    setEmail("");
    setPassword("");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030305] text-white">
      <section className="relative min-h-screen px-8 pb-16 pt-[125px]">
        <div className="absolute -left-[330px] top-[75px] h-[850px] w-[850px] rounded-full border border-pink-500/45 bg-pink-500/15 shadow-[0_0_150px_rgba(236,72,153,0.45)]" />
        <div className="absolute -right-[270px] bottom-[-180px] h-[880px] w-[880px] rounded-full border border-purple-500/50 bg-purple-700/15 shadow-[0_0_170px_rgba(124,58,237,0.45)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.25),transparent_42%)]" />

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[1fr_420px]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:translate-x-20"
          >
            <div className="mb-8 inline-flex rounded-full border border-pink-500/60 bg-black/50 px-8 py-3 text-sm font-black uppercase tracking-[0.25em] text-pink-300 shadow-[0_0_35px_rgba(236,72,153,0.35)]">
              ✧ {t.home.badge}
            </div>

            <h1 className="mb-6 text-7xl font-black leading-none md:text-9xl">
              Lux<span className="text-pink-500">Fans</span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-2xl leading-relaxed text-gray-300">
              {t.home.subtitle}
            </p>

            <div className="mx-auto mb-10 max-w-4xl rounded-[28px] border border-pink-500/55 bg-black/65 p-5 shadow-[0_0_80px_rgba(236,72,153,0.45)] backdrop-blur-2xl">
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px]">
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/[0.04] px-5 py-4 transition focus-within:border-pink-500/80 focus-within:shadow-[0_0_30px_rgba(236,72,153,0.45)]">
                  <span className="text-2xl text-pink-300">✉</span>
                  <input
                    autoComplete="off"
                    name="luxfans_email"
                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-400"
                    placeholder={h.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/[0.04] px-5 py-4 transition focus-within:border-pink-500/80 focus-within:shadow-[0_0_30px_rgba(236,72,153,0.45)]">
                  <span className="text-2xl text-pink-300">🔒</span>
                  <input
                    autoComplete="new-password"
                    name="luxfans_password"
                    type="password"
                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-400"
                    placeholder={h.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 px-8 py-4 text-lg font-black shadow-[0_0_45px_rgba(236,72,153,0.75)] transition hover:scale-105"
                >
                  Login
                </button>
              </div>

              <p className="mt-4 text-center text-base text-gray-400">
                {h.noAccount}{" "}
                <Link
                  href="/signup"
                  className="font-bold text-pink-400 hover:text-pink-300"
                >
                  {h.createNow}
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-7">
              <Link
                href="/signup"
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-5 text-xl font-black shadow-[0_0_45px_rgba(236,72,153,0.55)] transition hover:scale-105"
              >
                👤 {t.home.signup}
              </Link>

              <Link
                href="/creators"
                className="rounded-2xl border border-white/30 bg-black/45 px-10 py-5 text-xl font-black transition hover:bg-white/10"
              >
                🔍 {t.home.explore}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden justify-self-end lg:block lg:translate-x-10"
          >
            <div className="w-[420px] rounded-[34px] border border-pink-500/70 bg-gradient-to-br from-pink-500/20 via-purple-600/20 to-black p-5 shadow-[0_0_85px_rgba(236,72,153,0.45)]">
              <div className="relative mb-7 h-72 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_35%_55%,rgba(236,72,153,0.65),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]">
                <span className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                  ♛ {h.premium.toUpperCase()}
                </span>

                <div className="absolute left-12 top-24 rounded-full border border-pink-400/80 bg-black/45 p-8 text-5xl shadow-[0_0_65px_rgba(236,72,153,0.75)]">
                  🔒
                </div>

                <div className="absolute bottom-0 right-0 h-full w-1/2 bg-pink-500/10 blur-2xl" />
              </div>

              <h2 className="mb-3 text-3xl font-black">{h.panelTitle}</h2>

              <p className="mb-7 text-lg leading-relaxed text-gray-300">
                {h.panelText}
              </p>

              <Link
                href="/feed"
                className="block rounded-2xl border border-pink-500/60 px-6 py-5 text-center text-lg font-black text-pink-300 transition hover:bg-pink-500/10"
              >
                {h.discover}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-[900px] flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/55 px-6 py-4 backdrop-blur-xl">
          {[
            ["👥", "18+", h.verified],
            ["♕", "VIP", h.vip],
            ["🛡", "100%", h.secure],
            ["⚡", "24/7", h.active],
          ].map(([icon, big, small]) => (
            <div
              key={big}
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/5"
            >
              <span className="text-lg text-pink-400">{icon}</span>
              <span className="text-sm font-bold text-white">{big}</span>
              <span className="hidden text-xs text-gray-400 md:inline">
                {small}
              </span>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-8 grid max-w-[950px] gap-4 md:grid-cols-3">
          {[
            ["💎", t.home.card1Title, t.home.card1Text],
            ["👤", t.home.card2Title, t.home.card2Text],
            ["▣", t.home.card3Title, t.home.card3Text],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="premium-card flex items-center gap-3 p-4 transition hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-xl text-pink-400">
                {icon}
              </div>

              <div>
                <h3 className="mb-1 text-lg font-bold">{title}</h3>
                <p className="premium-muted text-sx">{text}</p>
              </div>

              <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-lg">
                ›
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}