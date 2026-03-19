import React from "react";

const navItems = [
  { key: 'overview', icon: '⬛', label: 'Dashboard' },
  { key: 'portal', icon: '🔗', label: 'Portal de Cliente', badge: 3 },
  { key: 'crm', icon: '👥', label: 'CRM de Clientes', badge: 8 },
  { key: 'tareas', icon: '✅', label: 'Gestor de Tareas', badge: 12 },
];
const plantillas = [
  { key: 'cotizaciones', icon: '💰', label: 'Cotizaciones' },
  { key: 'briefs', icon: '📋', label: 'Modelos de Brief' },
  { key: 'contratos', icon: '📄', label: 'Contratos' },
];
const equipo = [
  { key: 'colaboradores', icon: '🤝', label: 'Colaboradores' },
];

export default function Sidebar({ activePanel, setActivePanel }: { activePanel: string, setActivePanel: (key: string) => void }) {
  return (
    <nav className="flex flex-col w-[var(--sidebar-w)] bg-[var(--surface)] border-r border-[var(--border)] h-full overflow-y-auto">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-lg font-bold">⚡</div>
          <span className="font-syne font-extrabold text-base tracking-tight text-[var(--text)]">Dark<span className="text-[var(--accent)]">Rebel</span></span>
        </div>
        <div className="text-[11px] text-[var(--text3)] font-mono tracking-wider pl-10">v1.0 · sistema de gestión</div>
      </div>

      {/* Principal */}
      <div className="px-3 pt-5 pb-2">
        <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-widest px-2 mb-1">Principal</div>
        {navItems.map(item => (
          <div
            key={item.key}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all text-[13.5px] font-normal relative mb-0.5 ${activePanel === item.key ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-medium' : 'text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)]'}`}
            onClick={() => setActivePanel(item.key)}
          >
            <span className="w-5 h-5 flex items-center justify-center text-[14px]">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className={`ml-auto bg-[var(--surface3)] text-[var(--text3)] text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-[var(--border)] ${activePanel === item.key ? 'bg-[var(--accent-dim)] text-[var(--accent)] border-[rgba(232,255,71,0.2)]' : ''}`}>{item.badge}</span>
            )}
            {activePanel === item.key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-[var(--accent)] rounded-r"></span>
            )}
          </div>
        ))}
      </div>

      {/* Plantillas */}
      <div className="px-3 pt-4 pb-2">
        <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-widest px-2 mb-1">Plantillas</div>
        {plantillas.map(item => (
          <div
            key={item.key}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all text-[13.5px] font-normal relative mb-0.5 ${activePanel === item.key ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-medium' : 'text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)]'}`}
            onClick={() => setActivePanel(item.key)}
          >
            <span className="w-5 h-5 flex items-center justify-center text-[14px]">{item.icon}</span>
            {item.label}
            {activePanel === item.key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-[var(--accent)] rounded-r"></span>
            )}
          </div>
        ))}
      </div>

      {/* Equipo */}
      <div className="px-3 pt-4 pb-2">
        <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-widest px-2 mb-1">Equipo</div>
        {equipo.map(item => (
          <div
            key={item.key}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all text-[13.5px] font-normal relative mb-0.5 ${activePanel === item.key ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-medium' : 'text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)]'}`}
            onClick={() => setActivePanel(item.key)}
          >
            <span className="w-5 h-5 flex items-center justify-center text-[14px]">{item.icon}</span>
            {item.label}
            {activePanel === item.key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-[var(--accent)] rounded-r"></span>
            )}
          </div>
        ))}
      </div>

      {/* Footer usuario */}
      <div className="mt-auto px-3 py-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors hover:bg-[var(--surface2)]">
          <div className="w-[30px] h-[30px] bg-gradient-to-br from-[var(--accent)] to-[var(--green)] rounded-full flex items-center justify-center text-xs font-bold text-black">DR</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-medium text-[var(--text)] truncate">Dark Rebel Studio</div>
            <div className="text-[11px] text-[var(--text3)]">Administrador</div>
          </div>
          <span className="text-[var(--text3)] text-[12px]">⚙</span>
        </div>
      </div>
    </nav>
  );
}
