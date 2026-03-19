import React from "react";

interface ClientRowProps {
  avatar: string;
  avatarColor: string;
  name: string;
  project: string;
  status: React.ReactNode;
}

export default function ClientRow({ avatar, avatarColor, name, project, status }: ClientRowProps) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-b-0">
      <div className="client-avatar" style={{ background: avatarColor }}>{avatar}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-[var(--text)] truncate">{name}</div>
        <div className="text-xs text-[var(--text3)] truncate">{project}</div>
      </div>
      {status}
    </div>
  );
}
