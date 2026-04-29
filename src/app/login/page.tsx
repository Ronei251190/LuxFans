"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Eroare la login.");
      return;
    }

    localStorage.setItem("luxfans_user", JSON.stringify(data.user));
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen premium-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md premium-card p-8">
        <p className="text-pink-400 text-sm font-bold uppercase tracking-widest mb-3">
          Welcome back
        </p>

        <h1 className="text-4xl font-black mb-2">
          Login în <span className="text-pink-500">LuxFans</span>
        </h1>

        <p className="premium-muted mb-8">
          Intră în contul tău premium.
        </p>

        {error && (
          <p className="mb-4 bg-red-500/20 text-red-400 p-3 rounded-2xl">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            className="premium-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="premium-input"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full premium-button disabled:opacity-50"
          >
            {loading ? "Se verifică..." : "Login"}
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Nu ai cont?{" "}
          <Link href="/signup" className="text-pink-400 hover:underline">
            Creează unul
          </Link>
        </p>
      </div>
    </main>
  );
}