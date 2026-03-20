'use client'

import { NavLink } from './NavLink';
import React from 'react';

import { usePathname } from 'next/navigation'
import { Zap, LayoutGrid, Link2, Users, CheckCircle2, FileText, ClipboardList, FileSignature, Users2 } from 'lucide-react'

const navItems = {
  principal: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, badge: '3' },
    { href: '/admin/proyectos', label: 'Portal de Cliente', icon: Link2, badge: '8' },
    { href: '/admin/crm', label: 'CRM de Clientes', icon: Users, badge: '12' },
    { href: '/admin/tareas', label: 'Gestor de Tareas', icon: CheckCircle2 },
  ],
  plantillas: [
    { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: FileText },
    { href: '/admin/recursos', label: 'Modelos de Brief', icon: ClipboardList },
    { href: '/admin/contratos', label: 'Contratos', icon: FileSignature },
  ],
  equipo: [
    { href: '/admin/colaboradores', label: 'Colaboradores', icon: Users2 },
  ]
} as const;

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{ width: 260, minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)' }} className="flex flex-col">
      {/* Brand */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8 }} className="flex items-center justify-center">
            <span style={{ fontSize: 20, fontWeight: 700 }}>⚡</span>
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>
            Dark<span style={{ color: 'var(--accent)' }}>Rebel</span>
          </span>
        </div>
        <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', marginTop: 4, letterSpacing: 0.02 }}>sistema de gestión</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col" style={{ padding: '0 0', marginTop: 8 }}>
        {/* Secciones */}
        {Object.entries(navItems).map(([section, items]) => (
          <div key={section} style={{ margin: '20px 0 6px' }}>
            <div style={{ fontFamily: 'DM Mono', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 8px', marginBottom: 6 }}>{section.charAt(0).toUpperCase() + section.slice(1)}</div>
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-[10px] py-[9px] rounded-[8px] transition-all relative ${isActive ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-medium' : 'text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)]'}`}
                  style={{ fontSize: 13.5, fontFamily: 'DM Sans', borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent', marginBottom: 2, cursor: 'pointer' }}
                >
                  <item.icon size={18} />
                  <span className="flex-1" style={{ fontWeight: 500 }}>{item.label}</span>
                  {'badge' in item && item.badge && (
                    <span style={{ background: 'var(--surface3)', color: 'var(--text3)', fontFamily: 'DM Mono', fontSize: 10, padding: '2px 6px', borderRadius: 20, border: '1px solid var(--border)', marginLeft: 'auto' }}>{item.badge}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2" style={{ padding: '8px 10px', borderRadius: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 700, color: '#000', fontSize: 15 }}>DR</span>
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Dark Rebel</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
