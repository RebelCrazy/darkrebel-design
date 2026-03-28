"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Linea = { concepto: string; cantidad: number; precio_unitario: number };

interface ProyectoOpt {
  id: string;
  nombre: string;
}

interface PropuestaRow {
  id: string;
  proyecto_id: string | null;
  titulo: string;
  moneda: string;
  total: number;
  estado: string;
  items_json?: string;
  notas?: string;
  proyecto_nombre?: string;
  cliente_email?: string;
}

const ESTADOS = ["Borrador", "Enviada", "Aceptada", "Rechazada", "Vencida"];
const MONEDAS = ["MXN", "USD", "EUR"];

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

function parseItems(json?: string): Linea[] {
  if (!json) return [{ concepto: "", cantidad: 1, precio_unitario: 0 }];
  try {
    const x = JSON.parse(json);
    if (!Array.isArray(x) || x.length === 0) return [{ concepto: "", cantidad: 1, precio_unitario: 0 }];
    return x.map((row: Partial<Linea>) => ({
      concepto: String(row.concepto ?? ""),
      cantidad: Math.max(0, Number(row.cantidad) || 0),
      precio_unitario: Math.max(0, Number(row.precio_unitario) || 0),
    }));
  } catch {
    return [{ concepto: "", cantidad: 1, precio_unitario: 0 }];
  }
}

function totalLineas(items: Linea[]): number {
  return items.reduce((s, r) => s + r.cantidad * r.precio_unitario, 0);
}

export default function PropuestasPage() {
  const [rows, setRows] = useState<PropuestaRow[]>([]);
  const [proyectos, setProyectos] = useState<ProyectoOpt[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    proyecto_id: "",
    titulo: "",
    moneda: "MXN",
    estado: "Borrador",
    notas: "",
  });
  const [lineas, setLineas] = useState<Linea[]>([{ concepto: "", cantidad: 1, precio_unitario: 0 }]);

  const totalCalc = useMemo(() => totalLineas(lineas), [lineas]);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([fetch("/api/propuestas").then((r) => r.json()), fetch("/api/proyectos").then((r) => r.json())])
      .then(([pRows, pr]) => {
        setRows(Array.isArray(pRows) ? pRows : []);
        setProyectos(Array.isArray(pr) ? pr : []);
      })
      .catch(() => {
        setRows([]);
        setProyectos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEditId(null);
    setForm({ proyecto_id: proyectos[0]?.id ?? "", titulo: "", moneda: "MXN", estado: "Borrador", notas: "" });
    setLineas([{ concepto: "Diseño / desarrollo web", cantidad: 1, precio_unitario: 0 }]);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.titulo.trim()) {
      alert("Título obligatorio");
      return;
    }
    setSaving(true);
    const items_json = JSON.stringify(lineas.filter((l) => l.concepto.trim()));
    const total = totalLineas(lineas);
    try {
      const payload = {
        proyecto_id: form.proyecto_id || null,
        titulo: form.titulo,
        moneda: form.moneda,
        total,
        estado: form.estado,
        items_json,
        notas: form.notas || null,
      };
      if (editId) {
        await fetch("/api/propuestas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        await fetch("/api/propuestas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar propuesta «${titulo}»?`)) return;
    await fetch("/api/propuestas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const openEdit = (p: PropuestaRow) => {
    setEditId(p.id);
    setForm({
      proyecto_id: p.proyecto_id || "",
      titulo: p.titulo,
      moneda: p.moneda || "MXN",
      estado: p.estado,
      notas: p.notas || "",
    });
    setLineas(parseItems(p.items_json));
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 24, color: "#f0ede8", flex: 1 }}>Propuestas / presupuestos</div>
        <button type="button" onClick={openNew} style={S.btnAccent}>
          + Propuesta
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#555552", marginBottom: 20, maxWidth: 640 }}>
        Cotizaciones con partidas y totales. Usa <strong style={{ color: "#aaa9a6" }}>Cotizaciones</strong> en el menú para plantillas de texto reutilizables.
      </p>

      {showForm && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ background: "#181818", padding: "16px 20px", borderBottom: "1px solid #222220" }}>
            <div style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 15, color: "#f0ede8" }}>{editId ? "Editar" : "Nueva"} propuesta</div>
          </div>
          <div style={{ padding: 20, display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={S.label}>Proyecto (opcional)</label>
                <select style={S.input} value={form.proyecto_id} onChange={(e) => setForm((f) => ({ ...f, proyecto_id: e.target.value }))}>
                  <option value="">— Sin vincular —</option>
                  {proyectos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={S.label}>Título</label>
                <input style={S.input} value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} placeholder="Ej. Sitio corporativo fase 1" />
              </div>
              <div>
                <label style={S.label}>Moneda</label>
                <select style={S.input} value={form.moneda} onChange={(e) => setForm((f) => ({ ...f, moneda: e.target.value }))}>
                  {MONEDAS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={S.label}>Estado</label>
                <select style={S.input} value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}>
                  {ESTADOS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ ...S.label, marginBottom: 0 }}>Partidas</label>
                <button
                  type="button"
                  onClick={() => setLineas((ls) => [...ls, { concepto: "", cantidad: 1, precio_unitario: 0 }])}
                  style={{ ...S.btnGhost, fontSize: 11 }}
                >
                  + Línea
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {lineas.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 80px 100px 36px", gap: 8, alignItems: "center" }}>
                    <input
                      style={S.input}
                      placeholder="Concepto"
                      value={row.concepto}
                      onChange={(e) => setLineas((ls) => ls.map((r, j) => (j === i ? { ...r, concepto: e.target.value } : r)))}
                    />
                    <input
                      type="number"
                      min={0}
                      style={S.input}
                      value={row.cantidad}
                      onChange={(e) =>
                        setLineas((ls) => ls.map((r, j) => (j === i ? { ...r, cantidad: Number(e.target.value) || 0 } : r)))
                      }
                    />
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      style={S.input}
                      value={row.precio_unitario}
                      onChange={(e) =>
                        setLineas((ls) => ls.map((r, j) => (j === i ? { ...r, precio_unitario: Number(e.target.value) || 0 } : r)))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => lineas.length > 1 && setLineas((ls) => ls.filter((_, j) => j !== i))}
                      style={{ ...S.btnGhost, padding: "6px", fontSize: 14 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, textAlign: "right", fontFamily: "DM Mono,monospace", fontSize: 14, color: "#ff2020" }}>
                Total: {totalCalc.toLocaleString(undefined, { minimumFractionDigits: 2 })} {form.moneda}
              </div>
            </div>

            <div>
              <label style={S.label}>Notas internas</label>
              <textarea style={{ ...S.input, minHeight: 80 }} value={form.notas} onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", padding: "0 20px 20px" }}>
            <button type="button" onClick={() => setShowForm(false)} style={S.btnGhost}>
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
          Historial ({rows.length})
        </div>
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Cargando...</div>
          ) : rows.length === 0 ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Crea tu primera propuesta.</div>
          ) : (
            <table style={{ width: "100%", fontSize: 13, color: "#f0ede8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#aaa9a6", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #222220" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Título</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Proyecto</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Cliente</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Total</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #222220" }}>
                    <td style={{ padding: "7px 4px", fontWeight: 600 }}>{r.titulo}</td>
                    <td style={{ padding: "7px 4px", color: "#aaa9a6" }}>{r.proyecto_nombre || "—"}</td>
                    <td style={{ padding: "7px 4px", fontSize: 12 }}>{r.cliente_email || "—"}</td>
                    <td style={{ padding: "7px 4px", fontFamily: "DM Mono,monospace" }}>
                      {Number(r.total).toLocaleString()} {r.moneda}
                    </td>
                    <td style={{ padding: "7px 4px" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(71,232,160,0.12)", color: "#47e8a0" }}>{r.estado}</span>
                    </td>
                    <td style={{ padding: "7px 4px", display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => openEdit(r)} style={{ ...S.btnGhost, fontSize: 11, padding: "4px 10px" }}>
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(r.id, r.titulo)} style={{ ...S.btnAccent, fontSize: 11, padding: "4px 10px" }}>
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
