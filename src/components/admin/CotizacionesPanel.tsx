import React from "react";

const quotes = [
  {
    num: "#COT-024",
    date: "19 de marzo, 2025",
    status: <span className="status-chip chip-waiting">Pendiente</span>,
    client: "Joyería Robles",
    email: "ventas@jroblesmx.com",
    location: "CDMX, México",
    validUntil: "2 de abril, 2025",
    payment: "50% inicio · 50% entrega",
    services: [
      { name: "Diseño UX/UI", desc: "Wireframes, diseño de páginas, componentes", amount: "$8,000" },
      { name: "Desarrollo web", desc: "Desarrollo en Shopify, integración de carrito", amount: "$10,000" },
      { name: "SEO básico", desc: "Optimización meta tags, velocidad, sitemap", amount: "$2,500" },
      { name: "Capacitación", desc: "2 sesiones de 1 hr para gestión del sitio", amount: "$1,500" },
    ],
    total: "$22,000 MXN",
  },
];

export default function CotizacionesPanel() {
  const q = quotes[0];
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Plantilla de Cotizaciones</div>
      <div className="text-[var(--text2)] text-base mb-6">Genera cotizaciones profesionales en menos de 5 minutos. Personaliza y exporta como PDF para enviar al cliente.</div>
      <div className="flex gap-2 mb-4">
        <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)]">← Mis cotizaciones</button>
        <button className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--accent2)]">+ Nueva cotización</button>
        <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)] ml-auto">📤 Exportar PDF</button>
      </div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden max-w-2xl">
        <div className="flex justify-between items-start bg-[var(--surface2)] px-8 py-7 border-b border-[var(--border)]">
          <div>
            <div className="font-syne font-extrabold text-2xl">Dark<span className="text-[var(--accent)]">Rebel</span></div>
            <div className="text-[11px] text-[var(--text3)] font-mono">diseño web & branding · darkrebel.store</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-2xl font-bold text-[var(--accent)]">{q.num}</div>
            <div className="text-[11px] text-[var(--text3)]">{q.date}</div>
            <div className="mt-2">{q.status}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 px-8 py-5 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] font-mono text-[var(--text3)] uppercase mb-1">Cotización para</div>
            <div className="font-medium text-[15px]">{q.client}</div>
            <div className="text-[var(--text2)] text-sm">{q.email}</div>
            <div className="text-[var(--text2)] text-sm">{q.location}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--text3)] uppercase mb-1">Válida hasta</div>
            <div>{q.validUntil}</div>
            <div className="mt-3">
              <div className="text-[10px] font-mono text-[var(--text3)] uppercase mb-1">Condiciones de pago</div>
              <div>{q.payment}</div>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Servicio</th>
              <th className="text-left text-[10px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Descripción</th>
              <th className="text-right text-[10px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Monto</th>
            </tr>
          </thead>
          <tbody>
            {q.services.map((s, i) => (
              <tr key={i}>
                <td className="px-4 py-3 border-b border-[var(--border)] font-medium">{s.name}</td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-[var(--text2)]">{s.desc}</td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-right font-mono">{s.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end px-8 py-5 border-t border-[var(--border)] bg-[var(--surface2)]">
          <div className="text-right">
            <div className="text-[12px] text-[var(--text3)] mb-1">TOTAL DEL PROYECTO</div>
            <div className="font-syne font-extrabold text-2xl text-[var(--accent)]">{q.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
