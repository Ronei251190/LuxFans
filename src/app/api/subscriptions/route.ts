import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, plan, price } = await req.json();

    if (!userId || !plan || !price) {
      return NextResponse.json(
        { error: "Date lipsă pentru abonament." },
        { status: 400 }
      );
    }

    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
      },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: "Ai deja un abonament activ." },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        creatorId: 1,
      },
    });

    return NextResponse.json({
      message: `Abonament ${plan} creat cu succes.`,
      subscription,
    });
  } catch (err) {
    console.error("CREATE SUBSCRIPTION ERROR:", err);

    return NextResponse.json(
      { error: "Eroare la creare abonament." },
      { status: 500 }
    );
  }
}