import Link from "next/link";

export default function RegisterCreatorPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-3 text-pink-500">
          Devino Creator
        </h1>

        <p className="text-gray-400 mb-6">
          Creează un profil premium și oferă conținut exclusiv abonaților.
        </p>

        <input
          className="w-full mb-4 p-3 rounded bg-zinc-800 outline-none"
          placeholder="Nume creator"
        />

        <input
          className="w-full mb-4 p-3 rounded bg-zinc-800 outline-none"
          placeholder="Email"
        />

        <input
          className="w-full mb-4 p-3 rounded bg-zinc-800 outline-none"
          placeholder="Preț abonament lunar ex: 9.99"
        />

        <textarea
          className="w-full mb-6 p-3 rounded bg-zinc-800 outline-none h-28"
          placeholder="Descriere profil"
        />

        <Link
          href="/creator"
          className="block text-center w-full bg-pink-500 py-3 rounded-xl font-bold hover:bg-pink-600"
        >
          Creează profil creator
        </Link>
      </div>
    </main>
  );
}