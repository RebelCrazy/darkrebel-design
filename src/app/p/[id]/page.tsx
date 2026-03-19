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
    <main className="panel p-8 md:p-12 bg-black min-h-screen text-white font-serif">
      <h1 className="text-3xl font-bold mb-4">{String(proyecto.nombre ?? "")}</h1>
      <div className="mb-6">
        <span className="inline-block rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
          {String(proyecto.estado ?? "")}
        </span>
      </div>
      <div className="mb-8">
        <div className="w-full h-4 bg-[#18181b] rounded-full overflow-hidden border border-[#27272a]">
          <div className="h-full bg-white transition-all duration-500" style={{ width: `${progresoGeneral}%` }} />
        </div>
        <p className="mt-2 text-zinc-400 text-sm">Progreso: {Number(progresoGeneral)}%</p>
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Tareas del Proyecto</h2>
        <ul className="space-y-3">
          {tareas.map((t) => (
            <li key={String(t.id)} className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-white text-base">{String(t.titulo ?? "")}</span>
                <span className="text-xs text-zinc-400">{String(t.estado ?? "")}</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">{String(t.descripcion ?? "")}</div>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-8 text-zinc-400 text-xs">Vista de invitado protegida por UID único.</div>
    </main>
  );
}
