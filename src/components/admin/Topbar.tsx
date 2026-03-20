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
    <header style={{ height: 56, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 28px', display: 'flex', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, flex: 1 }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', marginRight: 8, cursor: 'pointer' }}>
          <Bell size={18} />
        </button>
        <button style={{ background: 'var(--accent)', color: '#000', fontWeight: 600, padding: '7px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans', fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} />
          <span>{ctaText}</span>
        </button>
      </div>
    </header>
  )
}
