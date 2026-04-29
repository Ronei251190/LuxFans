import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID lipsă." },
        { status: 400 }
      );
    }

    await prisma.subscription.delete({
      where: { id: subscriptionId },
    });

    return NextResponse.json({
      message: "Abonament anulat.",
    });
  } catch (err) {
    console.error("DELETE SUBSCRIPTION ERROR:", err);

    return NextResponse.json(
      { error: "Eroare la anulare abonament." },
      { status: 500 }
    );
  }
}