export const SESSION_COOKIE_NAME = "dr_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

// ✅ Edge Runtime compatible: acceso a variables de entorno
// En Cloudflare Workers/Pages las env vars llegan como propiedades del contexto
// pero también están disponibles vía globalThis en el edge runtime de Next.js.
function getEnv(name: string): string {
  // 1. Intentar process.env (funciona en local con next dev)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromProcess = (typeof process !== "undefined" && (process.env as any)[name]) || "";
  if (fromProcess) return fromProcess;

  // 2. Intentar globalThis.__ENV__ (inyectado por @cloudflare/next-on-pages en producción)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromGlobal = (globalThis as any).__ENV__?.[name] || "";
  if (fromGlobal) return fromGlobal;

  // 3. Intentar directamente en globalThis (algunos workers lo exponen así)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromGlobalDirect = (globalThis as any)[name] || "";
  if (fromGlobalDirect) return fromGlobalDirect;

  console.warn(`[auth] Variable de entorno no encontrada: ${name}`);
  return "";
}

// ✅ Edge Runtime compatible: base64 SIN Buffer
function base64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

// SHA-256
async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// HMAC-SHA256
async function hmacSha256(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const secret = getEnv("ADMIN_SESSION_SECRET");
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET no configurado");
  }
  const message = JSON.stringify(payload);
  const signature = await hmacSha256(message, secret);

  // ✅ Usar btoa en lugar de Buffer
  return base64Encode(JSON.stringify({ payload, signature }));
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getEnv("ADMIN_SESSION_SECRET");
    if (!secret) {
      console.warn("[auth] ADMIN_SESSION_SECRET no configurado — sesión inválida");
      return null;
    }

    // ✅ Usar atob en lugar de Buffer
    const raw = base64Decode(token);
    const decoded = JSON.parse(raw);
    const { payload, signature } = decoded;

    if (!payload?.sub || !payload?.exp) {
      console.warn("[auth] Token sin sub/exp");
      return null;
    }

    const expected = await hmacSha256(JSON.stringify(payload), secret);
    if (signature !== expected) {
      console.warn("[auth] Firma de sesión inválida");
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.warn("[auth] Token expirado");
      return null;
    }

    return payload as SessionPayload;
  } catch (e) {
    console.error("[auth] Error verificando sesión:", e);
    return null;
  }
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const expectedUser = getEnv("ADMIN_USERNAME");
    const expectedHash = getEnv("ADMIN_PASSWORD_HASH")?.toLowerCase();

    if (!expectedUser || !expectedHash) {
      console.error("[auth] Variables de admin no configuradas (ADMIN_USERNAME / ADMIN_PASSWORD_HASH)");
      return false;
    }

    const providedUser = username.trim();
    const providedHash = (await sha256(password)).toLowerCase();

    const isValid = providedUser === expectedUser && providedHash === expectedHash;
    if (!isValid) {
      console.warn("[auth] Credenciales incorrectas para:", providedUser);
    }
    return isValid;
  } catch (e) {
    console.error("[auth] Error verificando credenciales:", e);
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
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
