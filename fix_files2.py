import os

# ── FILE 1: src/app/admin/page.tsx ──────────────────────────────
content1 = """\
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError('')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/login', { method:'POST', body:formData })
    if (res.ok || res.redirected) {
      router.push('/dashboard')
    } else {
      setError('Credenciales incorrectas')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Sans,sans-serif' }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <div style={{ width:40, height:40, background:'#ff2020', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:22, color:'#000' }}>D</div>
            <span style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:22, color:'#f0ede8' }}>
              Dark<span style={{ color:'#ff2020' }}>Rebel</span>
            </span>
          </div>
          <div style={{ fontSize:11, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em' }}>SISTEMA DE GESTIÓN</div>
        </div>

        <form onSubmit={handleLogin} style={{ background:'#111111', border:'1px solid #222220', borderRadius:14, padding:32 }}>
          <div style={{ fontSize:18, fontFamily:'Syne,serif', fontWeight:700, color:'#f0ede8', marginBottom:4 }}>Acceder al panel</div>
          <div style={{ fontSize:12, color:'#555552', marginBottom:24 }}>Ingresa tus credenciales de administrador</div>

          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:10, fontFamily:'DM Mono,monospace', color:'#555552', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Usuario</label>
            <input name="username" type="text" required placeholder="admin" style={{ width:'100%', background:'#181818', border:'1px solid #222220', borderRadius:7, padding:'10px 14px', color:'#f0ede8', fontSize:13, outline:'none', fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' }} />
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:10, fontFamily:'DM Mono,monospace', color:'#555552', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Contraseña</label>
            <input name="password" type="password" required placeholder="••••••••" style={{ width:'100%', background:'#181818', border:'1px solid #222220', borderRadius:7, padding:'10px 14px', color:'#f0ede8', fontSize:13, outline:'none', fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' }} />
          </div>

          {error && <div style={{ fontSize:12, color:'#ff3c3c', marginBottom:14, padding:'8px 12px', background:'rgba(255,60,60,0.08)', borderRadius:6, border:'1px solid rgba(255,60,60,0.2)' }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ width:'100%', background:'#ff2020', color:'#000', fontWeight:700, border:'none', borderRadius:8, padding:'12px', fontSize:14, cursor:'pointer', fontFamily:'DM Sans,sans-serif', letterSpacing:'0.02em' }}>
            {loading ? 'Entrando...' : 'Entrar al panel →'}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:20, fontSize:11, color:'#555552' }}>
          darkrebel.store
        </div>
      </div>
    </div>
  )
}
"""

# ── FILE 2: src/app/admin/proyectos/page.tsx ──────────────────────────────
content2 = """\
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  id: string; uid?: string; nombre: string
  cliente_email?: string; progreso: number
  estado: string; link_figma?: string
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
  const [form, setForm] = useState({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'' })

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
    setForm({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'' })
    load()
  }

  const handleDelete = async (id:string, nombre:string) => {
    if (!confirm(`¿Eliminar el proyecto "${nombre}"? Esta acción no se puede deshacer.`)) return
    await fetch('/api/proyectos', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) })
    load()
  }

  const handleEdit = (p:Project) => {
    setForm({ nombre:p.nombre, cliente_email:p.cliente_email||'', progreso:p.progreso, estado:p.estado, link_figma:p.link_figma||'' })
    setEditId(p.id); setShowForm(true)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:22, color:'#f0ede8', flex:1 }}>Proyectos</div>
        <input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...S.input, width:200 }} />
        <button onClick={()=>{ setShowForm(!showForm); setEditId(null); setForm({ nombre:'', cliente_email:'', progreso:0, estado:'Planeación', link_figma:'' }) }}
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
          <div style={{ padding:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>"""

# Write both files
with open('src/app/admin/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content1)
print('FILE 1 written:', 'src/app/admin/page.tsx')

with open('src/app/admin/proyectos/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content2)
print('FILE 2 written:', 'src/app/admin/proyectos/page.tsx')

# Verify no duplicates and correct first line
for path in ['src/app/admin/page.tsx', 'src/app/admin/proyectos/page.tsx']:
    with open(path, encoding='utf-8') as f:
        content = f.read()
    lines = content.split('\n')
    exports = [l for l in lines if 'export default' in l]
    first_line = lines[0]
    print(f"{path.split('/')[-1]}: first_line='{first_line}' | exports={len(exports)}")
