import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = Number(searchParams.get("creatorId"));

    if (!creatorId) {
      return NextResponse.json(
        { error: "Creator ID lipsă." },
        { status: 400 }
      );
    }

    const creator = await prisma.user.findUnique({
      where: { id: creatorId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isCreator: true,
      },
    });

    if (!creator) {
      return NextResponse.json(
        { error: "Creatorul nu există." },
        { status: 404 }
      );
    }

    const posts = await prisma.post.findMany({
      where: { creatorId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ creator, posts });
  } catch (err) {
    console.error("PROFILE API ERROR:", err);

    return NextResponse.json(
      { error: "Eroare la profil." },
      { status: 500 }
    );
  }
}