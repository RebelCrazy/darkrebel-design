'use client'

import React, { useState } from 'react';
import { Check } from 'lucide-react';

type Priority = 'high' | 'mid' | 'low';

interface UrgentTaskItemProps {
  title: string;
  meta: string;
  priority: Priority;
  initialCompleted?: boolean;
}

const priorityColors: Record<Priority, string> = {
  high: 'var(--red)',
  mid: 'var(--orange)',
  low: 'var(--text3)',
};

export default function UrgentTaskItem({ title, meta, priority, initialCompleted = false }: UrgentTaskItemProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const priorityColor = priorityColors[priority];

  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
      <div 
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: priorityColor }}
      ></div>
      <button 
        onClick={() => setCompleted(!completed)}
        className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors
          ${completed ? 'bg-accent border-accent' : 'border-border2'}`}
      >
        {completed && <Check size={12} className="text-black" />}
      </button>
      <div className="flex-1">
        <p className={`font-dm-sans text-sm font-medium transition-colors ${completed ? 'text-text3 line-through' : 'text-text'}`}>
          {title}
        </p>
        <p className={`font-dm-mono text-xs transition-colors ${completed ? 'text-text3' : 'text-text2'}`}>
          {meta}
        </p>
      </div>
    </div>
  );
}
