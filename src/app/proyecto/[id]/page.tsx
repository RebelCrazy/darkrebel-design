import { notFound } from 'next/navigation'
import { obtenerProyectoPorId } from '@/lib/db'

export const runtime = 'edge'

type Props = { params: Promise<{ id: string }> }

export default async function PortalCliente({ params }: Props) {
  const { id } = await params
  const p = await obtenerProyectoPorId(id)
  if (!p) notFound()

  const pct = Number(p.progreso) || 0
  const statusColors: Record<string,string> = {
    'Planeación':'#4fa3ff','En Desarrollo':'#ff2020','Revisión':'#ff6b35','Finalizado':'#47e8a0'
  }
  const sc = statusColors[String(p.estado)] ?? '#aaa9a6'

  return (
    <main style={{ minHeight:'100vh', background:'#080808', color:'#f0ede8', fontFamily:'DM Sans,sans-serif', padding:'0' }}>
      {/* Header */}
      <div style={{ background:'#111111', borderBottom:'1px solid #222220', padding:'18px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, background:'#ff2020', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:16, color:'#000' }}>D</div>
          <span style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:16, color:'#f0ede8' }}>
            Dark<span style={{ color:'#ff2020' }}>Rebel</span>
            <span style={{ fontSize:11, fontWeight:400, color:'#555552', marginLeft:8 }}>· Portal del cliente</span>
          </span>
        </div>
        <span style={{ fontSize:10, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em' }}>
          VISTA PRIVADA DEL PROYECTO
        </span>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'40px 24px' }}>
        {/* Project header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:10, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.15em', marginBottom:10 }}>PROYECTO</div>
          <h1 style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:32, letterSpacing:'-0.03em', marginBottom:8 }}>{String(p.nombre??'')}</h1>
          <div style={{ fontSize:13, color:'#aaa9a6' }}>{String(p.cliente_email ?? p.id)}</div>
        </div>

        {/* Stage indicator */}
        <div style={{ display:'flex', gap:0, marginBottom:28, background:'#111111', borderRadius:8, padding:4, border:'1px solid #222220' }}>
          {['Planeación','En Desarrollo','Revisión','Finalizado'].map(stage=>{
            const isCurrent = p.estado === stage
            const isDone = ['Planeación','En Desarrollo','Revisión','Finalizado'].indexOf(String(p.estado)) > ['Planeación','En Desarrollo','Revisión','Finalizado'].indexOf(stage)
            return (
              <div key={stage} style={{ flex:1, padding:'8px 10px', borderRadius:5, textAlign:'center', fontSize:11, fontWeight:500, background:isCurrent?'#181818':'transparent', color:isCurrent?'#ff2020':isDone?'#47e8a0':'#555552', transition:'all 0.2s' }}>
                {isDone?'✓ ':''}{stage}
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:28 }}>
          <div style={{ background:'#111111', border:'1px solid #222220', borderRadius:10, padding:16 }}>
            <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em', marginBottom:8 }}>ESTADO</div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:20, background:sc+'22', color:sc, fontSize:12, fontFamily:'DM Mono,monospace' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:sc, display:'inline-block' }}/>
              {String(p.estado??'')}
            </div>
          </div>
          <div style={{ background:'#111111', border:'1px solid #222220', borderRadius:10, padding:16 }}>
            <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em', marginBottom:8 }}>PROGRESO</div>
            <div style={{ fontFamily:'Syne,serif', fontWeight:800, fontSize:26, color:'#ff2020' }}>{pct}%</div>
          </div>
          <div style={{ background:'#111111', border:'1px solid #222220', borderRadius:10, padding:16 }}>
            <div style={{ fontSize:9, color:'#555552', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em', marginBottom:8 }}>DISEÑO</div>
            {p.link_figma ? (
              <a href={String(p.link_figma)} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:'#ff2020', textDecoration:'none', fontFamily:'DM Mono,monospace' }}>Ver en Figma ↗</a>
            ) : <div style={{ fontSize:11, color:'#555552' }}>Sin enlace aún</div>}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background:'#111111', border:'1px solid #222220', borderRadius:10, padding:20, marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:11, color:'#aaa9a6' }}>Avance del proyecto</span>
            <span style={{ fontSize:11, color:'#ff2020', fontFamily:'DM Mono,monospace', fontWeight:700 }}>{pct}%</span>
          </div>
          <div style={{ height:8, background:'#1e1e1e', borderRadius:99, overflow:'hidden' }}>
            <div style={{ height:'100%', width:pct+'%', background:'linear-gradient(90deg,#ff2020,#ff4040)', borderRadius:99, transition:'width 0.5s ease' }}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize:11, color:'#555552', textAlign:'center', marginTop:32 }}>
          Actualizado por <span style={{ color:'#ff2020' }}>Dark Rebel Studio</span> · darkrebel.store
        </div>
      </div>
    </main>
  )
}
