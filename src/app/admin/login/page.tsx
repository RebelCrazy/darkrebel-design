import { LockKeyhole } from "lucide-react";

export const runtime = "edge";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const hasError = searchParams?.error === "1";

  return (
    <main className="mx-auto max-w-xl">
      <section className="panel p-6 md:p-8">
        <div className="inline-flex items-center gap-2 text-zinc-300">
          <LockKeyhole className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.2em]">Acceso Seguro</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">Login Admin</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Ingresa tus credenciales para acceder al panel de proyectos.
        </p>

        {hasError ? (
          <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            Credenciales invalidas. Intenta nuevamente.
          </p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Usuario
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-400"
          >
            Iniciar sesión
          </button>
        </form>
      </section>
    </main>
  );
}
