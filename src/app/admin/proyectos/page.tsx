
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="font-syne font-bold text-[20px]">Proyectos</h1>
        <div className="flex gap-2 items-center">
          <input
            className="bg-surface2 border border-border rounded-lg h-9 px-3 text-sm outline-none focus:border-accent"
            placeholder="Buscar proyecto o cliente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn-ghost px-3 py-2 rounded-lg text-sm">Filtrar</button>
          <button className="btn-accent px-3 py-2 rounded-lg text-sm font-bold" onClick={() => openModal()}>+ Nuevo proyecto</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-dm-mono text-xs text-text3 uppercase tracking-wider">Total proyectos</p>
          <div className="font-syne font-bold text-3xl mt-2 mb-3">{total}</div>
          <p className="font-dm-sans text-xs text-text2">Registrados</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-dm-mono text-xs text-text3 uppercase tracking-wider">En proceso</p>
          <div className="font-syne font-bold text-3xl mt-2 mb-3">{enProceso}</div>
          <p className="font-dm-sans text-xs text-text2">Activos o en proceso</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-dm-mono text-xs text-text3 uppercase tracking-wider">Entregados</p>
          <div className="font-syne font-bold text-3xl mt-2 mb-3">{entregadosEsteMes}</div>
          <p className="font-dm-sans text-xs text-text2">Este mes</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-dm-mono text-xs text-text3 uppercase tracking-wider">Ingresos totales</p>
          <div className="font-syne font-bold text-3xl mt-2 mb-3" style={{ color: 'var(--accent)' }}>
            ${ingresosTotales.toLocaleString('es-MX')}
          </div>
          <p className="font-dm-sans text-xs text-text2">MXN</p>
        </div>
      </div>

      {/* TABLA DE PROYECTOS */}
      <div className="bg-surface border border-border rounded-xl p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Cliente</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Proyecto</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Tipo</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Estado</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Progreso</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Monto</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Entrega</th>
              <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(3)].map((_,i) => (
                <tr key={i}>
                  <td colSpan={8} className="py-8 text-center">
                    <div className="animate-pulse h-4 bg-surface2 rounded mb-2 w-1/2 mx-auto"></div>
                    <div className="animate-pulse h-4 bg-surface2 rounded w-1/3 mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="text-5xl mb-2">📁</div>
                  <div className="font-syne font-bold text-lg mb-1">Sin proyectos aún</div>
                  <div className="text-text2 mb-4">Crea tu primer proyecto para comenzar</div>
                  <button className="btn-accent px-4 py-2 rounded-lg text-sm font-bold" onClick={() => openModal()}>+ Nuevo proyecto</button>
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-surface2 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-syne font-bold text-xs" style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}>{getInitials(p.cliente)}</div>
                      <div>
                        <div className="font-dm-sans font-bold text-sm text-text">{p.cliente}</div>
                        <div className="font-dm-sans text-xs text-text3">{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-dm-sans text-sm text-text">{p.nombre}</td>
                  <td className="p-3 font-dm-sans text-xs text-text2">{p.tipo}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-dm-mono text-xs font-medium" style={{ background: statusConfig[p.estado].color + '22', color: statusConfig[p.estado].color, borderRadius: 20 }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: statusConfig[p.estado].color }}></span>
                      {statusConfig[p.estado].label}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-dm-mono text-xs text-text2 mb-1">{p.progreso}%</div>
                    <div className="w-full bg-surface2 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${p.progreso}%`, backgroundColor: getProgressColor(p.progreso) }}></div>
                    </div>
                  </td>
                  <td className="p-3 font-dm-mono text-sm" style={{ color: 'var(--accent)' }}>${p.monto?.toLocaleString('es-MX')}</td>
                  <td className="p-3 font-dm-mono text-xs text-text2">{p.fechaEntrega || '-'}</td>
                  <td className="p-3 flex gap-2">
                    <button className="btn-ghost px-2 py-1 rounded-lg text-xs" onClick={() => window.location.href = `/proyecto/${p.id}`}>👁 Ver</button>
                    <button className="btn-ghost px-2 py-1 rounded-lg text-xs" onClick={() => openModal(p)}>✏ Editar</button>
                    <button className="btn-ghost px-2 py-1 rounded-lg text-xs text-red-500" onClick={() => handleDelete(p.id)}>🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO/EDITAR */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl w-full max-w-lg">
            <form onSubmit={handleSave}>
              <div className="p-6 border-b border-border">
                <h2 className="font-syne font-bold text-lg">{editProject ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Nombre del proyecto</label>
                  <input type="text" required className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.nombre || ''} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Cliente</label>
                  <input type="text" required className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.cliente || ''} onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Email del cliente</label>
                  <input type="email" className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Tipo de proyecto</label>
                  <select className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.tipo || ''} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} required>
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
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Estado</label>
                  <select className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.estado || ''} onChange={e => setForm(f => ({ ...f, estado: e.target.value as ProjectStatus }))} required>
                    <option value="">Selecciona estado</option>
                    <option value="activo">Activo</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="en_espera">En espera</option>
                    <option value="prospecto">Prospecto</option>
                  </select>
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Monto (MXN)</label>
                  <input type="number" min={0} className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.monto || ''} onChange={e => setForm(f => ({ ...f, monto: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Progreso (%)</label>
                  <input type="number" min={0} max={100} className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.progreso || 0} onChange={e => setForm(f => ({ ...f, progreso: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Fecha de entrega</label>
                  <input type="date" className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.fechaEntrega || ''} onChange={e => setForm(f => ({ ...f, fechaEntrega: e.target.value }))} />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Responsable</label>
                  <input type="text" className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" value={form.responsable || ''} onChange={e => setForm(f => ({ ...f, responsable: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3 justify-end p-4 bg-surface2 border-t border-border rounded-b-xl">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost px-4 py-2 rounded-lg text-sm">Cancelar</button>
                <button type="submit" className="btn-accent px-4 py-2 rounded-lg text-sm" disabled={saving}>{saving ? 'Guardando...' : 'Guardar proyecto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
