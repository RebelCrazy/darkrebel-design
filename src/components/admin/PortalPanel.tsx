import React from "react";

export default function PortalPanel() {
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Portal de Cliente</div>
      <div className="text-[var(--text2)] text-base mb-6">Genera un enlace único por proyecto para que tu cliente pueda ver el avance en tiempo real, sin necesidad de que te pregunten "¿cómo va el proyecto?"</div>
      <div className="flex items-center gap-3 bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-5 py-3 mb-5">
        <span className="text-[var(--text3)] text-sm">🔗 Enlace del portal:</span>
        <span className="font-mono text-[var(--accent)] text-xs flex-1">proyecto.darkrebel.store/portal/maria-gonzalez-landing</span>
        <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)] hover:bg-[var(--surface3)]" onClick={() => {navigator.clipboard.writeText('proyecto.darkrebel.store/portal/maria-gonzalez-landing')}}>Copiar</button>
        <button className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--accent2)]">Compartir</button>
      </div>
      <div className="text-[11px] text-[var(--text3)] mb-4 font-mono">VISTA PREVIA — Así ve tu cliente su portal:</div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden mb-6">
        <div className="flex items-center gap-2 bg-[var(--surface2)] border-b border-[var(--border)] px-4 py-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
          <div className="flex-1 bg-[var(--surface3)] rounded px-2 py-0.5 text-[11px] font-mono text-[var(--text3)] ml-2">proyecto.darkrebel.store/portal/maria-gonzalez-landing</div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-7 pb-6 border-b border-[var(--border)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--green)] flex items-center justify-center text-2xl">🛍</div>
            <div>
              <div className="font-syne font-bold text-xl">Landing Page Boutique</div>
              <div className="text-[var(--text2)] text-sm">Cliente: María González · Inicio: 3 marzo 2025</div>
            </div>
            <span className="status-chip chip-active ml-auto">En proceso</span>
          </div>
          <div className="flex gap-1 bg-[var(--surface2)] rounded-lg p-1 mb-6">
            <div className="flex-1 text-center text-xs font-medium py-2 rounded-md text-[var(--green)]">✓ Brief</div>
            <div className="flex-1 text-center text-xs font-medium py-2 rounded-md text-[var(--green)]">✓ Diseño</div>
            <div className="flex-1 text-center text-xs font-medium py-2 rounded-md bg-[var(--surface3)] text-[var(--accent)] font-semibold">→ Revisión</div>
            <div className="flex-1 text-center text-xs font-medium py-2 rounded-md text-[var(--text3)]">Desarrollo</div>
            <div className="flex-1 text-center text-xs font-medium py-2 rounded-md text-[var(--text3)]">Entrega</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="bg-[var(--surface2)] rounded-lg p-4">
              <div className="text-[10px] text-[var(--text3)] font-mono mb-1">Progreso</div>
              <div className="font-syne font-bold text-lg text-[var(--accent)]">85%</div>
            </div>
            <div className="bg-[var(--surface2)] rounded-lg p-4">
              <div className="text-[10px] text-[var(--text3)] font-mono mb-1">Entrega estimada</div>
              <div className="font-syne font-bold text-base mt-1">28 mar</div>
            </div>
            <div className="bg-[var(--surface2)] rounded-lg p-4">
              <div className="text-[10px] text-[var(--text3)] font-mono mb-1">Pagos</div>
              <div className="font-syne font-bold text-lg text-[var(--green)]">$7,500</div>
            </div>
          </div>
          <div className="mt-5 bg-[var(--surface2)] rounded-lg p-4">
            <div className="text-[11px] text-[var(--text3)] font-mono mb-2 tracking-wider">ÚLTIMA ACTUALIZACIÓN</div>
            <div className="text-[13px] text-[var(--text2)] leading-relaxed">✅ Los mockups del Home fueron enviados para revisión. Esperamos tus comentarios en los próximos 2 días hábiles para continuar con el desarrollo.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
