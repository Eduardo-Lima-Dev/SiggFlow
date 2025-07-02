import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        console.log('INICIANDO AUTHORIZE', credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Faltando email ou senha');
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              email: true,
              name: true,
              curso: true,
              password: true,
              completedOnboarding: true,
              anoIngresso: true,
            }
          });

          console.log('USER FOUND:', user);
          if (!user) {
            console.log('Usuário não encontrado');
            return null;
          }

          console.log('PASSWORD RECEBIDA:', credentials.password);
          console.log('HASH NO BANCO:', user.password);
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log('IS PASSWORD VALID?', isPasswordValid);

          if (!isPasswordValid) {
            console.log('Senha inválida');
            return null;
          }

          console.log('USER AUTHORIZED:', user);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            curso: user.curso,
            anoIngresso: user.anoIngresso,
            completedOnboarding: user.completedOnboarding,
            // semestre: user.semestre,
          };
        } catch (e) {
          console.error('ERRO NO AUTHORIZE:', e);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.curso = user.curso;
        token.anoIngresso = (user as any).anoIngresso;
        token.completedOnboarding = (user as any).completedOnboarding;
        // token.semestre = user.semestre;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub || (user && user.id) || session.user.id;
        session.user.curso = token.curso as any;
        session.user.anoIngresso = token.anoIngresso as number;
        (session.user as any).completedOnboarding = token.completedOnboarding as boolean;
        // session.user.semestre = token.semestre as number;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
}; 