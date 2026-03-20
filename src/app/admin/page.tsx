"use client"
import React from "react";
import StatCard from "@/components/admin/StatCard";
import ClientRow from "@/components/admin/ClientRow";
import StatusChip from "@/components/admin/StatusChip";
import ProjectProgressBar from "@/components/admin/ProjectProgressBar";
import UrgentTaskItem from "@/components/admin/UrgentTaskItem";
import { ArrowUp } from "lucide-react";

export type Priority = 'high' | 'mid' | 'low';

const stats = [
  { label: "Clientes activos", value: <span className="text-accent">8</span>, delta: <div className="flex items-center gap-1"><ArrowUp size={12} className="text-green" /> +2 este mes</div> },
  { label: "Proyectos en curso", value: <span className="text-blue">5</span>, delta: "3 en revisión" },
  { label: "Tareas pendientes", value: <span className="text-orange">12</span>, delta: "4 con urgencia" },
  { label: "Ingresos del mes", value: <span className="text-green">$42,500</span>, delta: <div className="flex items-center gap-1"><ArrowUp size={12} className="text-green" /> vs $31,000</div> },
];

const clients = [
  { avatar: "MG", avatarColor: "var(--accent)", name: "María González", project: "Landing page · E-commerce", status: <StatusChip status="Activo" /> },
  { avatar: "RC", avatarColor: "var(--blue)", name: "Restaurante Cenit", project: "Sitio web + branding", status: <StatusChip status="En proceso" /> },
  { avatar: "TS", avatarColor: "var(--purple)", name: "Tech Startup MX", project: "Dashboard SaaS", status: <StatusChip status="Prospecto" /> },
  { avatar: "PL", avatarColor: "var(--orange)", name: "Piel Luz Studio", project: "Tienda Shopify", status: <StatusChip status="En espera" /> },
];

const projects = [
    { name: "Restaurante Cenit", percentage: 80, color: "blue" as const },
    { name: "Tech Startup MX", percentage: 45, color: "accent" as const },
    { name: "Piel Luz Studio", percentage: 60, color: "green" as const },
]

const urgentTasks: { title: string; meta: string; priority: Priority; done: boolean }[] = [
  { title: 'Entregar mockups Home · María', meta: 'Hoy · María González', priority: 'high', done: false },
  { title: 'Revisar contrato Tech Startup', meta: 'Mañana · Legal', priority: 'high', done: false },
  { title: 'Enviar cotización Cenit', meta: 'Hecho · ayer', priority: 'mid', done: true },
];

const Card = ({ title, cta, children, className }: { title: string, cta?: React.ReactNode, children: React.ReactNode, className?: string }) => (
    <div className={`bg-surface border border-border rounded-xl ${className}`}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h2 className="font-syne font-bold text-sm text-text">{title}</h2>
        {cta}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );

export default function DashboardPage() {
  return (
    <div className="w-full font-dm-sans">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-3xl mb-1">Bienvenido, Dark Rebel 👋</h1>
        <p className="text-text2 text-base">Aquí está el resumen de tu negocio de diseño web.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} label={stat.label} value={stat.value} delta={stat.delta} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card title="Clientes activos" cta={<button className="font-dm-mono text-xs text-accent hover:underline">Ver todos →</button>}>
            <div className="space-y-2">
                {clients.map((c, i) => (
                    <ClientRow key={i} {...c} />
                ))}
            </div>
           </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card title="Progreso de proyectos">
                <div className="space-y-4">
                    {projects.map((p,i) => (
                        <ProjectProgressBar key={i} {...p} />
                    ))}
                </div>
            </Card>
            <Card title="Tareas urgentes" cta={<button className="font-dm-mono text-xs text-accent hover:underline">Ver tablero →</button>}>
              <div className="space-y-1">
                {urgentTasks.map((t,i) => (
                  <UrgentTaskItem key={i} title={t.title} meta={t.meta} priority={t.priority} initialCompleted={t.done} />
                ))}
              </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
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
