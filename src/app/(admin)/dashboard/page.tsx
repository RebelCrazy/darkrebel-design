import React from "react";
import StatCard from "@/components/admin/StatCard";
import ClientRow from "@/components/admin/ClientRow";

const stats = [
  { label: "Clientes activos", value: <span className="text-[var(--accent)]">8</span>, delta: <span className="text-[var(--green)]">↑ +2 este mes</span> },
  { label: "Proyectos en curso", value: <span className="text-[var(--blue)]">5</span>, delta: "3 en revisión" },
  { label: "Tareas pendientes", value: <span className="text-[var(--orange)]">12</span>, delta: "4 con urgencia" },
  { label: "Ingresos del mes", value: <span className="text-[var(--green)]">$42,500</span>, delta: <span className="text-[var(--green)]">↑ vs $31,000 anterior</span> },
];

const clients = [
  { avatar: "MG", avatarColor: "var(--accent)", name: "María González", project: "Landing page · E-commerce", status: <span className="status-chip chip-active">Activo</span> },
  { avatar: "RC", avatarColor: "var(--blue)", name: "Restaurante Cenit", project: "Sitio web + branding", status: <span className="status-chip chip-progress">En proceso</span> },
  { avatar: "TS", avatarColor: "var(--purple)", name: "Tech Startup MX", project: "Dashboard SaaS", status: <span className="status-chip chip-waiting">En espera</span> },
  { avatar: "PL", avatarColor: "var(--orange)", name: "Piel Luz Studio", project: "Tienda Shopify", status: <span className="status-chip chip-active">Activo</span> },
];

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="font-syne font-extrabold text-3xl mb-1">Bienvenido, Dark Rebel <span role="img" aria-label="saludo">👋</span></div>
        <div className="text-[var(--text2)] text-base">Aquí está el resumen de tu negocio de diseño web</div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {stats.map((stat, i) => (
          <StatCard key={i} label={stat.label} value={stat.value} delta={stat.delta} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Clientes recientes */}
        <div className="card bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div className="font-syne font-bold text-[13px]">Clientes activos</div>
            <div className="text-[11px] text-[var(--accent)] font-mono cursor-pointer" onClick={() => {}}>
              Ver todos →
            </div>
          </div>
          <div className="px-5 py-3">
            {clients.map((c, i) => (
              <ClientRow key={i} {...c} />
            ))}
          </div>
        </div>
        {/* Progreso de proyectos y tareas urgentes: placeholders */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="card bg-[var(--surface)] border border-[var(--border)] rounded-xl">
            <div className="px-5 py-4 border-b border-[var(--border)] font-syne font-bold text-[13px]">Progreso de proyectos</div>
            <div className="px-5 py-3 text-[var(--text2)]">(Migrar progreso de proyectos aquí)</div>
          </div>
          <div className="card bg-[var(--surface)] border border-[var(--border)] rounded-xl">
            <div className="px-5 py-4 border-b border-[var(--border)] font-syne font-bold text-[13px] flex items-center justify-between">
              Tareas urgentes
              <div className="text-[11px] text-[var(--accent)] font-mono cursor-pointer" onClick={() => {}}>
                Ver tablero →
              </div>
            </div>
            <div className="px-5 py-3 text-[var(--text2)]">(Migrar tareas urgentes aquí)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
