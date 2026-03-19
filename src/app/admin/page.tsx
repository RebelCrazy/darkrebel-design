
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Trash2 } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica la cookie de sesión al cargar
    if (!document.cookie.split(';').some((item) => item.trim().startsWith('darkrebel_session='))) {
      router.push('/login' as any);
      return;
    }
    fetch("/api/proyectos")
      .then((res) => res.json())
      .then(setProyectos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  const handleProgreso = async (id: string, progreso: number) => {
    try {
      await fetch(`/api/proyectos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progreso }),
      });
      setProyectos((prev) => prev.map((p) => p.id === id ? { ...p, progreso } : p));
    } catch (e: any) {
      alert("Error al actualizar: " + e.message);
    }
  };

  const handleEliminar = async (id: string) => {
    if (!window.confirm("¿Eliminar este proyecto?")) return;
    try {
      await fetch(`/api/proyectos/${id}`, { method: "DELETE" });
      setProyectos((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      alert("Error al eliminar: " + e.message);
    }
  };

  return (
    <main className="space-y-6 bg-black min-h-screen">
      <header className="panel p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.2em]">Admin Seguro</span>
          </div>
          <button
            onClick={() => {
              // Elimina la cookie y redirige a home
              document.cookie = "darkrebel_session=; Max-Age=0; path=/;";
              window.location.href = "/";
            }}
            className="btn-primary text-xs uppercase tracking-wider"
          >
            Cerrar sesión
          </button>
        </div>
        <h1 className="display-md mt-3">Nuevo Proyecto</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Inserta proyectos en D1 con sesion autenticada y validaciones estrictas.
        </p>
      </header>

      <section className="panel p-6">
        <form action="/api/proyectos" method="post" className="grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Nombre
            <input
              type="text"
              name="nombre"
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Email del cliente
            <input
              type="email"
              name="cliente_email"
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Progreso (0-100)
            <input
              type="number"
              name="progreso"
              min={0}
              max={100}
              defaultValue={0}
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Estado
            <select
              name="estado"
              required
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
              defaultValue="Planeación"
            >
              <option value="Planeación">Planeación</option>
              <option value="En Desarrollo">En Desarrollo</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Link de Figma
            <input
              type="url"
              name="link_figma"
              placeholder="https://www.figma.com/file/..."
              className="rounded-lg border border-zinc-800 bg-black px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
          </label>

          <button
            type="submit"
            className="btn-primary mt-2"
          >
            Guardar Proyecto
          </button>
        </form>
      </section>

      <section className="panel p-6 mt-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Proyectos</h2>
        {loading ? (
          <p className="text-zinc-400">Cargando...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-zinc-400 text-xs uppercase">
                  <th className="px-3 py-2 text-left">Nombre</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Progreso</th>
                  <th className="px-3 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((p) => (
                  <tr key={p.id} className="bg-black border-b border-[#27272a]">
                    <td className="px-3 py-2 text-white font-serif">{p.nombre}</td>
                    <td className="px-3 py-2 text-zinc-200">{p.cliente_email}</td>
                    <td className="px-3 py-2">
                      <span className={`status-badge status-${(p.estado || '').toLowerCase().replace(/ /g, '-')}`}>{p.estado}</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={p.progreso}
                        onChange={e => handleProgreso(p.id, Number(e.target.value))}
                        className="w-20 rounded border border-[#27272a] bg-black text-white px-2 py-1 focus:border-white ml-2"
                      />
                      <span className="ml-2 text-zinc-400">%</span>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleEliminar(p.id)}
                        className="btn-primary inline-flex items-center gap-1"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
