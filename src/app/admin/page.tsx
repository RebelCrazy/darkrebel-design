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
