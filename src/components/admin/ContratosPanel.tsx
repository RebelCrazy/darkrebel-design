import React from "react";

const contracts = [
  {
    icon: "📄",
    name: "Contrato de Diseño Web",
    meta: "Para proyectos de desarrollo y diseño · Incluye propiedad intelectual, pagos, revisiones y plazos",
  },
  {
    icon: "🎨",
    name: "Contrato de Branding & Identidad",
    meta: "Para proyectos de marca · Alcance de entregables, uso de logotipos y derechos de autor",
  },
  {
    icon: "🛍",
    name: "Contrato E-commerce",
    meta: "Para tiendas en línea · Incluye integración de pasarelas, mantenimiento y capacitación",
  },
  {
    icon: "🤝",
    name: "Acuerdo de Confidencialidad (NDA)",
    meta: "Para proteger información sensible antes de comenzar cualquier proyecto",
  },
  {
    icon: "🔄",
    name: "Contrato de Mantenimiento Web",
    meta: "Para servicios recurrentes mensuales · Define alcance, horas y condiciones de cancelación",
  },
];

export default function ContratosPanel() {
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Plantillas de Contratos</div>
      <div className="text-[var(--text2)] text-base mb-6">Modelos de contrato revisados por abogada, listos para personalizar con tus datos y enviar de forma profesional y segura.</div>
      <div className="flex flex-col gap-4">
        {contracts.map((c, i) => (
          <div key={i} className="flex items-center gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-6 py-4 hover:border-[var(--border2)] transition-all">
            <div className="w-10 h-10 bg-[var(--surface2)] border border-[var(--border)] rounded-lg flex items-center justify-center text-lg">{c.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[13.5px]">{c.name}</div>
              <div className="text-xs text-[var(--text3)] mt-1">{c.meta}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)]">Vista previa</button>
              <button className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--accent2)]">Usar plantilla</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
