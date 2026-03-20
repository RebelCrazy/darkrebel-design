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
