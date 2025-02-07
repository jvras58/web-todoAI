import NextAuth from "next-auth"

// TODO: add types for PrismaAdapter
declare module "next-auth" {
  interface User {
    role?: string;
  }
}