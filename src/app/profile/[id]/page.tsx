"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PremiumLayout from "@/components/PremiumLayout";
import { useLanguage } from "@/lib/useLanguage";

type Post = {
  id: number;
  title: string;
  mediaUrl?: string | null;
  isPremium: boolean;
};

type Creator = {
  id: number;
  username: string;
};

const text = {
  ro: {
    fallbackTitle: "Creator",
    subtitle: "Profil premium",
    empty: "Creatorul nu are postări încă.",
    premium: "Premium",
  },
  en: {
    fallbackTitle: "Creator",
    subtitle: "Premium profile",
    empty: "This creator has no posts yet.",
    premium: "Premium",
  },
  es: {
    fallbackTitle: "Creador",
    subtitle: "Perfil premium",
    empty: "Este creador aún no tiene publicaciones.",
    premium: "Premium",
  },
};

export default function ProfilePage() {
  const params = useParams();
  const creatorId = params.id;

  const { lang } = useLanguage();
  const tr = text[lang];

  const [creator, setCreator] = useState<Creator | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadProfile() {
      const res = await fetch(`/api/profile?creatorId=${creatorId}`);
      const data = await res.json();

      if (!res.ok) {
        setPosts([]);
        return;
      }

      setCreator(data.creator || null);
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    }

    loadProfile();
  }, [creatorId]);

  return (
    <PremiumLayout
      title={creator?.username || tr.fallbackTitle}
      subtitle={tr.subtitle}
    >
      {posts.length === 0 && (
        <div className="premium-card p-6">
          <p className="premium-muted">{tr.empty}</p>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="premium-card p-6">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>

          {post.isPremium ? (
            <p className="text-red-400">🔒 {tr.premium}</p>
          ) : (
            post.mediaUrl && (
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="rounded-xl w-full"
              />
            )
          )}
        </div>
      ))}
    </PremiumLayout>
  );
}