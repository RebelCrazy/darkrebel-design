import { ShieldCheck } from "lucide-react";

export const runtime = "edge";

export default function AdminPage() {
  return (
    <main className="space-y-6">
      <header className="panel p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.2em]">Admin Seguro</span>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs uppercase tracking-wider text-zinc-200 hover:border-zinc-500"
            >
              Cerrar sesion
            </button>
          </form>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">Nuevo Proyecto</h1>
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
            className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-400"
          >
            Guardar Proyecto
          </button>
        </form>
      </section>
    </main>
  );
}
