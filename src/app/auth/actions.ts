"use server";

import { googleOAuthClient } from "@/lib/arctic";
import { lucia } from "@/lib/lucia";
import { db } from "@/server/db";
import { passwordResetToken, users } from "@/server/db/schema";
import { hash, verify, type Options } from "@node-rs/argon2";
import { generateCodeVerifier, generateState } from "arctic";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize, type Session, type User } from "lucia";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createDate, isWithinExpirationDate, TimeSpan } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { cache } from "react";
import { z } from "zod";
import { type signInSchema } from "./login/page";
import { type signUpSchema } from "./register/page";

const hashOptions: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    /** validate user existance */
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email))
      .then((res) => res.at(0));
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await hash(values.password, hashOptions);

    /** insert user to database */
    const [user] = await db
      .insert(users)
      .values({
        email: values.email.toLowerCase(),
        name: values.name,
        hashedPassword: hashedPassword,
      })
      .returning();

    if (user === undefined)
      return {
        error:
          "Something went wrong when creating account. Please try again later.",
        success: false,
      };

    /** set session to cookie  */
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, values.email))
    .then((res) => res.at(0));

  /** validate password available */
  if (!user?.email && !user?.hashedPassword)
    return {
      success: false,
      error: "Account not found. Please kindly sign up.",
    };

  /** validate password available */
  if (!user?.hashedPassword)
    return {
      success: false,
      error:
        "Your email may be connected to OAuthProvider. Please sign in via the corresponsing provider instead.",
    };

  /** validate password match */
  const passwordMatch = await verify(
    user.hashedPassword,
    values.password,
    hashOptions,
  );
  if (!passwordMatch) return { success: false, error: "Invalid Credentials!" };

  /** set session to cookie */
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return { success: true };
};

export const logOut = async () => {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
};

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
});

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      ["email", "profile"],
    );
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return {
      success: false,
      error: "An error occured while verifying credentials with google.",
    };
  }
};

/** password reset */
export const createPasswordResetToken = async (userId: string) => {
  /** delete existing tokens for user. */
  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId));

  /** create new token id and hash. */
  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  await db.insert(passwordResetToken).values({
    userId: userId,
    tokenHash: tokenHash,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
};

/** password reset - step 1: validate email */
const validateEmailSchema = z.object({
  email: z.string().email(),
});

export const validateEmail = async (
  values: z.infer<typeof validateEmailSchema>,
) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, values.email))
    .then((res) => res.at(0));
  if (!user)
    return {
      success: false,
      error: "Account not found. Please kindly sign up.",
    };

  const verificationToken = await createPasswordResetToken(user.id);
  const verificationLink =
    "http://localhost:3000/auth/reset-password/" + verificationToken;

  await sendPasswordResetToken(user.email, verificationLink);
};

const sendPasswordResetToken = async (
  email: string,
  verificationLink: string,
) => {
  /** send email */
  console.log("email sent.");
};

/** password reset - step 2: reset password */
const resetPasswordSchema = z.object({
  password: z.string().min(8),
  token: z.string(),
});

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>,
) => {
  /** delete existing token hash from database. */
  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(values.token)),
  );
  const token = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.tokenHash, tokenHash))
    .then((res) => res.at(0));
  if (token)
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.tokenHash, tokenHash));

  /** validate token expiration. */
  if (!token || !isWithinExpirationDate(token.expiresAt))
    return { success: false, error: "Token expired." };

  /** invalidate existing session. */
  await lucia.invalidateUserSessions(token.userId);

  /** update user password. */
  const passwordHash = await hash(values.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  await db
    .update(users)
    .set({ hashedPassword: passwordHash })
    .where(eq(users.id, token.userId));

  const session = await lucia.createSession(token.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  headers().set("Referrer-Policy", "strict-origin");
  return redirect("/collections");
};
