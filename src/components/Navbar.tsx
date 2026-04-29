"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
const [user, setUser] = useState<any>(null);

useEffect(() => {
  const stored = localStorage.getItem("luxfans_user");
  if (stored) setUser(JSON.parse(stored));
}, []);
function handleLogout() {
  localStorage.removeItem("luxfans_user");
  setUser(null);
  router.push("/");
}
  const { lang, setLang, t } = useLanguage();


  const links = [
    ["▣", t.nav.dashboard, "/dashboard"],
    ["▤", t.nav.feed, "/feed"],
    ["♕", t.nav.creators, "/creators"],
    ["♙", t.nav.profile, "/profile/1"],
    ["▱", t.nav.subscriptions, "/subscriptions"],
    ["✉", t.nav.messages, "/messages"],
    ["⇧", t.nav.upload, "/upload"],
    ["♟", t.nav.admin, "/admin"],
    ["☷", t.nav.terms, "/terms"],
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[88px] border-b border-pink-500/60 bg-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.5)]">
      
      <div className="flex h-full items-center justify-between px-8">

        {/* LOGO */}
        <Link href="/" className="text-3xl font-black text-white">
          ♕ Lux<span className="text-pink-500">Fans</span>
        </Link>

        {/* MENU */}
        <div className="hidden xl:flex items-center gap-8 text-sm font-semibold text-white">
          {links.map(([icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 hover:text-pink-400 transition"
            >
              <span className="text-pink-400">{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* LANGUAGE SWITCH */}
          <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["ro", "en", "es"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                  lang === item
                    ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.8)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          {/* USER ICON */}
          <Link
            href="/login"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-500/60 bg-pink-500/10 text-xl shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-110 transition"
          >
            👤
          </Link>

        </div>
      </div>
    </nav>
  );
}