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
    <aside className="w-[var(--sidebar-w)] bg-surface border-r border-border flex flex-col fixed top-0 left-0 h-full">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent text-black flex items-center justify-center rounded-lg">
            <Zap size={20} />
          </div>
          <span className="font-syne font-bold text-lg text-text">DarkRebel</span>
        </div>
        <p className="font-dm-mono text-xs text-text3 mt-1">v1.0 · sistema de gestión</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-4">
        <div>
          <h3 className="px-2 mb-2 font-dm-mono text-xs font-medium uppercase text-text3 tracking-wider">Principal</h3>
          {navItems.principal.map((item) => {
            const isActive = pathname === item.href
            return (
              <NavLink
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative
                  ${isActive
                    ? 'bg-accent-dim text-accent font-semibold'
                    : 'text-text2 hover:bg-surface2 hover:text-text'
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-accent" />}
                <item.icon size={18} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {'badge' in item && item.badge && (
                  <span className={`text-xs font-dm-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-accent text-black' : 'bg-surface3 text-text2'}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>
        
        <div>
          <h3 className="px-2 mb-2 font-dm-mono text-xs font-medium uppercase text-text3 tracking-wider">Plantillas</h3>
          {navItems.plantillas.map((item) => {
            const isActive = pathname === item.href
            return (
              <NavLink
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative
                  ${isActive
                    ? 'bg-accent-dim text-accent font-semibold'
                    : 'text-text2 hover:bg-surface2 hover:text-text'
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-accent" />}
                <item.icon size={18} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </div>

        <div>
          <h3 className="px-2 mb-2 font-dm-mono text-xs font-medium uppercase text-text3 tracking-wider">Equipo</h3>
          {navItems.equipo.map((item) => {
            const isActive = pathname === item.href
            return (
              <NavLink
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative
                  ${isActive
                    ? 'bg-accent-dim text-accent font-semibold'
                    : 'text-text2 hover:bg-surface2 hover:text-text'
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-accent" />}
                <item.icon size={18} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
      
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-surface2 border border-border rounded-full flex items-center justify-center">
            <span className="font-syne font-bold text-text2">DR</span>
          </div>
          <div>
            <p className="text-sm font-bold text-text">Dark Rebel</p>
            <p className="text-xs text-text3 font-dm-mono">admin@darkrebel.store</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
