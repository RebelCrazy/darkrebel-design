"use client";
export const runtime = "edge";
export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";

interface Colaborador {
  id: string;
  nombre: string;
  email: string;
}

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

export default function ColaboradoresPage() {
  const [rows, setRows] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: "", email: "" });

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/colaboradores")
      .then((r) => r.json())
      .then((d) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!form.nombre.trim() || !form.email.trim()) {
      alert("Nombre y email obligatorios");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await fetch("/api/colaboradores", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...form }),
        });
      } else {
        await fetch("/api/colaboradores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      setEditId(null);
      setForm({ nombre: "", email: "" });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar a «${nombre}»? Las tareas quedarán sin asignar.`)) return;
    await fetch("/api/colaboradores", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 24, color: "#f0ede8", flex: 1 }}>Colaboradores</div>
        <button
          type="button"
          onClick={() => {
            setEditId(null);
            setForm({ nombre: "", email: "" });
            setShowForm(true);
          }}
          style={S.btnAccent}
        >
          + Persona
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#555552", marginBottom: 20, maxWidth: 560 }}>
        Diseñadores, redactores o devs que ayudan en tus proyectos web. Asígnalos en Tareas.
      </p>

      {showForm && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ background: "#181818", padding: "16px 20px", borderBottom: "1px solid #222220" }}>
            <div style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 15, color: "#f0ede8" }}>{editId ? "Editar" : "Nuevo"} colaborador</div>
          </div>
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={S.label}>Nombre</label>
              <input style={S.input} value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
            </div>
            <div>
              <label style={S.label}>Email</label>
              <input type="email" style={S.input} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
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
          Equipo ({rows.length})
        </div>
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Cargando...</div>
          ) : rows.length === 0 ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Añade colaboradores para asignar tareas.</div>
          ) : (
            <table style={{ width: "100%", fontSize: 13, color: "#f0ede8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#aaa9a6", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #222220" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Nombre</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #222220" }}>
                    <td style={{ padding: "7px 4px" }}>{c.nombre}</td>
                    <td style={{ padding: "7px 4px" }}>{c.email}</td>
                    <td style={{ padding: "7px 4px", display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ nombre: c.nombre, email: c.email });
                          setEditId(c.id);
                          setShowForm(true);
                        }}
                        style={{ ...S.btnGhost, fontSize: 11, padding: "4px 10px" }}
                      >
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(c.id, c.nombre)} style={{ ...S.btnAccent, fontSize: 11, padding: "4px 10px" }}>
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
