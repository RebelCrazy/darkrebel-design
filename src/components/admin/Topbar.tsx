'use client'

import { usePathname } from 'next/navigation'
import { Bell, Plus } from 'lucide-react'

const titleMap: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/admin/crm': 'CRM de Clientes',
  '/admin/tareas': 'Gestor de Tareas',
  '/admin/contratos': 'Contratos',
  '/admin/proyectos': 'Portal de Cliente',
  '/admin/recursos': 'Modelos de Brief',
  '/admin/cotizaciones': 'Cotizaciones',
  '/admin/colaboradores': 'Colaboradores',
}

const ctaMap: { [key: string]: string } = {
  '/dashboard': 'Nuevo Proyecto',
  '/admin/crm': 'Nuevo Cliente',
  '/admin/tareas': 'Nueva Tarea',
  '/admin/proyectos': 'Nuevo Portal',
  // Add other CTAs as needed
}

export default function Topbar() {
  const pathname = usePathname()
  const title = titleMap[pathname] || 'Admin'
  const ctaText = ctaMap[pathname] || 'Nueva Entrada'

  return (
    <header className="h-[56px] bg-surface border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="font-syne font-bold text-base text-text">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-text2 hover:bg-surface2 hover:text-text transition-colors">
          <Bell size={18} />
        </button>
        <button className="btn-accent flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-black font-dm-sans text-sm font-semibold hover:bg-accent2 transition-colors">
          <Plus size={16} />
          <span>{ctaText}</span>
        </button>
      </div>
    </header>
  )
}
