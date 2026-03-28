"use client";

import { useCallback, useEffect, useState } from "react";

type PlantillaRow = {
  id: string;
  nombre?: string;
  tipo: string;
  contenido: string;
  created_at?: string;
};

const TIPO_OPTIONS = [
  { value: "brief", label: "Brief / modelo" },
  { value: "contrato", label: "Contrato" },
  { value: "cotizacion", label: "Cotización" },
  { value: "prompt", label: "Prompt / IA" },
  { value: "recurso", label: "Recurso / enlace" },
  { value: "otro", label: "Otro" },
];

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

type Props = {
  heading: string;
  subheading: string;
  /** Si se define, lista y crea solo este tipo (ej. contrato). */
  tipoFilter?: string;
  /** Oculta el selector de tipo y fija `tipoFilter`. */
  lockTipo?: boolean;
};

export default function PlantillasPanel({ heading, subheading, tipoFilter, lockTipo }: Props) {
  const [rows, setRows] = useState<PlantillaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: "", tipo: tipoFilter ?? "brief", contenido: "" });

  const load = useCallback(() => {
    setLoading(true);
    const q = tipoFilter ? `?tipo=${encodeURIComponent(tipoFilter)}` : "";
    fetch(`/api/plantillas${q}`)
      .then((r) => r.json())
      .then((d) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [tipoFilter]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (lockTipo && tipoFilter) setForm((f) => ({ ...f, tipo: tipoFilter }));
  }, [lockTipo, tipoFilter]);

  const openNew = () => {
    setEditId(null);
    setForm({ nombre: "", tipo: lockTipo && tipoFilter ? tipoFilter : "brief", contenido: "" });
    setShowForm(true);
  };

  const openEdit = (p: PlantillaRow) => {
    setEditId(p.id);
    setForm({
      nombre: String((p as PlantillaRow & { nombre?: string }).nombre ?? p.tipo),
      tipo: p.tipo,
      contenido: p.contenido ?? "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.nombre.trim()) {
      alert("El título es obligatorio");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await fetch("/api/plantillas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...form }),
        });
      } else {
        await fetch("/api/plantillas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      setEditId(null);
      setForm({ nombre: "", tipo: tipoFilter ?? "brief", contenido: "" });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar «${nombre}»?`)) return;
    await fetch("/api/plantillas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const labelForTipo = (t: string) => TIPO_OPTIONS.find((o) => o.value === t)?.label ?? t;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", marginBottom: 8 }}>{heading}</div>
          <div style={{ color: "var(--text2)", fontSize: 14, maxWidth: 640 }}>{subheading}</div>
        </div>
        <button type="button" onClick={openNew} style={S.btnAccent}>
          + Nueva plantilla
        </button>
      </div>

      {showForm && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ background: "#181818", padding: "16px 20px", borderBottom: "1px solid #222220" }}>
            <div style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 15, color: "#f0ede8" }}>{editId ? "Editar" : "Nueva"} plantilla</div>
          </div>
          <div style={{ padding: 20, display: "grid", gap: 14 }}>
            <div>
              <label style={S.label}>Título</label>
              <input style={S.input} value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} placeholder="Ej. Brief identidad visual" />
            </div>
            {!lockTipo ? (
              <div>
                <label style={S.label}>Tipo</label>
                <select style={S.input} value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}>
                  {TIPO_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div>
              <label style={S.label}>Contenido (texto enriquecido ligero — Markdown o notas)</label>
              <textarea
                style={{ ...S.input, minHeight: 220, resize: "vertical" as const }}
                value={form.contenido}
                onChange={(e) => setForm((f) => ({ ...f, contenido: e.target.value }))}
                placeholder={"# Encabezado\n\nLista:\n- ítem\n- ítem"}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", padding: "0 20px 20px" }}>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              style={S.btnGhost}
            >
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
          Documentos ({rows.length})
        </div>
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Cargando...</div>
          ) : rows.length === 0 ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Aún no hay plantillas. Crea la primera.</div>
          ) : (
            <table style={{ width: "100%", fontSize: 13, color: "#f0ede8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#aaa9a6", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #222220" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Título</th>
                  {!tipoFilter ? <th style={{ textAlign: "left", padding: "6px 4px" }}>Tipo</th> : null}
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Vista previa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const title = String((p as { nombre?: string }).nombre || p.tipo);
                  const prev = (p.contenido || "").replace(/\s+/g, " ").trim().slice(0, 80);
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid #222220" }}>
                      <td style={{ padding: "7px 4px", fontWeight: 600 }}>{title}</td>
                      {!tipoFilter ? (
                        <td style={{ padding: "7px 4px" }}>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(255,32,32,0.12)", color: "#ff2020" }}>{labelForTipo(p.tipo)}</span>
                        </td>
                      ) : null}
                      <td style={{ padding: "7px 4px", color: "#555552", fontSize: 12 }}>{prev || "—"}</td>
                      <td style={{ padding: "7px 4px", display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => openEdit(p)} style={{ ...S.btnGhost, fontSize: 11, padding: "4px 10px" }}>
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDelete(p.id, title)} style={{ ...S.btnAccent, fontSize: 11, padding: "4px 10px" }}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
