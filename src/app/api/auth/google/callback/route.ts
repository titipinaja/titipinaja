import { createUser, getUserFromEmail } from "@/lib/db/user";
import { google } from "@/lib/oauth";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/session";
import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const claimsSchema = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.string(),
  email: z.string().email(),
});
export type ClaimSchema = z.infer<typeof claimsSchema>;

/** method to handle google oauth callback request. */
export async function GET(request: Request): Promise<Response> {
  /** verify code, state, stored state and code verifier. */
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new NextResponse("Please restart the process.", {
      status: 400,
    });
  }

  if (state !== storedState) {
    return new NextResponse("Please restart the process.", {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    return new NextResponse("Please restart the process.", {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken());
  const claim = claimsSchema.parse(claims);

  /** validate user existence or create account if it does not exist. */
  const existingUser = await getUserFromEmail(claim.email);
  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(sessionToken, session.expiresAt);
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/explore?login=successful",
      },
    });
  }

  const [user] = await createUser(claim);
  if (user === undefined)
    return new NextResponse(
      "An error occured while registering google account. Please try again later.",
      { status: 500 },
    );

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/explore?login=successful",
    },
  });
}
