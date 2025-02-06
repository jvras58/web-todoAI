import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
    providers:[
        Google({}),
        Credentials({
            async authorize(credentials) {
              // Implementar logica de auth aqui:
              return null;
            }
          }),

    ]} satisfies NextAuthConfig;