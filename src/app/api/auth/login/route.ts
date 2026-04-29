import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  return NextResponse.json({
    user: {
      id: 1,
      username: "test",
      email: email || "test@luxfans.com",
      role: "creator",
      isCreator: true,
      ageVerified: true,
    },
  });
}