import MotionCard from "@/components/MotionCard";

export default function PremiumLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen premium-bg text-white p-6">
      <section className="max-w-6xl mx-auto">
        <MotionCard className="premium-card p-8 mb-8">
          <p className="text-pink-400 text-sm font-bold uppercase tracking-widest mb-3">
            LuxFans Premium
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-3">
            {title}
          </h1>

          {subtitle && <p className="premium-muted text-lg">{subtitle}</p>}
        </MotionCard>

        <div className="space-y-6">{children}</div>
      </section>
    </main>
  );
}