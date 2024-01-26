import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import Github from "next-auth/providers/github";

// Initialize PrismaAdapter
const prismaAdapter = PrismaAdapter({ prisma });
export const authOptions: AuthOptions = {
  adapter: prismaAdapter,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect() {
      return "/";
    },
  },
};

const authHandler = NextAuth(authOptions);

export default async function handler(...params: any[]) {
  await authHandler(...params);
}
