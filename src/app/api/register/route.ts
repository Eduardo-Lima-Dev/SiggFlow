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
  // semestre: z.number().min(1).max(10, "Semestre deve estar entre 1 e 10")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Body recebido no cadastro:', body);
    
    // const { name, email, password, curso, semestre } = registerSchema.parse(body);
    const { name, email, password, curso, anoIngresso } = registerSchema.parse(body);
    console.log('Dados validados:', { name, email, password, curso, anoIngresso });

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    console.log('Usuário existente:', existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe com este email" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Senha hash gerada');

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        curso,
        anoIngresso: typeof anoIngresso === 'string' ? parseInt(anoIngresso, 10) : anoIngresso,
        // semestre
      }
    });
    console.log('Usuário criado:', user);

    // Remover a senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro detalhado no cadastro:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
} 