"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const username = (form.username as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    // Puedes cambiar esta validación por una llamada a la API si lo deseas
    if (password === "huikbSSQExZ7uIdyWbp0ht1K") {
      document.cookie = "darkrebel_session=true; path=/; max-age=3600;";
      window.location.href = "/admin";
    } else {
      setError(true);
    }
  };

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

        {error ? (
          <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            Credenciales invalidas. Intenta nuevamente.
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
