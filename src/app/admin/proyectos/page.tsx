
'use client'
import { useEffect, useState } from 'react';

// Tipos
type ProjectStatus = 'activo' | 'en_proceso' | 'en_espera' | 'entregado' | 'prospecto';

interface Project {
  id: string;
  nombre: string;
  cliente: string;
  email?: string;
  tipo: string;
  estado: ProjectStatus;
  monto: number;
  progreso: number;
  fechaInicio?: string;
  fechaEntrega?: string;
  responsable?: string;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  activo:     { label: 'Activo',     color: 'var(--green)' },
  en_proceso: { label: 'En proceso', color: 'var(--blue)' },
  en_espera:  { label: 'En espera',  color: 'var(--orange)' },
  entregado:  { label: 'Entregado',  color: 'var(--text3)' },
  prospecto:  { label: 'Prospecto',  color: 'var(--purple)' },
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);

  // Fetch proyectos
  useEffect(() => {
    setLoading(true);
    fetch('/api/proyectos')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  // Stats
  const total = projects.length;
  const enProceso = projects.filter(p => p.estado === 'en_proceso' || p.estado === 'activo').length;
  const entregadosEsteMes = projects.filter(p => p.estado === 'entregado').length; // Mejorar con fechaEntrega
  const ingresosTotales = projects.reduce((sum, p) => sum + (p.monto || 0), 0);

  // Filtrado
  const filtered = projects.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.cliente.toLowerCase().includes(search.toLowerCase())
  );

  // Guardar proyecto (nuevo o edición)
  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const method = editProject ? 'PUT' : 'POST';
    const url = editProject ? '/api/proyectos' : '/api/proyectos';
    const body = editProject ? { ...form, id: editProject.id } : form;
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setShowModal(false);
      setEditProject(null);
      setForm({});
      // Refrescar lista
      setLoading(true);
      fetch('/api/proyectos')
        .then(res => res.json())
        .then(data => {
          setProjects(Array.isArray(data) ? data : []);
          setLoading(false);
        });
    } catch {
      setSaving(false);
    }
  };

  // Eliminar proyecto
  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    await fetch('/api/proyectos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setProjects(projects.filter(p => p.id !== id));
  };

  // Modal para nuevo/editar
  const openModal = (project?: Project) => {
    setEditProject(project || null);
    setForm(project ? { ...project } : {});
    setShowModal(true);
  };

  // Progreso bar color
  function getProgressColor(p: number) {
    if (p > 70) return 'var(--accent)';
    if (p > 30) return 'var(--blue)';
    return 'var(--orange)';
  }

  return (
    <div className="w-full font-dm-sans p-6">
      {/* HEADER */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20 }}>Proyectos</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: 180 }}
            placeholder="Buscar proyecto o cliente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }}>Filtrar</button>
          <button style={{ background: 'var(--accent)', color: '#000', fontWeight: 700, padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }} onClick={() => openModal()}>+ Nuevo proyecto</button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total proyectos</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, margin: '10px 0 8px' }}>{total}</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text2)' }}>Registrados</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>En proceso</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, margin: '10px 0 8px' }}>{enProceso}</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text2)' }}>Activos o en proceso</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Entregados</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, margin: '10px 0 8px' }}>{entregadosEsteMes}</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text2)' }}>Este mes</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ingresos totales</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, margin: '10px 0 8px', color: 'var(--accent)' }}>${ingresosTotales.toLocaleString('es-MX')}</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text2)' }}>MXN</div>
        </div>
      </div>

      {/* TABLA DE PROYECTOS */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Cliente</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Proyecto</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Tipo</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Estado</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Progreso</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Monto</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Entrega</th>
              <th style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(3)].map((_,i) => (
                <tr key={i}>
                  <td colSpan={8} style={{ padding: '32px 0', textAlign: 'center' }}>
                    <div style={{ height: 16, background: 'var(--surface2)', borderRadius: 8, margin: '0 auto 8px', width: '50%' }}></div>
                    <div style={{ height: 16, background: 'var(--surface2)', borderRadius: 8, width: '33%', margin: '0 auto' }}></div>
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>📁</div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Sin proyectos aún</div>
                  <div style={{ color: 'var(--text2)', marginBottom: 16 }}>Crea tu primer proyecto para comenzar</div>
                  <button style={{ background: 'var(--accent)', color: '#000', fontWeight: 700, padding: '10px 22px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 14, cursor: 'pointer' }} onClick={() => openModal()}>+ Nuevo proyecto</button>
                </td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border)', fontSize: 13, background: 'transparent', transition: 'background 0.15s' }} onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.01)')} onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface2)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 700, fontSize: 13 }}>{getInitials(p.cliente)}</div>
                      <div>
                        <div style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 13, color: 'var(--text)' }}>{p.cliente}</div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text2)' }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'DM Sans', fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{p.nombre}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'DM Sans', fontSize: 13, color: 'var(--text2)' }}>{p.tipo}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '3px 9px', borderRadius: 20, fontFamily: 'DM Mono', fontSize: 11, background: statusConfig[p.estado].color + '22', color: statusConfig[p.estado].color }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusConfig[p.estado].color, display: 'inline-block' }}></span>
                      {statusConfig[p.estado].label}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontFamily: 'DM Mono', fontSize: 12, color: 'var(--accent)', marginBottom: 4 }}>{p.progreso}%</div>
                    <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 99, width: '100%' }}>
                      <div style={{ height: 4, borderRadius: 99, width: `${p.progreso}%`, background: getProgressColor(p.progreso) }}></div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'DM Mono', fontSize: 13, color: 'var(--accent)' }}>${p.monto?.toLocaleString('es-MX')}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'DM Mono', fontSize: 12, color: 'var(--text2)' }}>{p.fechaEntrega || '-'}</td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }} onClick={() => window.location.href = `/proyecto/${p.id}`}>👁 Ver</button>
                    <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }} onClick={() => openModal(p)}>✏ Editar</button>
                    <button style={{ background: 'transparent', border: '1px solid var(--red)', color: 'var(--red)', borderRadius: 6, padding: '7px 14px', fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }} onClick={() => handleDelete(p.id)}>🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO/EDITAR */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, backdropFilter: 'blur(2px)' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, width: '100%', maxWidth: 520, overflow: 'hidden' }}>
            <form onSubmit={handleSave}>
              <div style={{ background: 'var(--surface2)', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16 }}>{editProject ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{editProject ? 'Edita los datos del proyecto.' : 'Completa los datos para crear un nuevo proyecto.'}</div>
              </div>
              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ gridColumn: '1 / 3' }}>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Nombre del proyecto</label>
                  <input type="text" required style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.nombre || ''} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Cliente</label>
                  <input type="text" required style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.cliente || ''} onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Email del cliente</label>
                  <input type="email" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Tipo de proyecto</label>
                  <select style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.tipo || ''} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} required>
                    <option value="">Selecciona tipo</option>
                    <option value="Landing page">Landing page</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Branding">Branding</option>
                    <option value="Sitio corporativo">Sitio corporativo</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Estado</label>
                  <select style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.estado || ''} onChange={e => setForm(f => ({ ...f, estado: e.target.value as ProjectStatus }))} required>
                    <option value="">Selecciona estado</option>
                    <option value="activo">Activo</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="en_espera">En espera</option>
                    <option value="prospecto">Prospecto</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Monto (MXN)</label>
                  <input type="number" min={0} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.monto || ''} onChange={e => setForm(f => ({ ...f, monto: Number(e.target.value) }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Progreso (%)</label>
                  <input type="number" min={0} max={100} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.progreso || 0} onChange={e => setForm(f => ({ ...f, progreso: Number(e.target.value) }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Fecha de entrega</label>
                  <input type="date" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.fechaEntrega || ''} onChange={e => setForm(f => ({ ...f, fechaEntrega: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Responsable</label>
                  <input type="text" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: '100%' }} value={form.responsable || ''} onChange={e => setForm(f => ({ ...f, responsable: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', background: 'var(--surface2)', borderTop: '1px solid var(--border)', borderRadius: '0 0 12px 12px', padding: '16px 24px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ background: 'var(--accent)', color: '#000', fontWeight: 700, padding: '7px 14px', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 13, cursor: 'pointer' }} disabled={saving}>{saving ? 'Guardando...' : 'Guardar proyecto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
