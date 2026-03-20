import React from 'react';

interface CardProps {
  title: string;
  cta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, cta, children, className }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-xl ${className}`}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h2 className="font-syne font-bold text-sm text-text">{title}</h2>
        {cta}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
