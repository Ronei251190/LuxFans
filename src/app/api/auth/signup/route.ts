import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function is18Plus(dateOfBirth: string) {
  const birth = new Date(dateOfBirth);
  const today = new Date();

  if (Number.isNaN(birth.getTime())) return false;

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age >= 18;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, dateOfBirth } = body;

    if (!username || !email || !password || !dateOfBirth) {
      return NextResponse.json(
        { error: "Completează toate câmpurile." },
        { status: 400 }
      );
    }

    if (!is18Plus(dateOfBirth)) {
      return NextResponse.json(
        { error: "Trebuie să ai minim 18 ani." },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email deja folosit." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        ageVerified: true,
        role: "fan",
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isCreator: user.isCreator,
        ageVerified: user.ageVerified,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return NextResponse.json(
      { error: "Eroare server." },
      { status: 500 }
    );
  }
}