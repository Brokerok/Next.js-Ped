"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";

type FieldErrors = { name?: string[]; email?: string[]; password?: string[] };

export type SignupState =
  | { errors?: FieldErrors; message?: string }
  | undefined;

export async function signup(state: SignupState, formData: FormData): Promise<SignupState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: FieldErrors = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["Имя должно быть не короче 2 символов."];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["Введите корректный email."];
  }
  if (!password || password.length < 8) {
    errors.password = ["Пароль должен быть не менее 8 символов."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const [existing] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existing) {
    return { errors: { email: ["Пользователь с таким email уже существует."] } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({
    name: name.trim(),
    email,
    password: hashedPassword,
  });

  await signIn("credentials", { email, password, redirectTo: "/profile" });
}

export type LoginState =
  | { message?: string }
  | undefined;

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/profile",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Неверный email или пароль." };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
