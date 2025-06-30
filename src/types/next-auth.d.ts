import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      curso?: string;
      // semestre?: number;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    curso: string;
    // semestre: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    curso?: string;
    // semestre?: number;
  }
} 