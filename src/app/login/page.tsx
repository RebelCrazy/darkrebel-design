"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    
    try {
      const form = e.currentTarget;
      const username = (form.username as HTMLInputElement).value;
      const password = (form.password as HTMLInputElement).value;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirect || "/dashboard";
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError(true);
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-400 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
