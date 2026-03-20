'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const nav = [
  { href: '/admin/proyectos', label: 'Proyectos' },
  { href: '/admin/crm', label: 'CRM' },
  { href: '/admin/tareas', label: 'Tareas' },
  { href: '/admin/contratos', label: 'Contratos' },
  { href: '/admin/cotizaciones', label: 'Cotizaciones' },
  { href: '/admin/recursos', label: 'Brief' },
  { href: '/admin/colaboradores', label: 'Colaboradores' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#080808' }}>
      <nav style={{ width:240, flexShrink:0, background:'#111111', borderRight:'1px solid #222220', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'20px 16px', borderBottom:'1px solid #222220' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, background:'#ff2020', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:15, color:'#000' }}>D</div>
            <span style={{ fontWeight:800, fontSize:15, color:'#f0ede8' }}>Dark<span style={{ color:'#ff2020' }}>Rebel</span></span>
          </div>
        </div>
        <div style={{ padding:'10px 8px', flex:1 }}>
          <Link href="/dashboard" style={{ display:'block', padding:'7px 10px', borderRadius:5, marginBottom:8, textDecoration:'none', fontSize:11, color:'#555552', border:'1px solid #222220' }}>Dashboard</Link>
          {nav.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href as any} style={{ display:'block', padding:'8px 10px', borderRadius:5, marginBottom:1, textDecoration:'none', fontSize:13, color:active?'#ff2020':'#aaa9a6', background:active?'rgba(255,32,32,0.08)':'transparent', borderLeft:active?'2px solid #ff2020':'2px solid transparent', fontWeight:active?600:400 }}>
                {item.label}
              </Link>
            )
          })}
        </div>
        <div style={{ padding:'12px 8px', borderTop:'1px solid #222220' }}>
          <Link href="/api/admin/logout" style={{ display:'block', padding:'7px 10px', textDecoration:'none', fontSize:11, color:'#555552' }}>Cerrar sesion</Link>
        </div>
      </nav>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ height:50, borderBottom:'1px solid #222220', background:'#111111', display:'flex', alignItems:'center', padding:'0 24px', flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#f0ede8' }}>{nav.find(n => n.href === pathname)?.label ?? 'Panel'}</div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px 48px' }}>{children}</div>
      </div>
    </div>
  )
}
