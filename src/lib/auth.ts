export const SESSION_COOKIE_NAME = "dr_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    console.warn(`Variable de entorno no encontrada: ${name}`);
    return "";
  }

  return value;
}

// SHA-256 simple
async function sha256(input: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    console.error("Error en SHA-256:", e);
    throw e;
  }
}

// HMAC-SHA256
async function hmacSha256(message: string, secret: string): Promise<string> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
    const digest = new Uint8Array(signature);
    return [...digest].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    console.error("Error en HMAC:", e);
    throw e;
  }
}

export async function createSessionToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  };

  const secret = getEnv("ADMIN_SESSION_SECRET");
  const message = JSON.stringify(payload);
  const signature = await hmacSha256(message, secret);

  return Buffer.from(JSON.stringify({ payload, signature })).toString("base64");
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getEnv("ADMIN_SESSION_SECRET");
    if (!secret) {
      console.warn("No SESSION_SECRET configurado");
      return null;
    }

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    const { payload, signature } = decoded;

    if (!payload?.sub || !payload?.exp) {
      return null;
    }

    const expected = await hmacSha256(JSON.stringify(payload), secret);
    if (signature !== expected) {
      console.warn("Firma de sesión inválida");
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload as SessionPayload;
  } catch (e) {
    console.error("Error verificando sesión:", e);
    return null;
  }
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const expectedUser = getEnv("ADMIN_USERNAME");
    const expectedHash = getEnv("ADMIN_PASSWORD_HASH")?.toLowerCase();

    console.log("DEBUG AUTH:", {
      usernameProvided: username,
      expectedUser,
      hashedProvidedPassword: await sha256(password),
      expectedHash,
      userMatch: username.trim() === expectedUser,
      hashMatch: (await sha256(password)).toLowerCase() === expectedHash
    });

    if (!expectedUser || !expectedHash) {
      console.error("Variables de admin no configuradas");
      return false;
    }

    const providedUser = username.trim();
    const providedHash = await sha256(password);

    const isValid = providedUser === expectedUser && providedHash === expectedHash;
    console.log("Autenticación resultado:", isValid);
    return isValid;
  } catch (e) {
    console.error("Error verificando credenciales:", e);
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
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
