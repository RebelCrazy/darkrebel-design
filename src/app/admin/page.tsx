"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Credenciales incorrectas");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-sm border border-zinc-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-zinc-100">Panel Admin</h1>
        <div className="mb-4">
          <label className="block text-zinc-300 mb-1">Usuario</label>
          <input
            name="username"
            type="text"
            required
            className="w-full px-3 py-2 rounded border border-zinc-700 bg-black text-zinc-100 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="mb-6">
          <label className="block text-zinc-300 mb-1">Contraseña</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 rounded border border-zinc-700 bg-black text-zinc-100 focus:outline-none focus:border-accent"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-accent text-black font-bold py-2 rounded hover:bg-accent-dark transition"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
