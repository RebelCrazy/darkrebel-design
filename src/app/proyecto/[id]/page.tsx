"use client";
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
    <main className="panel relative overflow-hidden p-8 md:p-12 bg-black min-h-screen text-white font-serif">
      <div className="hero-noise absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10 space-y-8">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Dark Rebel Client View</p>
        <h1 className="display-md text-white mb-4">{String(proyecto.nombre ?? "")}</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="stat-card">
            <p className="label">Estado</p>
            <p className="mt-2 text-lg text-zinc-100"><span className={`status-badge status-${(proyecto.estado || '').toLowerCase().replace(/ /g, '-')}`}>{String(proyecto.estado ?? "")}</span></p>
          </div>
          <div className="stat-card">
            <p className="label">Progreso</p>
            <p className="mt-2 text-lg text-zinc-100">{Number(proyecto.progreso ?? 0)}%</p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Avance del proyecto</p>
          <div className="post-progress w-full h-4 rounded-full overflow-hidden border border-[#222220] bg-[#111111]">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${proyecto.progreso}%` }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          <span>{String(proyecto.cliente_email ?? "")}</span>
          {proyecto.link_figma && typeof proyecto.link_figma === "string" && proyecto.link_figma.length > 0 ? (
            <a
              href={proyecto.link_figma as string}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Ver Figma <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </main>
  );
}
