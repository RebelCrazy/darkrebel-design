"use client";

import { useCallback, useEffect, useState } from "react";
import { Phone, Mail, Globe, Instagram, Linkedin, MapPin, Building2, BadgeDollarSign, FileText, StickyNote } from "lucide-react";

  id: string;
  nombre: string;
  email: string;
  estatus: string;
  telefono?: string;
  web?: string;
  instagram?: string;
  linkedin?: string;
  ubicacion?: string;
  area_negocio?: string;
  id_fiscal?: string;
  tipo_fiscal?: string;
  notas?: string;
  proyectos_activos?: number;
}

const ESTATUS = ["Lead", "Contactado", "Cliente Activo", "Inactivo"];

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

export default function CrmPage() {
  const [rows, setRows] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    estatus: "Lead",
    telefono: "",
    web: "",
    instagram: "",
    linkedin: "",
    ubicacion: "",
    area_negocio: "",
    id_fiscal: "",
    tipo_fiscal: "",
    notas: ""
  });
  const [search, setSearch] = useState("");
  const [vista, setVista] = useState<"tabla" | "embudo">("tabla");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/crm")
      .then((r) => r.json())
      .then((d) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = rows.filter((c) => `${c.nombre} ${c.email} ${c.estatus}`.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async () => {
    if (!form.nombre.trim() || !form.email.trim()) {
      alert("Nombre y email son obligatorios");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await fetch("/api/crm", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...form }),
        });
      } else {
        await fetch("/api/crm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      setEditId(null);
      setForm({ nombre: "", email: "", estatus: "Lead" });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar cliente «${nombre}»?`)) return;
    await fetch("/api/crm", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 24, color: "#f0ede8", flex: 1, minWidth: 180 }}>CRM de clientes</div>
        <input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...S.input, width: 200 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={() => setVista("tabla")}
            style={{
              ...S.btnGhost,
              background: vista === "tabla" ? "rgba(255,32,32,0.15)" : undefined,
              borderColor: vista === "tabla" ? "#ff2020" : undefined,
            }}
          >
            Tabla
          </button>
          <button
            type="button"
            onClick={() => setVista("embudo")}
            style={{
              ...S.btnGhost,
              background: vista === "embudo" ? "rgba(255,32,32,0.15)" : undefined,
              borderColor: vista === "embudo" ? "#ff2020" : undefined,
            }}
          >
            Embudo
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditId(null);
            setForm({ nombre: "", email: "", estatus: "Lead" });
            setShowForm(true);
          }}
          style={S.btnAccent}
        >
          + Cliente
        </button>
      </div>

      <p style={{ fontSize: 13, color: "#555552", marginBottom: 20, maxWidth: 560 }}>
        Base de contactos enlazada a proyectos. Al crear un proyecto con email, se crea o reutiliza el cliente automáticamente.
      </p>

      {showForm && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ background: "#181818", padding: "16px 20px", borderBottom: "1px solid #222220" }}>
            <div style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 15, color: "#f0ede8" }}>{editId ? "Editar cliente" : "Nuevo cliente"}</div>
          </div>
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={S.label}><Mail size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Nombre</label>
              <input style={S.input} value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
            </div>
            <div>
              <label style={S.label}><Mail size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Email</label>
              <input type="email" style={S.input} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label style={S.label}><Phone size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Teléfono</label>
              <input style={S.input} value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} placeholder="Opcional" />
            </div>
            <div>
              <label style={S.label}><Globe size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Web</label>
              <input style={S.input} value={form.web} onChange={e => setForm(f => ({ ...f, web: e.target.value }))} placeholder="Opcional" />
            </div>
            <div>
              <label style={S.label}><Instagram size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Instagram</label>
              <input style={S.input} value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} placeholder="Opcional" />
            </div>
            <div>
              <label style={S.label}><Linkedin size={14} style={{marginRight:4,verticalAlign:'middle'}}/>LinkedIn</label>
              <input style={S.input} value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="Opcional" />
            </div>
            <div>
              <label style={S.label}><MapPin size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Ubicación</label>
              <input style={S.input} value={form.ubicacion} onChange={e => setForm(f => ({ ...f, ubicacion: e.target.value }))} placeholder="País, ciudad... (opcional)" />
            </div>
            <div>
              <label style={S.label}><Building2 size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Área de negocio</label>
              <select style={S.input} value={form.area_negocio} onChange={e => setForm(f => ({ ...f, area_negocio: e.target.value }))}>
                <option value="">Selecciona (opcional)</option>
                <option value="Estética">Estética</option>
                <option value="Salud">Salud</option>
                <option value="Educación">Educación</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Comercio">Comercio</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label style={S.label}><BadgeDollarSign size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Nº ID Fiscal</label>
              <input style={S.input} value={form.id_fiscal} onChange={e => setForm(f => ({ ...f, id_fiscal: e.target.value }))} placeholder="Opcional" />
            </div>
            <div>
              <label style={S.label}><FileText size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Tipo Fiscal</label>
              <select style={S.input} value={form.tipo_fiscal} onChange={e => setForm(f => ({ ...f, tipo_fiscal: e.target.value }))}>
                <option value="">Selecciona (opcional)</option>
                <option value="Autónomo">Autónomo</option>
                <option value="Empresa">Empresa</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}><StickyNote size={14} style={{marginRight:4,verticalAlign:'middle'}}/>Notas</label>
              <textarea style={{ ...S.input, minHeight: 48 }} value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} placeholder="Notas, comentarios, etc. (opcional)" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={S.label}>Estatus</label>
              <select style={S.input} value={form.estatus} onChange={e => setForm(f => ({ ...f, estatus: e.target.value }))}>
                {ESTATUS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
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
          Clientes ({filtered.length})
        </div>
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Cargando...</div>
          ) : filtered.length === 0 ? (
            <div style={{ color: "#555552", textAlign: "center", fontSize: 13 }}>Sin clientes</div>
          ) : vista === "embudo" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {ESTATUS.map((col) => (
                <div key={col} style={{ background: "#0c0c0c", border: "1px solid #222220", borderRadius: 10, padding: 12, minHeight: 260 }}>
                  <div style={{ fontSize: 10, fontFamily: "DM Mono,monospace", letterSpacing: "0.1em", color: "#555552", marginBottom: 12 }}>{col.toUpperCase()}</div>
                  {filtered
                    .filter((c) => c.estatus === col)
                    .map((c) => (
                      <div
                        key={c.id}
                        style={{
                          marginBottom: 8,
                          padding: 10,
                          borderRadius: 8,
                          background: "#111111",
                          border: "1px solid #2a2a2a",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.nombre}</div>
                        <div style={{ fontSize: 11, color: "#555552", marginBottom: 6 }}>{c.email}</div>
                        <div style={{ fontSize: 10, color: "#47e8a0" }}>{c.proyectos_activos ?? 0} proyectos activos</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                          <button
                            type="button"
                            onClick={() => {
                              setForm({ nombre: c.nombre, email: c.email, estatus: c.estatus });
                              setEditId(c.id);
                              setShowForm(true);
                            }}
                            style={{ ...S.btnGhost, fontSize: 10, padding: "3px 8px" }}
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <table style={{ width: "100%", fontSize: 13, color: "#f0ede8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#aaa9a6", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #222220" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Nombre</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Email</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Estatus</th>
                  <th style={{ textAlign: "left", padding: "6px 4px" }}>Proyectos activos</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #222220" }}>
                    <td style={{ padding: "7px 4px" }}>{c.nombre}</td>
                    <td style={{ padding: "7px 4px" }}>{c.email}</td>
                    <td style={{ padding: "7px 4px" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(79,163,255,0.15)", color: "#4fa3ff" }}>{c.estatus}</span>
                    </td>
                    <td style={{ padding: "7px 4px", fontFamily: "DM Mono,monospace", fontSize: 12 }}>{c.proyectos_activos ?? 0}</td>
                    <td style={{ padding: "7px 4px", display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ nombre: c.nombre, email: c.email, estatus: c.estatus });
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
