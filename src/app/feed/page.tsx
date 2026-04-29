"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PremiumLayout from "@/components/PremiumLayout";
import { getUser } from "@/lib/auth";
import { useLanguage } from "@/lib/useLanguage";

type Post = {
  id: number;
  title: string;
  description: string;
  mediaUrl?: string;
  isPremium: boolean;
  creator: {
    id: number;
    username: string;
  };
};

const text = {
  ro: {
    title: "Feed",
    subtitle: "Postări publice și conținut premium de la creatori.",
    empty: "Nu există postări încă.",
    premium: "Conținut premium",
    subscribeText: "Abonează-te pentru a vedea această postare.",
    subscribe: "Abonează-te",
  },
  en: {
    title: "Feed",
    subtitle: "Public posts and premium content from creators.",
    empty: "No posts yet.",
    premium: "Premium content",
    subscribeText: "Subscribe to view this post.",
    subscribe: "Subscribe",
  },
  es: {
    title: "Feed",
    subtitle: "Publicaciones públicas y contenido premium de creadores.",
    empty: "Todavía no hay publicaciones.",
    premium: "Contenido premium",
    subscribeText: "Suscríbete para ver esta publicación.",
    subscribe: "Suscribirse",
  },
};

export default function FeedPage() {
  const { lang } = useLanguage();
  const tr = text[lang];

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    async function load() {
      const user = getUser();

      const feedRes = await fetch("/api/feed");
      const feedData = await feedRes.json();

      if (feedRes.ok) {
        setPosts(Array.isArray(feedData.posts) ? feedData.posts : []);
      }

      if (user) {
        const subRes = await fetch("/api/subscriptions/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const subData = await subRes.json();

        if (
          subRes.ok &&
          Array.isArray(subData.subscriptions) &&
          subData.subscriptions.length > 0
        ) {
          setHasSubscription(true);
        }
      }
    }

    load();
  }, []);

  return (
    <PremiumLayout title={tr.title} subtitle={tr.subtitle}>
      {posts.length === 0 && (
        <div className="premium-card p-8">
          <p className="premium-muted">{tr.empty}</p>
        </div>
      )}

      <div className="space-y-6 max-w-3xl mx-auto">
        {posts.map((post) => {
          const locked = post.isPremium && !hasSubscription;

          return (
            <div key={post.id} className="premium-card p-6">
              <Link
                href={`/profile/${post.creator.id}`}
                className="text-pink-400 font-bold"
              >
                @{post.creator.username}
              </Link>

              <h2 className="text-2xl font-black mt-3">{post.title}</h2>
              <p className="premium-muted mb-5">{post.description}</p>

              {locked ? (
                <div className="bg-black/40 border border-white/10 rounded-3xl p-10 text-center">
                  <p className="text-3xl mb-3">🔒</p>
                  <h3 className="text-xl font-bold mb-2">{tr.premium}</h3>
                  <p className="premium-muted mb-6">{tr.subscribeText}</p>

                  <Link
                    href="/subscriptions"
                    className="premium-button inline-block"
                  >
                    {tr.subscribe}
                  </Link>
                </div>
              ) : (
                post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="rounded-3xl w-full max-h-[600px] object-cover border border-white/10"
                  />
                )
              )}
            </div>
          );
        })}
      </div>
    </PremiumLayout>
  );
}