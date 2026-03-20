import os

# ── FILE 1: src/app/(admin)/layout.tsx ──────────────────────────────
content1 = """\
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const nav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin/proyectos', label: 'Proyectos' },
  { href: '/admin/crm', label: 'CRM' },
  { href: '/admin/tareas', label: 'Tareas' },
  { href: '/admin/contratos', label: 'Contratos' },
  { href: '/admin/cotizaciones', label: 'Cotizaciones' },
  { href: '/admin/recursos', label: 'Brief' },
  { href: '/admin/colaboradores', label: 'Colaboradores' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#080808' }}>
      <nav style={{ width:240, flexShrink:0, background:'#111111', borderRight:'1px solid #222220', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'20px 16px', borderBottom:'1px solid #222220' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, background:'#ff2020', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:15, color:'#000' }}>D</div>
            <span style={{ fontWeight:800, fontSize:15, color:'#f0ede8' }}>Dark<span style={{ color:'#ff2020' }}>Rebel</span></span>
          </div>
          <div style={{ fontSize:9, color:'#555552', marginTop:3, paddingLeft:36, letterSpacing:'0.1em' }}>SISTEMA DE GESTION</div>
        </div>
        <div style={{ padding:'10px 8px', flex:1 }}>
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
          <Link href="/api/admin/logout" style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', textDecoration:'none', fontSize:11, color:'#555552' }}>
            <div style={{ width:22, height:22, borderRadius:'50%', background:'#ff2020', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, color:'#000' }}>DR</div>
            Cerrar sesion
          </Link>
        </div>
      </nav>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ height:50, borderBottom:'1px solid #222220', background:'#111111', display:'flex', alignItems:'center', padding:'0 24px', flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#f0ede8', flex:1 }}>{nav.find(n => n.href === pathname)?.label ?? 'Panel'}</div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px 48px' }}>{children}</div>
      </div>
    </div>
  )
}
"""

# ── FILE 2: src/app/admin/layout.tsx ────────────────────────────────
content2 = """\
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
"""

# ── FILE 3: src/app/(admin)/dashboard/page.tsx ──────────────────────
content3 = """\
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Priority = 'high' | 'mid' | 'low'
interface Task { title: string; meta: string; priority: Priority; done: boolean }
interface Project { id: string; uid?: string; nombre: string; cliente_email?: string; progreso: number; estado: string }

const priorityColor: Record<Priority, string> = { high:'#ff3c3c', mid:'#ff6b35', low:'#555552' }
const statusColor: Record<string, string> = {
  'Planeacion':'#4fa3ff', 'En Desarrollo':'#ff2020',
  'Revision':'#ff6b35', 'Finalizado':'#47e8a0'
}
const card = { background:'#111111', border:'1px solid #222220', borderRadius:10, overflow:'hidden' as const }

const INIT_TASKS: Task[] = [
  { title:'Revisar mockups del proyecto activo', meta:'Hoy', priority:'high', done:false },
  { title:'Enviar contrato pendiente', meta:'Esta semana', priority:'high', done:false },
  { title:'Actualizar progreso en portal', meta:'Hoy', priority:'mid', done:false },
]

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>(INIT_TASKS)

  useEffect(() => {
    fetch('/api/proyectos')
      .then(r => r.json())
      .then(d => setProjects(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  const toggle = (i: number) => setTasks(p => p.map((t, idx) => idx === i ? { ...t, done: !t.done } : t))

  const statCards = [
    { label:'PROYECTOS', value:projects.length, color:'#f0ede8' },
    { label:'EN CURSO', value:projects.filter(p => p.estado !== 'Finalizado').length, color:'#ff2020' },
    { label:'FINALIZADOS', value:projects.filter(p => p.estado === 'Finalizado').length, color:'#47e8a0' },
    { label:'PENDIENTES', value:tasks.filter(t => !t.done).length, color:'#ff6b35' },
  ]

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontWeight:800, fontSize:24, color:'#f0ede8', marginBottom:4 }}>Bienvenido, Dark Rebel</div>
        <div style={{ fontSize:13, color:'#555552' }}>Panel de gestion de proyectos y clientes</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
        {statCards.map(s => (
          <div key={s.label} style={{ ...card, padding:14 }}>
            <div style={{ fontSize:9, color:'#555552', letterSpacing:'0.12em', marginBottom:6 }}>{s.label}</div>
            <div style={{ fontWeight:800, fontSize:26, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
        <div style={card}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #222220', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontWeight:700, fontSize:13, color:'#f0ede8' }}>Proyectos activos</span>
            <Link href="/admin/proyectos" style={{ fontSize:10, color:'#ff2020', textDecoration:'none' }}>Ver todos</Link>
          </div>
          <div style={{ padding:'10px 16px' }}>
            {projects.length === 0 ? (
              <div style={{ textAlign:'center', padding:'20px 0', color:'#555552', fontSize:12 }}>Sin proyectos</div>
            ) : projects.slice(0, 5).map(p => {
              const sc = statusColor[p.estado] ?? '#555552'
              return (
                <div key={p.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid #222220' }}>
                  <div style={{ width:28, height:28, borderRadius:5, background:'#ff2020', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#000', flexShrink:0 }}>
                    {(p.nombre || '?')[0].toUpperCase()}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:500, color:'#f0ede8' }}>{p.nombre}</div>
                    <div style={{ fontSize:10, color:'#555552' }}>{p.cliente_email || '—'}</div>
                  </div>
                  <span style={{ fontSize:10, padding:'2px 7px', borderRadius:20, background:sc+'22', color:sc }}>{p.estado}</span>
                  <span style={{ fontSize:10, color:'#ff2020' }}>{p.progreso}%</span>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={card}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #222220' }}>
              <span style={{ fontWeight:700, fontSize:13, color:'#f0ede8' }}>Progreso</span>
            </div>
            <div style={{ padding:'10px 16px' }}>
              {projects.length === 0 && <div style={{ fontSize:11, color:'#555552', textAlign:'center', padding:'10px 0' }}>Sin datos</div>}
              {projects.slice(0, 4).map(p => {
                const pct = Number(p.progreso) || 0
                const c = pct > 70 ? '#ff2020' : pct > 30 ? '#ff6b35' : '#555552'
                return (
                  <div key={p.id} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:11, color:'#aaa9a6' }}>{p.nombre}</span>
                      <span style={{ fontSize:10, color:c }}>{pct}%</span>
                    </div>
                    <div style={{ height:3, background:'#1e1e1e', borderRadius:99 }}>
                      <div style={{ height:'100%', width:String(pct)+'%', background:c, borderRadius:99 }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div style={card}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #222220' }}>
              <span style={{ fontWeight:700, fontSize:13, color:'#f0ede8' }}>Pendientes</span>
            </div>
            <div style={{ padding:'10px 16px' }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ display:'flex', gap:8, padding:'7px 0', borderBottom:i < tasks.length - 1 ? '1px solid #222220' : 'none' }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:priorityColor[t.priority], flexShrink:0, marginTop:5 }} />
                  <div onClick={() => toggle(i)} style={{ width:13, height:13, borderRadius:3, border:t.done?'none':'1.5px solid #333330', background:t.done?'#ff2020':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'#000', cursor:'pointer', flexShrink:0, marginTop:2 }}>
                    {t.done ? 'v' : ''}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, color:t.done?'#555552':'#f0ede8', textDecoration:t.done?'line-through':'none' }}>{t.title}</div>
                    <div style={{ fontSize:10, color:'#555552' }}>{t.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"""

# Write all files
os.makedirs('src/app/(admin)', exist_ok=True)
with open('src/app/(admin)/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content1)
print('FILE 1 written:', 'src/app/(admin)/layout.tsx')

with open('src/app/admin/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content2)
print('FILE 2 written:', 'src/app/admin/layout.tsx')

with open('src/app/(admin)/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content3)
print('FILE 3 written:', 'src/app/(admin)/dashboard/page.tsx')

# Verify no duplicates
for path in ['src/app/(admin)/layout.tsx', 'src/app/admin/layout.tsx', 'src/app/(admin)/dashboard/page.tsx']:
    with open(path, encoding='utf-8') as f:
        content = f.read()
    lines = content.split('\n')
    exports = [l for l in lines if 'export default' in l]
    first_line = lines[0]
    print(f"{path.split('/')[-1]}: first_line='{first_line}' | exports={len(exports)}")
