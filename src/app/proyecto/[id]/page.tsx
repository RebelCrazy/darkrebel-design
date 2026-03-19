import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { obtenerProyectoPorId } from "@/lib/db";

export const runtime = "edge";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProyectoClientePage({ params }: Props) {
  const { id } = await params;
  const proyecto = await obtenerProyectoPorId(id);

  if (!proyecto) {
    notFound();
  }

  return (
    <>
      <main className="panel relative overflow-hidden p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="relative z-10 space-y-8">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Dark Rebel Client View</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{proyecto.nombre}</h1>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-black/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Estado</p>
              <p className="mt-2 text-lg text-zinc-100">{proyecto.estado}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-black/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Progreso</p>
              <p className="mt-2 text-lg text-zinc-100">{proyecto.progreso}%</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Avance del proyecto</p>
            <div className="w-full h-4 bg-[#18181b] rounded-full overflow-hidden border border-[#27272a]">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${proyecto.progreso}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
            <span>{proyecto.cliente_email}</span>
            {proyecto.link_figma ? (
              <a
                href={proyecto.link_figma}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 hover:border-zinc-500"
              >
                Ver Figma <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </main>
      <style jsx global>{`
        body { font-family: 'Georgia', 'Times New Roman', serif; background: #000; }
        .panel { background: #000; border-radius: 1.2rem; border: 1px solid #27272a; }
      `}</style>
    </>
  );
}
