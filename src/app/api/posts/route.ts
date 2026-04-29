import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return NextResponse.json(
      { error: "Eroare la citire postări" },
      { status: 500 }
    );
  }
}