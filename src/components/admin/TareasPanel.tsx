import React, { useState } from "react";


const prioTypes = ["high", "mid", "low", "green"] as const;
type Prio = typeof prioTypes[number];

const initialTasks: {
  porHacer: { title: string; client: string; date: string; prio: Prio }[];
  enProceso: { title: string; client: string; date: string; prio: Prio }[];
  enRevision: { title: string; client: string; date: string; prio: Prio }[];
  listo: { title: string; client: string; date: string; prio: Prio; done?: boolean }[];
} = {
  porHacer: [
    { title: "Definir paleta de colores Piel Luz", client: "Piel Luz Studio", date: "25 mar", prio: "mid" },
    { title: "Integrar formulario de contacto Cenit", client: "Restaurante Cenit", date: "27 mar", prio: "low" },
    { title: "Redactar brief Tech Startup", client: "Tech Startup MX", date: "22 mar", prio: "high" },
    { title: "Cotización Joyería Robles", client: "Prospecto", date: "21 mar", prio: "high" },
  ],
  enProceso: [
    { title: "Diseño de mockups Home María", client: "María González", date: "hoy", prio: "high" },
    { title: "Desarrollo frontend Cenit", client: "Restaurante Cenit", date: "26 mar", prio: "mid" },
    { title: "Subir catálogo de productos Shopify", client: "Piel Luz Studio", date: "24 mar", prio: "low" },
  ],
  enRevision: [
    { title: "Validar textos con cliente María", client: "María González", date: "hoy", prio: "high" },
    { title: "Revisión logo Piel Luz v2", client: "Piel Luz Studio", date: "ayer", prio: "mid" },
    { title: "Contrato Tech Startup firma", client: "Tech Startup MX", date: "mañana", prio: "high" },
  ],
  listo: [
    { title: "Brief María González completado", client: "María González", date: "4 mar", prio: "green", done: true },
    { title: "Cotización Cenit aprobada", client: "Restaurante Cenit", date: "8 mar", prio: "green", done: true },
  ],
};

const prioColor: Record<Prio, string> = {
  high: "bg-[var(--red)]",
  mid: "bg-[var(--orange)]",
  low: "bg-[var(--text3)]",
  green: "bg-[var(--green)]",
};

export default function TareasPanel() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Gestor de Tareas</div>
      <div className="text-[var(--text2)] text-base mb-6">Tablero Kanban para ver el avance de tu equipo en tiempo real y nunca perder nada de vista.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {/* Por hacer */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold"><span className="w-2 h-2 rounded-full bg-[var(--text3)] inline-block"></span>POR HACER <span className="kanban-col-count">{tasks.porHacer.length}</span></div>
            <button className="text-[var(--text3)] text-lg" onClick={() => {}}>+</button>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {tasks.porHacer.map((t, i) => (
              <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-3 cursor-grab">
                <div className="font-medium text-sm mb-1">{t.title}</div>
                <div className="text-xs text-[var(--text3)] mb-1">{t.client}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text3)]">{t.date}</span>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ml-2 ${prioColor[t.prio]}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* En proceso */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold"><span className="w-2 h-2 rounded-full bg-[var(--blue)] inline-block"></span>EN PROCESO <span className="kanban-col-count">{tasks.enProceso.length}</span></div>
            <button className="text-[var(--text3)] text-lg" onClick={() => {}}>+</button>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {tasks.enProceso.map((t, i) => (
              <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-3 cursor-grab">
                <div className="font-medium text-sm mb-1">{t.title}</div>
                <div className="text-xs text-[var(--text3)] mb-1">{t.client}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text3)]">{t.date}</span>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ml-2 ${prioColor[t.prio]}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* En revisión */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold"><span className="w-2 h-2 rounded-full bg-[var(--orange)] inline-block"></span>EN REVISIÓN <span className="kanban-col-count">{tasks.enRevision.length}</span></div>
            <button className="text-[var(--text3)] text-lg" onClick={() => {}}>+</button>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {tasks.enRevision.map((t, i) => (
              <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-3 cursor-grab">
                <div className="font-medium text-sm mb-1">{t.title}</div>
                <div className="text-xs text-[var(--text3)] mb-1">{t.client}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text3)]">{t.date}</span>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ml-2 ${prioColor[t.prio]}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Listo */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold"><span className="w-2 h-2 rounded-full bg-[var(--green)] inline-block"></span>LISTO <span className="kanban-col-count">{tasks.listo.length}</span></div>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {tasks.listo.map((t, i) => (
              <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-3 opacity-60">
                <div className="font-medium text-sm mb-1">{t.title}</div>
                <div className="text-xs text-[var(--text3)] mb-1">{t.client}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text3)]">{t.date}</span>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ml-2 ${prioColor[t.prio]}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
