'use client'
import React from "react";
import StatCard from "@/components/admin/StatCard";
import ClientRow from "@/components/admin/ClientRow";
import StatusChip from "@/components/admin/StatusChip";
import ProjectProgressBar from "@/components/admin/ProjectProgressBar";
import UrgentTaskItem from "@/components/admin/UrgentTaskItem";
import { ArrowUp } from "lucide-react";

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
    { name: "Restaurante Cenit", percentage: 80, color: "blue" },
    { name: "Tech Startup MX", percentage: 45, color: "accent" },
    { name: "Piel Luz Studio", percentage: 60, color: "green" },
]

const tasks = [
    { title: "Diseñar wireframes para Tech Startup", meta: "Hoy · CRM-012", priority: "high" },
    { title: "Llamada de seguimiento con Piel Luz", meta: "Mañana · CRM-009", priority: "mid" },
    { title: "Enviar factura a Restaurante Cenit", meta: "Mañana · FIN-034", priority: "low", initialCompleted: true },
]

// Shared card component wrapper
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
                    {tasks.map((t,i) => (
                        <UrgentTaskItem key={i} {...t} />
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
