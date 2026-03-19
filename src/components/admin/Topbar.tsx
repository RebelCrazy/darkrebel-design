import React from "react";

interface TopbarProps {
  title: string;
  cta: string;
  onCTA: () => void;
}

export default function Topbar({ title, cta, onCTA }: TopbarProps) {
  return (
    <header className="h-14 flex items-center px-7 gap-4 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
      <div className="font-syne font-bold text-[15px] tracking-tight flex-1">{title}</div>
      <div className="flex gap-2 items-center">
        <button
          className="btn btn-ghost bg-transparent text-[var(--text2)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-[12.5px] font-medium hover:bg-[var(--surface2)] hover:text-[var(--text)] hover:border-[var(--border2)] transition-all"
          onClick={() => alert('🔔 Sin notificaciones nuevas')}
        >
          🔔
        </button>
        <button
          className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-[12.5px] hover:bg-[var(--accent2)] transition-all"
          onClick={onCTA}
        >
          {cta}
        </button>
      </div>
    </header>
  );
}
