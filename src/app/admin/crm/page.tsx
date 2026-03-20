'use client';
import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import Card from "@/components/admin/Card";
import StatusChip from "@/components/admin/StatusChip";

type ClientStatus = "Lead" | "Contactado" | "Cliente Activo" | "Prospecto" | "En proceso" | "En espera" | "Entregado";

const statusMap: Record<string, ClientStatus> = {
  "Lead": "Prospecto",
  "Contactado": "En espera",
  "Cliente Activo": "Activo",
};

export default function CRMPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", estatus: "Lead" });

  const fetchClientes = async () => {
    try {
      const res = await fetch("/api/crm");
      if (!res.ok) throw new Error("Error al cargar clientes");
      const data = await res.json();
      setClientes(Array.isArray(data) ? data : []);
      setFilteredClientes(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      setClientes([]);
      setError(e.message || "Error desconocido");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    const results = clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClientes(results);
  }, [searchTerm, clientes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowModal(false);
      setForm({ nombre: "", email: "", estatus: "Lead" });
      fetchClientes();
    } catch (e: any) {
      setError(e.message || "Error al guardar cliente");
    }
  };

  return (
    <div className="font-dm-sans">
      {error && <div className="bg-red/20 border border-red text-red p-3 rounded-lg mb-4">{error}</div>}
      
      <Card
        title="Base de Datos de Clientes"
        cta={
          <button onClick={() => setShowModal(true)} className="btn-accent flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-black font-dm-sans text-sm font-semibold hover:bg-accent2 transition-colors">
            <Plus size={16} />
            <span>Nuevo Cliente</span>
          </button>
        }
      >
        <div className="mb-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg h-10 pl-10 pr-4 text-sm focus:ring-1 focus:ring-accent focus:border-accent outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Nombre</th>
                <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Email</th>
                <th className="p-3 font-dm-mono text-xs text-text3 uppercase">Estatus</th>
                <th className="p-3 font-dm-mono text-xs text-text3 uppercase text-center">Proyectos</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length > 0 ? filteredClientes.map((c) => (
                <tr key={c.id} className="border-b border-border hover:bg-surface2 transition-colors">
                  <td className="p-3 font-medium text-text">{c.nombre}</td>
                  <td className="p-3 text-text2">{c.email}</td>
                  <td className="p-3">
                    <StatusChip status={statusMap[c.estatus] || 'Prospecto'} />
                  </td>
                  <td className="p-3 text-center font-dm-mono text-accent font-medium">{c.proyectos_activos || 0}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="text-center text-text3 py-8">No se encontraron clientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-border">
                 <h2 className="font-syne font-bold text-lg">Nuevo Cliente</h2>
                 <p className="text-text2 text-sm mt-1">Añade un nuevo lead o cliente a tu base de datos.</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Nombre</label>
                  <input type="text" placeholder="John Doe" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" required />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Email</label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent" required />
                </div>
                <div>
                  <label className="font-dm-mono text-xs text-text3 mb-1 block">Estatus</calle>
                  <select value={form.estatus} onChange={e => setForm(f => ({ ...f, estatus: e.target.value }))} className="w-full bg-surface2 border border-border rounded-lg h-10 px-3 text-sm outline-none focus:border-accent">
                    <option value="Lead">Lead</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Cliente Activo">Cliente Activo</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end p-4 bg-surface2 border-t border-border rounded-b-xl">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost px-4 py-2 rounded-lg text-sm">Cancelar</button>
                <button type="submit" className="btn-accent px-4 py-2 rounded-lg text-sm">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
