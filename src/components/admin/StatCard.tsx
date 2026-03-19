import React from "react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  colorClass?: string;
}

export default function StatCard({ label, value, delta, colorClass = "" }: StatCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 transition-colors hover:border-[var(--border2)]">
      <div className="text-xs text-[var(--text3)] font-mono uppercase mb-2">{label}</div>
      <div className={`font-syne font-bold text-2xl ${colorClass}`}>{value}</div>
      {delta && <div className="text-xs text-[var(--text3)] mt-1 flex items-center gap-1">{delta}</div>}
    </div>
  );
}
