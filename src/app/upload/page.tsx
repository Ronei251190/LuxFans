"use client";

import { useEffect, useState } from "react";
import PremiumLayout from "@/components/PremiumLayout";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";

const text = {
  ro: {
    title: "Upload conținut",
    subtitle: "Publică postări publice sau premium.",
    checking: "Se verifică accesul...",
    blockedTitle: "Acces blocat",
    blockedSubtitle: "Doar creatorii pot publica postări.",
    blockedText: "Activează contul de creator pentru a publica postări.",
    becomeCreator: "Devino creator",
    titlePlaceholder: "Titlu",
    descriptionPlaceholder: "Descriere",
    mediaPlaceholder: "Link imagine / video",
    premiumPost: "Postare premium",
    publish: "Postează",
    success: "Postare creată cu succes!",
    error: "Eroare.",
  },
  en: {
    title: "Upload content",
    subtitle: "Publish public or premium posts.",
    checking: "Checking access...",
    blockedTitle: "Access blocked",
    blockedSubtitle: "Only creators can publish posts.",
    blockedText: "Activate your creator account to publish posts.",
    becomeCreator: "Become a creator",
    titlePlaceholder: "Title",
    descriptionPlaceholder: "Description",
    mediaPlaceholder: "Image / video link",
    premiumPost: "Premium post",
    publish: "Publish",
    success: "Post created successfully!",
    error: "Error.",
  },
  es: {
    title: "Subir contenido",
    subtitle: "Publica contenido público o premium.",
    checking: "Verificando acceso...",
    blockedTitle: "Acceso bloqueado",
    blockedSubtitle: "Solo los creadores pueden publicar.",
    blockedText: "Activa tu cuenta de creador para publicar contenido.",
    becomeCreator: "Convertirse en creador",
    titlePlaceholder: "Título",
    descriptionPlaceholder: "Descripción",
    mediaPlaceholder: "Enlace de imagen / video",
    premiumPost: "Publicación premium",
    publish: "Publicar",
    success: "Publicación creada con éxito.",
    error: "Error.",
  },
};

export default function UploadPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = getUser();
    if (user?.role === "creator") setAllowed(true);
    setChecked(true);
  }, []);

  async function createPost() {
    const user = getUser();
    setMsg("");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type: "image",
        mediaUrl,
        isPremium,
        creatorId: user.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || tr.error);
      return;
    }

    setMsg(tr.success);
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setIsPremium(false);
  }

  if (!checked) {
    return (
      <PremiumLayout title={tr.title} subtitle={tr.checking}>
        <div className="premium-card p-8">{tr.checking}</div>
      </PremiumLayout>
    );
  }

  if (!allowed) {
    return (
      <PremiumLayout title={tr.blockedTitle} subtitle={tr.blockedSubtitle}>
        <div className="premium-card p-8 text-center">
          <p className="premium-muted mb-6">{tr.blockedText}</p>

          <Link href="/creator" className="premium-button inline-block">
            {tr.becomeCreator}
          </Link>
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      <div className="premium-card p-8 max-w-2xl mx-auto space-y-4">
        <input
          className="premium-input"
          placeholder={tr.titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="premium-input min-h-32"
          placeholder={tr.descriptionPlaceholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="premium-input"
          placeholder={tr.mediaPlaceholder}
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />

        <label className="flex gap-3 items-center text-gray-300">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          {tr.premiumPost}
        </label>

        <button onClick={createPost} className="premium-button w-full">
          {tr.publish}
        </button>

        {msg && <p className="text-pink-400">{msg}</p>}
      </div>
    </PremiumLayout>
  );
}