import React from 'react';

interface ProjectProgressBarProps {
  name: string;
  percentage: number;
  color?: 'accent' | 'blue' | 'green';
}

const colorMap = {
  accent: 'var(--accent)',
  blue: 'var(--blue)',
  green: 'var(--green)',
}

export default function ProjectProgressBar({ name, percentage, color = 'accent' }: ProjectProgressBarProps) {
  const barColor = colorMap[color];

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-1">
        <p className="font-dm-sans text-sm font-medium text-text">{name}</p>
        <p className="font-dm-mono text-sm text-text2">{percentage}%</p>
      </div>
      <div className="w-full bg-surface2 rounded-full h-1.5">
        <div 
          className="h-1.5 rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        ></div>
      </div>
    </div>
  );
}
