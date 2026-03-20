"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const nav = [
    { href: '/dashboard', label: 'Dashboard', icon: '⬛' },
    { href: '/admin/proyectos', label: 'Proyectos', icon: '🔗' },
    { href: '/admin/crm', label: 'CRM', icon: '👥' },
    { href: '/admin/tareas', label: 'Tareas', icon: '✅' },
    { href: '/admin/contratos', label: 'Contratos', icon: '📄' },
    { href: '/admin/recursos', label: 'Brief', icon: '📋' },
  ]

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:'#0a0a0b',fontFamily:'sans-serif'}}>
      <nav style={{width:240,flexShrink:0,background:'#111113',borderRight:'1px solid #2a2a32',display:'flex',flexDirection:'column',overflowY:'auto'}}>
        <div style={{padding:'24px 20px',borderBottom:'1px solid #2a2a32'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:32,height:32,background:'#e8ff47',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>⚡</div>
            <span style={{fontWeight:800,fontSize:16,color:'#f0f0f2'}}>Dark<span style={{color:'#e8ff47'}}>Rebel</span></span>
          </div>
          <div style={{fontSize:11,color:'#5a5a6a',marginTop:4,paddingLeft:42}}>sistema de gestión</div>
        </div>
        <div style={{padding:'12px 10px',flex:1}}>
          {nav.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href as any} style={{
                display:'flex',alignItems:'center',gap:10,
                padding:'9px 10px',borderRadius:8,marginBottom:2,
                textDecoration:'none',fontSize:13.5,
                color: active ? '#e8ff47' : '#9898a8',
                background: active ? 'rgba(232,255,71,0.08)' : 'transparent',
                borderLeft: active ? '3px solid #e8ff47' : '3px solid transparent',
                fontWeight: active ? 500 : 400,
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
        <div style={{padding:'16px 12px',borderTop:'1px solid #2a2a32'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#e8ff47,#47e8a0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#000'}}>DR</div>
            <div>
              <div style={{fontSize:12.5,fontWeight:500,color:'#f0f0f2'}}>Dark Rebel Studio</div>
              <div style={{fontSize:11,color:'#5a5a6a'}}>Administrador</div>
            </div>
          </div>
        </div>
      </nav>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{height:56,borderBottom:'1px solid #2a2a32',background:'#111113',display:'flex',alignItems:'center',padding:'0 28px',gap:16,flexShrink:0}}>
          <div style={{flex:1,fontWeight:700,fontSize:15,color:'#f0f0f2'}}>
            {nav.find(n => n.href === pathname)?.label ?? 'Panel'}
          </div>
          <button style={{background:'#e8ff47',color:'#000',fontWeight:600,border:'none',borderRadius:8,padding:'7px 16px',fontSize:12.5,cursor:'pointer'}}>
            + Nuevo
          </button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'32px'}}>
          {children}
        </div>
      </div>
    </div>
  )
}
