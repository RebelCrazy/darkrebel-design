export const SESSION_COOKIE_NAME = "dr_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

function constantTimeEqual(a: string, b: string): boolean {
  const maxLength = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;

  for (let i = 0; i < maxLength; i += 1) {
    const codeA = i < a.length ? a.charCodeAt(i) : 0;
    const codeB = i < b.length ? b.charCodeAt(i) : 0;
    diff |= codeA ^ codeB;
  }

  return diff === 0;
}

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta variable de entorno requerida: ${name}`);
  }

  return value;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  };

  const payloadEncoded = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const secret = getEnv("ADMIN_SESSION_SECRET");
  const signature = await sign(payloadEncoded, secret);

  return `${payloadEncoded}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [payloadPart, signaturePart] = token.split(".");

  if (!payloadPart || !signaturePart) {
    return null;
  }

  const expected = await sign(payloadPart, getEnv("ADMIN_SESSION_SECRET"));
  if (!constantTimeEqual(signaturePart, expected)) {
    return null;
  }

  try {
    const payloadJson = new TextDecoder().decode(base64UrlToBytes(payloadPart));
    const payload = JSON.parse(payloadJson) as SessionPayload;

    if (!payload?.sub || !payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = getEnv("ADMIN_USERNAME");
  const expectedHash = getEnv("ADMIN_PASSWORD_HASH").toLowerCase();

  const providedUser = username.trim();
  const providedHash = await sha256Hex(password);

  return constantTimeEqual(providedUser, expectedUser) && constantTimeEqual(providedHash, expectedHash);
}

export function getSessionCookieOptions() {
  const nodeEnv = process.env.NODE_ENV;
  const isProduction = nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  };
}

export function isTrustedOrigin(req: Request): boolean {
  try {
    const requestUrl = new URL(req.url);
    const origin = req.headers.get("origin");
    if (origin) {
      const originUrl = new URL(origin);
      return requestUrl.protocol === originUrl.protocol && requestUrl.host === originUrl.host;
    }
    // Formulario HTML (method="post") suele omitir Origin; Referer queda en mismo host.
    const referer = req.headers.get("referer");
    if (referer) {
      const refererUrl = new URL(referer);
      return requestUrl.host === refererUrl.host;
    }
  } catch {
    return false;
  }
  return false;
}
