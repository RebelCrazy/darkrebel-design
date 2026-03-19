import React, { useState } from "react";

const templates = [
  {
    key: "web",
    icon: "🌐",
    name: "Brief de Sitio Web",
    desc: "Para proyectos de diseño y desarrollo web. Incluye preguntas sobre objetivos, audiencia, competidores y referencias visuales.",
    tag: "18 preguntas",
  },
  {
    key: "branding",
    icon: "✦",
    name: "Brief de Branding",
    desc: "Para proyectos de identidad visual y marca. Perfil de empresa, valores, personalidad de marca y competencia.",
    tag: "22 preguntas",
  },
  {
    key: "ecommerce",
    icon: "🛍",
    name: "Brief E-commerce",
    desc: "Para tiendas en línea. Catálogo, métodos de pago, logística, integraciones y flujo de compra esperado.",
    tag: "25 preguntas",
  },
];


const briefTypes = ["web", "branding", "ecommerce"] as const;
type BriefType = typeof briefTypes[number];
const briefTitles: Record<BriefType, string> = {
  web: "📋 Brief de Sitio Web",
  branding: "✦ Brief de Branding",
  ecommerce: "🛍 Brief E-commerce",
};

export default function BriefsPanel() {
  const [briefType, setBriefType] = useState<BriefType>("web");
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Modelos de Brief</div>
      <div className="text-[var(--text2)] text-base mb-6">Obtén toda la información del cliente desde el inicio. Evita malentendidos y entrega exactamente lo que necesitan.</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        {templates.map(t => (
          <div key={t.key} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 cursor-pointer hover:border-[var(--accent)] transition-all relative" onClick={() => setBriefType(t.key as BriefType)}>
            <span className="text-2xl mb-3 block">{t.icon}</span>
            <div className="font-syne font-bold text-base mb-1">{t.name}</div>
            <div className="text-xs text-[var(--text2)] mb-2">{t.desc}</div>
            <span className="inline-block mt-2 text-[10px] font-mono bg-[var(--accent-dim)] text-[var(--accent)] px-2 py-0.5 rounded">{t.tag}</span>
            {briefType === t.key && <span className="absolute inset-0 border-2 border-[var(--accent)] rounded-xl pointer-events-none"></span>}
          </div>
        ))}
      </div>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="px-7 py-6 border-b border-[var(--border)] bg-[var(--surface2)]">
          <div className="font-syne font-bold text-lg mb-1">{briefTitles[briefType]}</div>
          <div className="text-[13px] text-[var(--text2)]">Completa con tu cliente o comparte el enlace para que lo llene en línea</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 py-6">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">Nombre del cliente / empresa</label>
            <input className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]" placeholder="Ej. María González / Boutique Luna" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">Giro o industria</label>
            <input className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]" placeholder="Ej. Moda, Restaurante, SaaS..." />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿Cuál es el objetivo principal del sitio?</label>
            <textarea className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)] min-h-[90px]" placeholder="Ej. Generar ventas en línea, mostrar mi portafolio, conseguir prospectos por formulario..."></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿A quién va dirigido el sitio?</label>
            <input className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]" placeholder="Describe tu cliente ideal" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿Tienes sitio web actualmente?</label>
            <select className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]">
              <option value="">Selecciona...</option>
              <option>Sí, y quiero rediseñarlo</option>
              <option>No, es un sitio nuevo</option>
              <option>Sí, y solo quiero mejoras puntuales</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿Tienes referencias de sitios que te gusten? (URLs)</label>
            <textarea className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)] min-h-[60px]" placeholder="Pega aquí los links de referencia separados por coma..."></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿Cuál es tu presupuesto aproximado?</label>
            <input className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]" placeholder="Ej. $10,000 - $20,000 MXN" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-[var(--text3)] uppercase">¿Fecha de entrega ideal?</label>
            <input className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--accent)]" type="date" />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-7 py-4 border-t border-[var(--border)] bg-[var(--surface2)]">
          <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)]">Guardar borrador</button>
          <button className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--accent2)]">✉️ Enviar al cliente</button>
        </div>
      </div>
    </div>
  );
}
