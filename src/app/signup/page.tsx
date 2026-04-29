"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Creează cont",
    subtitle: "Intră în comunitatea LuxFans.",
    username: "Username",
    email: "Email",
    password: "Parolă",
    birth: "Data nașterii",
    button: "Creează cont",
    loading: "Se creează...",
    loginText: "Ai deja cont?",
    login: "Login",
    serverError: "Eroare server.",
    under18: "Trebuie să ai minim 18 ani.",
  },
  en: {
    title: "Create account",
    subtitle: "Join the LuxFans community.",
    username: "Username",
    email: "Email",
    password: "Password",
    birth: "Date of birth",
    button: "Create account",
    loading: "Creating...",
    loginText: "Already have an account?",
    login: "Login",
    serverError: "Server error.",
    under18: "You must be at least 18 years old.",
  },
  es: {
    title: "Crear cuenta",
    subtitle: "Únete a la comunidad LuxFans.",
    username: "Usuario",
    email: "Correo electrónico",
    password: "Contraseña",
    birth: "Fecha de nacimiento",
    button: "Crear cuenta",
    loading: "Creando...",
    loginText: "¿Ya tienes cuenta?",
    login: "Iniciar sesión",
    serverError: "Error del servidor.",
    under18: "Debes tener al menos 18 años.",
  },
};

export default function SignupPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const tr = text[lang];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function is18Plus(date: string) {
    const birth = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  }

  async function handleSignup() {
    try {
      setError("");

      if (!dateOfBirth || !is18Plus(dateOfBirth)) {
        setError(tr.under18);
        return;
      }

      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          dateOfBirth,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || tr.serverError);
        setLoading(false);
        return;
      }

      localStorage.setItem("luxfans_user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch {
      setError(tr.serverError);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen premium-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md premium-card p-8">
        <p className="text-pink-400 text-sm font-bold uppercase tracking-widest mb-3">
          Premium Access
        </p>

        <h1 className="text-4xl font-black mb-2">
          {tr.title} <span className="text-pink-500">LuxFans</span>
        </h1>

        <p className="premium-muted mb-8">{tr.subtitle}</p>

        {error && (
          <p className="mb-4 bg-red-500/20 text-red-400 p-3 rounded-2xl">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            className="premium-input"
            placeholder={tr.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="premium-input"
            placeholder={tr.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="premium-input"
            placeholder={tr.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="date"
            className="premium-input"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full premium-button disabled:opacity-50"
          >
            {loading ? tr.loading : tr.button}
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          {tr.loginText}{" "}
          <Link href="/login" className="text-pink-400 hover:underline">
            {tr.login}
          </Link>
        </p>
      </div>
    </main>
  );
}