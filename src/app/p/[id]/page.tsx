import { notFound } from "next/navigation";
import { obtenerProyectoPorId, obtenerTareasConProyectoYCliente } from "@/lib/db";

export const runtime = "edge";

export default async function ProyectoPublicoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Buscar por UID único
  const proyecto = await obtenerProyectoPorId(id);
  if (!proyecto) notFound();

  // Obtener tareas visibles para el cliente
  const tareas = (await obtenerTareasConProyectoYCliente()).filter(
    (t) => t.proyecto_uid === id && t.visible_cliente !== false
  );
  const progresoGeneral = tareas.length > 0 ? Math.round((tareas.filter(t => t.estado === 'Completada').length / tareas.length) * 100) : proyecto.progreso;

  return (
    <main className="panel p-8 md:p-12 bg-black min-h-screen text-white font-serif relative">
      <div className="hero-noise absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10">
        <h1 className="display-md mb-4">{String(proyecto.nombre ?? "")}</h1>
        <div className="mb-6">
          <span className="stat-card inline-block px-3 py-1 text-xs">
            {String(proyecto.estado ?? "")}
          </span>
        </div>
        <div className="mb-8">
          <div className="post-progress w-full h-4 rounded-full overflow-hidden border border-[#222220] bg-[#111111]">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${progresoGeneral}%` }} />
          </div>
          <p className="mt-2 text-zinc-400 text-sm">Progreso: {Number(progresoGeneral)}%</p>
        </div>
        <section className="mt-8">
          <h2 className="headline mb-4">Tareas del Proyecto</h2>
          <ul className="space-y-3">
            {tareas.map((t) => (
              <li key={String(t.id)} className="stat-card rounded-lg px-4 py-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-white text-base">{String(t.titulo ?? "")}</span>
                  <span className="status-badge text-xs">{String(t.estado ?? "")}</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">{String(t.descripcion ?? "")}</div>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-8 text-zinc-400 text-xs">Vista de invitado protegida por UID único.</div>
      </div>
    </main>
  );
}
