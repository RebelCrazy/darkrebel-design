import React from 'react';

type Status = 'Activo' | 'En proceso' | 'En espera' | 'Entregado' | 'Prospecto';

interface StatusChipProps {
  status: Status;
}

const statusColors: Record<Status, string> = {
  'Activo': 'var(--green)',
  'En proceso': 'var(--blue)',
  'En espera': 'var(--orange)',
  'Entregado': 'var(--text3)',
  'Prospecto': 'var(--purple)',
};

export default function StatusChip({ status }: StatusChipProps) {
  const color = statusColors[status] || 'var(--text3)';

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="font-dm-mono text-xs font-medium" style={{ color: color }}>
        {status}
      </span>
    </div>
  );
}
