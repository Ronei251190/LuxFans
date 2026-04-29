import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const creators = await prisma.user.findMany({
    where: { isCreator: true },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ creators });
}