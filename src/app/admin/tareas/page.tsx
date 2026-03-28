"use client";

import { useCallback, useEffect, useState } from "react";

interface Proyecto {
  id: string;
  nombre: string;
  uid?: string;
}

interface Colab {
  id: string;
  nombre: string;
}

interface Tarea {
  id: string;
  proyecto_id: string;
  titulo: string;
  descripcion?: string;
  estado: string;
  fecha_entrega?: string;
  visible_cliente?: number | boolean;
  proyecto_nombre?: string;
  colaborador_id?: string | null;
  colaborador_nombre?: string | null;
}

const ESTADOS = ["Pendiente", "En Progreso", "Completada"];

const S = {
  card: { background: "#111111", border: "1px solid #222220", borderRadius: 12, overflow: "hidden" as const },
  label: {
    fontSize: 10,
    fontFamily: "DM Mono,monospace",
    color: "#555552",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 5,
  },
  input: {
    background: "#181818",
    border: "1px solid #222220",
    borderRadius: 7,
    padding: "9px 13px",
    color: "#f0ede8",
    fontSize: 13,
    width: "100%",
    outline: "none",
    fontFamily: "DM Sans,sans-serif",
  },
  btnAccent: { background: "#ff2020", color: "#000", fontWeight: 700, borderRadius: 7, padding: "9px 18px", fontSize: 13, border: "none", cursor: "pointer" as const },
  btnGhost: { background: "transparent", color: "#aaa9a6", border: "1px solid #222220", borderRadius: 7, padding: "7px 14px", fontSize: 12, cursor: "pointer" as const },
};

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [colaboradores, setColaboradores] = useState<Colab[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterProyecto, setFilterProyecto] = useState("");
  const [form, setForm] = useState({
    proyecto_id: "",
    colaborador_id: "",
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    fecha_entrega: "",
    visible_cliente: true,
  });

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/tareas").then((r) => r.json()),
      fetch("/api/proyectos").then((r) => r.json()),
      fetch("/api/colaboradores").then((r) => r.json()),
    ])
      .then(([t, p, c]) => {
        setTareas(Array.isArray(t) ? t : []);
        setProyectos(Array.isArray(p) ? p : []);
        setColaboradores(Array.isArray(c) ? c : []);
      })
      .catch(() => {
        setTareas([]);
        setProyectos([]);
        setColaboradores([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = filterProyecto ? tareas.filter((x) => x.proyecto_id === filterProyecto) : tareas;

  const handleSave = async () => {
    if (!form.proyecto_id || !form.titulo.trim()) {
      alert("Proyecto y título son obligatorios");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        colaborador_id: form.colaborador_id || null,
        visible_cliente: form.visible_cliente,
      };
      if (editId) {
        await fetch("/api/tareas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        await fetch("/api/tareas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowForm(false);
      setEditId(null);
      setForm({
        proyecto_id: filterProyecto || "",
        colaborador_id: "",
        titulo: "",
        descripcion: "",
        estado: "Pendiente",
        fecha_entrega: "",
        visible_cliente: true,
      });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar tarea «${titulo}»?`)) return;
    await fetch("/api/tareas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const openNew = () => {
    setEditId(null);
    setForm({
      proyecto_id: filterProyecto || (proyectos[0]?.id ?? ""),
      colaborador_id: "",
      titulo: "",
      descripcion: "",
      estado: "Pendiente",
      fecha_entrega: "",
      visible_cliente: true,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 24, color: "#f0ede8", flex: 1, minWidth: 180 }}>Tareas por proyecto</div>
        <select style={{ ...S.input, width: "auto", minWidth: 200 }} value={filterProyecto} onChange={(e) => setFilterProyecto(e.target.value)}>
          <option value="">Todos los proyectos</option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
        <button type="button" onClick={openNew} style={S.btnAccent}>
          + Tarea
        </button>
      </div>

      <p style={{ fontSize: 13, color: "#555552", marginBottom: 20, maxWidth: 560 }}>
        Misma idea que una base «Tareas» enlazada a «Proyectos» en Notion. Las marcadas como visibles aparecen en el portal del cliente cuando corresponda.
      </p>

      {showForm && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ background: "#181818", padding: "16px 20px", borderBottom: "1px solid #222220" }}>
            <div style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 15, color: "#f0ede8" }}>{editId ? "Editar tarea" : "Nueva tarea"}</div>
          </div>
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}>Proyecto</label>
              <select style={S.input} value={form.proyecto_id} onChange={(e) => setForm((f) => ({ ...f, proyecto_id: e.target.value }))}>
                <option value="">— Elegir —</option>
                {proyectos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}>Asignar a</label>
              <select style={S.input} value={form.colaborador_id} onChange={(e) => setForm((f) => ({ ...f, colaborador_id: e.target.value }))}>
                <option value="">— Nadie —</option>
                {colaboradores.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}>Título</label>
              <input style={S.input} value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}>Descripción</label>
              <textarea style={{ ...S.input, minHeight: 90, resize: "vertical" as const }} value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} />
            </div>
            <div>
              <label style={S.label}>Estado</label>
              <select style={S.input} value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={S.label}>Fecha entrega</label>
              <input type="date" style={S.input} value={form.fecha_entrega} onChange={(e) => setForm((f) => ({ ...f, fecha_entrega: e.target.value }))} />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10 }}>
              <input
                id="vis"
                type="checkbox"
                checked={form.visible_cliente}
                onChange={(e) => setForm((f) => ({ ...f, visible_cliente: e.target.checked }))}
                style={{ width: "auto" }}
              />
              <label htmlFor="vis" style={{ fontSize: 13, color: "#aaa9a6", cursor: "pointer" }}>
                Visible para el cliente (portal /p/…)
              </label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", padding: "0 20px 20px" }}>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={S.btnGhost}>
              Cancelar
            </button>
            <button type="button" onClick={handleSave} disabled={saving} style={S.btnAccent}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}

      <div style={S.card}>
        <div style={{ background: "#181818", padding: "12px 20px", borderBottom: "1px solid #222220", fontWeight: 700, fontSize: 14, color: "#f0ede8" }}>
          Lista ({visible.length})
        </div>
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Cargando...</div>
          ) : visible.length === 0 ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Sin tareas</div>
          ) : (
            <table style={{ width: "100%", fontSize: 13, color: "#f0ede8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#aaa9a6", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #222220" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Título</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Proyecto</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Asignado</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Estado</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Entrega</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>¿Visible?</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #222220" }}>
                    <td style={{ padding: "7px 4px" }}>{t.titulo}</td>
                    <td style={{ padding: "7px 4px", color: "#aaa9a6" }}>{t.proyecto_nombre ?? "—"}</td>
                    <td style={{ padding: "7px 4px", fontSize: 12 }}>{t.colaborador_nombre ?? "—"}</td>
                    <td style={{ padding: "7px 4px" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(255,32,32,0.12)", color: "#ff2020" }}>{t.estado}</span>
                    </td>
                    <td style={{ padding: "7px 4px", fontFamily: "DM Mono,monospace", fontSize: 12 }}>{t.fecha_entrega ?? "—"}</td>
                    <td style={{ padding: "7px 4px", fontSize: 12 }}>{t.visible_cliente === 0 || t.visible_cliente === false ? "No" : "Sí"}</td>
                    <td style={{ padding: "7px 4px", display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditId(t.id);
                          setForm({
                            proyecto_id: t.proyecto_id,
                            colaborador_id: t.colaborador_id ?? "",
                            titulo: t.titulo,
                            descripcion: t.descripcion ?? "",
                            estado: t.estado,
                            fecha_entrega: t.fecha_entrega ?? "",
                            visible_cliente: t.visible_cliente !== 0 && t.visible_cliente !== false,
                          });
                          setShowForm(true);
                        }}
                        style={{ ...S.btnGhost, fontSize: 11, padding: "4px 10px" }}
                      >
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(t.id, t.titulo)} style={{ ...S.btnAccent, fontSize: 11, padding: "4px 10px" }}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
