import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cursos = await prisma.curso.findMany({
    select: { id: true, nome: true, codigo: true }
  });
  return NextResponse.json(cursos);
} 