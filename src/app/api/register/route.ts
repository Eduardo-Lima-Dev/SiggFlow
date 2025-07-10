import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  curso: z.enum([
    "CIENCIA_COMPUTACAO",
    "DESIGN_DIGITAL",
    "ENGENHARIA_COMPUTACAO",
    "ENGENHARIA_SOFTWARE",
    "REDES_COMPUTADORES",
    "SISTEMAS_INFORMACAO"
  ]),
  anoIngresso: z.union([z.string().regex(/^\d{4}$/), z.number().int().min(2000)]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, password, curso, anoIngresso } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe com este email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        curso,
        anoIngresso: typeof anoIngresso === 'string' ? parseInt(anoIngresso, 10) : anoIngresso,
      }
    }); 

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
} 