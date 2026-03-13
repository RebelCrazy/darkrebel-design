import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { listarProyectosActivos } from "@/lib/db";

export const runtime = "edge";

export default async function DashboardPage() {
  const proyectos = await listarProyectosActivos();

  return (
    <main className="space-y-8">
      <header className="panel p-6 md:p-8">
        <div className="flex items-center gap-3 text-zinc-300">
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.25em]">Dark Rebel Dashboard</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Proyectos Activos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Vista ejecutiva de proyectos en curso con un estilo gotico-contemporaneo, sobrio y minimalista.
        </p>
      </header>

      <section className="grid gap-4">
        {proyectos.length === 0 ? (
          <article className="panel p-6 text-sm text-zinc-400">
            No hay proyectos activos todavia.
          </article>
        ) : (
          proyectos.map((proyecto) => (
            <article key={proyecto.id} className="panel p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-medium text-zinc-100">{proyecto.nombre}</h2>
                  <p className="text-sm text-zinc-400">{proyecto.cliente_email}</p>
                </div>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  {proyecto.estado}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
                  <span>Progreso</span>
                  <span>{proyecto.progreso}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-value" style={{ width: `${proyecto.progreso}%` }} />
                </div>
                <div className="pt-2 text-right">
                  <Link
                    href={`/proyecto/${proyecto.id}`}
                    className="text-xs uppercase tracking-wider text-zinc-400 hover:text-zinc-200"
                  >
                    Ver vista cliente
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
