"use client";

import { useState } from "react";
import { getUser } from "@/lib/auth";

export default function CreatorPage() {
  const [msg, setMsg] = useState("");

  async function becomeCreator() {
    const user = getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/creator/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Eroare.");
      return;
    }

    localStorage.setItem("luxfans_user", JSON.stringify(data.user));
    setMsg("Contul tău este acum creator!");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">
          Devino Creator
        </h1>

        <p className="text-gray-400 mb-6">
          Activează profilul de creator ca să poți publica postări premium.
        </p>

        <button
          onClick={becomeCreator}
          className="w-full bg-pink-500 py-3 rounded-xl font-bold hover:bg-pink-600"
        >
          Activează cont creator
        </button>

        {msg && <p className="mt-4 text-pink-400">{msg}</p>}
      </section>
    </main>
  );
}