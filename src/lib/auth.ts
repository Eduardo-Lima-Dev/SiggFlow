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

        try {
          if (!credentials?.email || !credentials?.password) {
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

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

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