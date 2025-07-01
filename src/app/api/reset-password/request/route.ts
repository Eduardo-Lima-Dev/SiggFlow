import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { randomBytes } from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const parse = schema.safeParse({ email });
    if (!parse.success) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Não revela se o email existe
      return NextResponse.json({ message: "Se o email estiver cadastrado, você receberá instruções." });
    }

    // Gera token seguro
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expires,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login/reset?token=${token}`;
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json({ message: "Se o email estiver cadastrado, você receberá instruções." });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    return NextResponse.json({ message: "Erro interno ao enviar email de redefinição de senha." }, { status: 500 });
  }
} 