"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    const postRes = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description: "",
        type: "image",
        mediaUrl,
        isPremium,
        creatorId: user.id,
      }),
    });

    if (postRes.ok) {
      setMsg("Post creat cu upload real!");
      setTitle("");
      setFile(null);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload real</h1>

      <input
        placeholder="Titlu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload}>Upload</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}