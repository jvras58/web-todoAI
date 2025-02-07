import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import { CredentialsSchema } from "./schemas";
import { findUserByEmail } from "./services";
import { UserNotFound } from "./services/user-not-found";

export default {
    providers:[
        Google({}),
        Credentials({
          async authorize(credentials) {
              const validatedCredentials = CredentialsSchema.safeParse(credentials);
              if (validatedCredentials.success) {
                  const { email, password } = validatedCredentials.data;
                  const user = await findUserByEmail(email);
                  if (!user || !user.password) {
                      throw new UserNotFound();
                  }
                  const validPassword = await compare(password, user.password);
                  if (validPassword) return user;
              }
              return null;
          },
      }),

    ]} satisfies NextAuthConfig;