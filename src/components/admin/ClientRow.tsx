import React from 'react';

interface ClientRowProps {
  avatar: string;
  avatarColor: string;
  name: string;
  project: string;
  status: React.ReactNode;
}

export default function ClientRow({ avatar, avatarColor, name, project, status }: ClientRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-sm"
        style={{ backgroundColor: avatarColor, color: 'black' }}
      >
        {avatar}
      </div>
      <div className="flex-1">
        <p className="font-dm-sans font-bold text-sm text-text">{name}</p>
        <p className="font-dm-sans text-xs text-text3">{project}</p>
      </div>
      <div>{status}</div>
    </div>
  );
}
