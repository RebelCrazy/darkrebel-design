import React from 'react';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  delta: React.ReactNode;
}

export default function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="font-dm-mono text-xs text-text3 uppercase tracking-wider">{label}</p>
      <div className="font-syne font-bold text-3xl mt-2 mb-3">{value}</div>
      <p className="font-dm-sans text-xs text-text2">{delta}</p>
    </div>
  );
}
