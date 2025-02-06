"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/lib/prisma";


export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { error: "Dados de entrada inválidos" };
    }

    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "As senhas não coincidem" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "O e-mail já está em uso. Por favor, tente outro." };
    }

    const lowerCaseEmail = email.toLowerCase();

    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    // Gerar token de verificação
    // const verificationToken = await generateVerificationToken(email);

    // await sendVerificationEmail(lowerCaseEmail, verificationToken.token);

    return { success: "A verificação de e-mail foi enviada" };
  } catch (error) {
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Não é possível conectar-se ao banco de dados. Por favor, tente novamente mais tarde.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Serviço temporariamente indisponível. Por favor, tente novamente mais tarde.",
      };
    } else {
      return { error: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde." };
    }
  }
};