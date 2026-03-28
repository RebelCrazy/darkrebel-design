'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  id: string; uid?: string; nombre: string
  cliente_email?: string; progreso: number
  estado: string; link_figma?: string
  url_produccion?: string | null
  url_staging?: string | null
  stack?: string | null
  hosting?: string | null
  notas_internas?: string | null
}

const estados = ['Planeación','En Desarrollo','Revisión','Finalizado']

const chipColor: Record<string,string> = {
  'Planeación':'#4fa3ff','En Desarrollo':'#ff2020',
  'Revisión':'#ff6b35','Finalizado':'#555552'
}

const S = {
  card: { background:'#111111', border:'1px solid #222220', borderRadius:12, overflow:'hidden' as const },
  label: { fontSize:10, fontFamily:'DM Mono,monospace', color:'#555552', letterSpacing:'0.08em', textTransform:'uppercase' as const, display:'block', marginBottom:5 },
  input: { background:'#181818', border:'1px solid #222220', borderRadius:7, padding:'9px 13px', color:'#f0ede8', fontSize:13, width:'100%', outline:'none', fontFamily:'DM Sans,sans-serif' },
  btnAccent: { background:'#ff2020', color:'#000', fontWeight:700, borderRadius:7, padding:'9px 18px', fontSize:13, border:'none', cursor:'pointer' as const },
  btnGhost: { background:'transparent', color:'#aaa9a6', border:'1px solid #222220', borderRadius:7, padding:'7px 14px', fontSize:12, cursor:'pointer' as const },
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string|null>(null)
  const [form, setForm] = useState({
    nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'',
    url_produccion:'', url_staging:'', stack:'', hosting:'', notas_internas:'',
  })

  const load = () => {
    setLoading(true)
    fetch('/api/proyectos').then(r=>r.json()).then(d=>setProjects(Array.isArray(d)?d:[])).catch(()=>setProjects([])).finally(()=>setLoading(false))
  }
  useEffect(()=>{ load() },[])

  const filtered = projects.filter(p=>(p.nombre+' '+(p.cliente_email||'')+' '+p.estado).toLowerCase().includes(search.toLowerCase()))

  const handleSave = async () => {
    if (!form.nombre.trim()) return alert('El nombre es obligatorio')
    setSaving(true)
    if (editId) {
      await fetch('/api/proyectos', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...form, id:editId}) })
    } else {
      await fetch('/api/proyectos', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
    }
    setSaving(false); setShowForm(false); setEditId(null)
    setForm({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'',
      url_produccion:'', url_staging:'', stack:'', hosting:'', notas_internas:'' })
    load()
  }

  const handleDelete = async (id:string, nombre:string) => {
    if (!confirm(`¿Eliminar el proyecto "${nombre}"? Esta acción no se puede deshacer.`)) return
    await fetch('/api/proyectos', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) })
    load()
  }

  const handleEdit = (p:Project) => {
    setForm({
      nombre:p.nombre, cliente_email:p.cliente_email||'', progreso:p.progreso, estado:p.estado, link_figma:p.link_figma||'',
      url_produccion: p.url_produccion || '', url_staging: p.url_staging || '', stack: p.stack || '',
      hosting: p.hosting || '', notas_internas: p.notas_internas || '',
    })
    setEditId(p.id); setShowForm(true)
  }

  const portalHref = (uid?: string) => {
    if (typeof window === 'undefined' || !uid) return ''
    return `${window.location.origin}/p/${uid}`
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:22, color:'#f0ede8', flex:1 }}>Proyectos</div>
        <input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...S.input, width:200 }} />
        <button onClick={()=>{ setShowForm(!showForm); setEditId(null); setForm({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'',
          url_produccion:'', url_staging:'', stack:'', hosting:'', notas_internas:'' }) }}
          style={S.btnAccent}>
          {showForm ? '✕ Cancelar' : '+ Nuevo proyecto'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20 }}>
        <div style={{ ...S.card, padding:14 }}>
          <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.12em', marginBottom:6 }}>TOTAL</div>
          <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:24, color:'#f0ede8' }}>{projects.length}</div>
        </div>
        <div style={{ ...S.card, padding:14 }}>
          <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.12em', marginBottom:6 }}>EN CURSO</div>
          <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:24, color:'#ff2020' }}>{projects.filter(p=>p.estado!=='Finalizado').length}</div>
        </div>
        <div style={{ ...S.card, padding:14 }}>
          <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.12em', marginBottom:6 }}>FINALIZADOS</div>
          <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:24, color:'#47e8a0' }}>{projects.filter(p=>p.estado==='Finalizado').length}</div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={{ background:'#181818', padding:'16px 20px', borderBottom:'1px solid #222220' }}>
            <div style={{ fontFamily:'Syne,serif', fontWeight:700, fontSize:15, color:'#f0ede8' }}>{editId?'Editar proyecto':'Nuevo proyecto'}</div>
          </div>
          <div style={{ padding:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={S.label}>Nombre</label>
              <input style={S.input} value={form.nombre} onChange={e=>setForm(f=>({...f, nombre:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>Email del cliente</label>
              <input style={S.input} value={form.cliente_email} onChange={e=>setForm(f=>({...f, cliente_email:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>Progreso (%)</label>
              <input type="number" min={0} max={100} style={S.input} value={form.progreso} onChange={e=>setForm(f=>({...f, progreso:Number(e.target.value)}))} />
            </div>
            <div>
              <label style={S.label}>Estado</label>
              <select style={S.input} value={form.estado} onChange={e=>setForm(f=>({...f, estado:e.target.value}))}>
                {estados.map(e=>(<option key={e} value={e}>{e}</option>))}
              </select>
            </div>
            <div style={{ gridColumn:'1/3' }}>
              <label style={S.label}>Link Figma</label>
              <input style={S.input} value={form.link_figma} onChange={e=>setForm(f=>({...f, link_figma:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>URL producción</label>
              <input style={S.input} placeholder="https://..." value={form.url_produccion} onChange={e=>setForm(f=>({...f, url_produccion:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>URL staging / preview</label>
              <input style={S.input} placeholder="https://..." value={form.url_staging} onChange={e=>setForm(f=>({...f, url_staging:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>Stack</label>
              <input style={S.input} placeholder="Next.js, WordPress…" value={form.stack} onChange={e=>setForm(f=>({...f, stack:e.target.value}))} />
            </div>
            <div>
              <label style={S.label}>Hosting / dominio</label>
              <input style={S.input} placeholder="Cloudflare Pages, cPanel…" value={form.hosting} onChange={e=>setForm(f=>({...f, hosting:e.target.value}))} />
            </div>
            <div style={{ gridColumn:'1/3' }}>
              <label style={S.label}>Notas internas</label>
              <textarea style={{ ...S.input, minHeight:72 }} value={form.notas_internas} onChange={e=>setForm(f=>({...f, notas_internas:e.target.value}))} />
            </div>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end', padding:'0 20px 20px' }}>
            <button onClick={()=>{ setShowForm(false); setEditId(null); setForm({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'',
              url_produccion:'', url_staging:'', stack:'', hosting:'', notas_internas:'' }) }} style={S.btnGhost}>Cancelar</button>
            <button onClick={handleSave} disabled={saving} style={S.btnAccent}>{saving ? 'Guardando...' : (editId ? 'Guardar cambios' : 'Crear proyecto')}</button>
          </div>
        </div>
      )}

      {/* Tabla de proyectos */}
      <div style={{ ...S.card }}>
        <div style={{ background:'#181818', padding:'12px 20px', borderBottom:'1px solid #222220', fontWeight:700, fontSize:14, color:'#f0ede8' }}>Lista de proyectos</div>
        <div style={{ padding:20 }}>
          {loading ? (
            <div style={{ color:'#555552', textAlign:'center', fontSize:13 }}>Cargando...</div>
          ) : filtered.length === 0 ? (
            <div style={{ color:'#555552', textAlign:'center', fontSize:13 }}>Sin proyectos</div>
          ) : (
            <table style={{ width:'100%', fontSize:13, color:'#f0ede8', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ color:'#aaa9a6', fontWeight:700, fontSize:11, borderBottom:'1px solid #222220' }}>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Nombre</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Cliente</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Sitio</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Progreso</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Estado</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Figma</th>
                  <th style={{ textAlign:'left', padding:'6px 4px' }}>Portal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p.id} style={{ borderBottom:'1px solid #222220' }}>
                    <td style={{ padding:'7px 4px' }}>{p.nombre}</td>
                    <td style={{ padding:'7px 4px' }}>{p.cliente_email||'—'}</td>
                    <td style={{ padding:'7px 4px', fontSize:11 }}>
                      {p.url_produccion ? <a href={p.url_produccion} target="_blank" rel="noopener noreferrer" style={{ color:'#47e8a0' }}>prod</a> : null}
                      {p.url_produccion && p.url_staging ? ' · ' : null}
                      {p.url_staging ? <a href={p.url_staging} target="_blank" rel="noopener noreferrer" style={{ color:'#4fa3ff' }}>staging</a> : null}
                      {!p.url_produccion && !p.url_staging ? '—' : null}
                    </td>
                    <td style={{ padding:'7px 4px' }}>{p.progreso}%</td>
                    <td style={{ padding:'7px 4px' }}>
                      <span style={{ fontSize:11, padding:'2px 7px', borderRadius:20, background:chipColor[p.estado]+'22', color:chipColor[p.estado] }}>{p.estado}</span>
                    </td>
                    <td style={{ padding:'7px 4px' }}>{p.link_figma ? <a href={p.link_figma} target="_blank" rel="noopener noreferrer" style={{ color:'#4fa3ff', textDecoration:'underline' }}>Figma</a> : '—'}</td>
                    <td style={{ padding:'7px 4px', fontSize:11 }}>
                      {p.uid ? (
                        <button type="button" onClick={()=>navigator.clipboard?.writeText(portalHref(p.uid))} style={{ background:'transparent', border:'1px solid #333330', borderRadius:4, color:'#ff2020', padding:'2px 6px', cursor:'pointer', fontSize:10 }}>Copiar link</button>
                      ) : '—'}
                    </td>
                    <td style={{ padding:'7px 4px', display:'flex', gap:6 }}>
                      <button onClick={()=>handleEdit(p)} style={{ ...S.btnGhost, fontSize:11, padding:'4px 10px' }}>Editar</button>
                      <button onClick={()=>handleDelete(p.id, p.nombre)} style={{ ...S.btnAccent, fontSize:11, padding:'4px 10px' }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
