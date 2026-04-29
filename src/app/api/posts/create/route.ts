import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, description, type, mediaUrl, isPremium, creatorId } =
      await req.json();

    if (!title || !type || !creatorId) {
      return NextResponse.json(
        { error: "Date lipsă." },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        type,
        mediaUrl,
        isPremium,
        creatorId,
      },
    });

    return NextResponse.json({ post });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Eroare server." },
      { status: 500 }
    );
  }
}