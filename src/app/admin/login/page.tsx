import { LockKeyhole } from "lucide-react";

export const runtime = "edge";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const hasError = resolvedSearchParams?.error === "1";

  return (
    <main style={{ minHeight: '100vh', minWidth: '100vw', background: '#000', position: 'fixed', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
        <img src="/logo.svg" alt="Dark Rebel Design" style={{ width: 180, height: 'auto', marginBottom: 36, filter: 'brightness(0) saturate(100%) invert(100%)' }} />
        <div style={{ background: '#111111', border: '1.5px solid #222220', borderRadius: 18, boxShadow: '0 4px 32px #000a', padding: '40px 32px 32px 32px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.2rem', color: '#fff', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1, textAlign: 'center' }}>
            ADMIN<span style={{ color: '#ff2020' }}>.</span>
          </div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', textAlign: 'center', marginBottom: 28, color: '#aaa9a6' }}>
            DARK REBEL DESIGN — Área Restringida
          </div>
          {hasError ? (
            <div style={{ marginBottom: 18, border: '1px solid #ff3c3c', background: 'rgba(255,60,60,0.08)', color: '#ff3c3c', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}>
              ❌ Credenciales inválidas. Intenta de nuevo.
            </div>
          ) : null}
          <form action="/api/admin/login" method="post" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18, fontFamily: 'DM Sans, sans-serif', fontSize: '1.08rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="login-user" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.08rem', color: '#f0ede8', marginBottom: 2 }}>Usuario</label>
              <input
                type="text"
                id="login-user"
                name="username"
                autoComplete="username"
                required
                placeholder="admin"
                style={{
                  borderRadius: 8,
                  border: '1.5px solid #222220',
                  background: '#181818',
                  color: '#f0ede8',
                  fontSize: '1.08rem',
                  padding: '14px 16px',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  marginBottom: 2,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="login-pass" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.08rem', color: '#f0ede8', marginBottom: 2 }}>Contraseña</label>
              <input
                type="password"
                id="login-pass"
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                style={{
                  borderRadius: 8,
                  border: '1.5px solid #222220',
                  background: '#181818',
                  color: '#f0ede8',
                  fontSize: '1.08rem',
                  padding: '14px 16px',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  marginBottom: 2,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                borderRadius: 8,
                background: '#ff2020',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.08rem',
                padding: '14px 0',
                letterSpacing: 1,
                border: 'none',
                boxShadow: '0 2px 8px #ff202022',
                transition: 'background 0.2s',
                cursor: 'pointer',
                width: '100%',
                marginTop: 10,
                textTransform: 'none',
              }}
            >
              Entrar al panel
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
