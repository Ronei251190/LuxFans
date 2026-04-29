import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID lipsă" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User nu există" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "creator",
        isCreator: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (err) {
    console.error("ACTIVATE CREATOR ERROR:", err);

    return NextResponse.json(
      { error: "Eroare server" },
      { status: 500 }
    );
  }
}