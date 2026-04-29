import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID lipsă." },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "creator",
        isCreator: true,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isCreator: user.isCreator,
      },
    });
  } catch (err) {
    console.error("ACTIVATE CREATOR ERROR:", err);

    return NextResponse.json(
      { error: "Eroare la activare creator." },
      { status: 500 }
    );
  }
}