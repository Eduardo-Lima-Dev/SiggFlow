import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const { token, password } = await req.json();
  const parse = schema.safeParse({ token, password });
  if (!parse.success) {
    return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
  }

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ message: "Token inválido ou expirado" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashed },
  });

  // Invalida o token
  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Senha redefinida com sucesso!" });
} 