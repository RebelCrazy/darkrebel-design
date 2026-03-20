import React from 'react';

// Assuming task data might look like this.
// We'll add a placeholder for priority.
export interface Task {
  id: string;
  titulo: string;
  cliente_nombre?: string;
  fecha_entrega?: string;
  priority?: 'high' | 'mid' | 'low';
}

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  high: 'var(--red)',
  mid: 'var(--orange)',
  low: 'var(--text3)',
};

export default function TaskCard({ task }: TaskCardProps) {
  const priority = task.priority || 'low';
  const priorityColor = priorityColors[priority];
  
  // Format date if it exists
  const formattedDate = task.fecha_entrega 
    ? new Date(task.fecha_entrega).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
    : '';

  return (
    <div className="bg-surface2 border border-border rounded-lg p-4 cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start">
        <p className="font-medium text-sm text-text pr-4">{task.titulo}</p>
        <div 
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: priorityColor }}
          title={`Prioridad: ${priority}`}
        ></div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-text3">{task.cliente_nombre || 'Sin cliente'}</span>
        <span className="font-dm-mono text-xs text-text3">{formattedDate}</span>
      </div>
    </div>
  );
}
