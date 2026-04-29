import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("FEED API ERROR:", err);

    return NextResponse.json(
      { error: "Eroare la încărcarea feed-ului." },
      { status: 500 }
    );
  }
}