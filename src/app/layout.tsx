import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuxFans",
  description: "Premium creator platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="bg-black text-white">
        <Navbar />

        {/* 🔥 FIX NAVBAR OVERLAY */}
        <main className="pt-28">
          {children}
        </main>

      </body>
    </html>
  );
}