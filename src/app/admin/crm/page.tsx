"use client";
import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const ESTATUS = ["Lead", "Contactado", "Cliente Activo"];

export default function CRMPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/crm")
      .then((res) => res.json())
      .then(setClientes);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", estatus: "Lead" });

  const fetchClientes = () => {
    fetch("/api/crm")
      .then((res) => res.json())
      .then(setClientes);
  };
  useEffect(() => { fetchClientes(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    setForm({ nombre: "", email: "", estatus: "Lead" });
    fetchClientes();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users /> CRM de Clientes</h1>
      <button onClick={() => setShowModal(true)} className="mb-4 px-4 py-2 rounded bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700">Nuevo Cliente</button>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-400 text-xs uppercase">
            <th className="px-3 py-2">Nombre</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Estatus</th>
            <th className="px-3 py-2">Proyectos Activos</th>
            <th className="px-3 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) && clientes.length > 0 ? clientes.map((c) => (
            <tr key={c?.id || Math.random()} className="bg-black border-b border-[#27272a]">
              <td className="px-3 py-2 text-white font-serif">{c?.nombre || 'Sin nombre'}</td>
              <td className="px-3 py-2 text-zinc-200">{c?.email || 'Sin email'}</td>
              <td className="px-3 py-2">{c?.estatus || 'Sin estatus'}</td>
              <td className="px-3 py-2 text-center font-bold text-zinc-100">{c?.proyectos_activos ?? 0}</td>
              <td className="px-3 py-2">Editar</td>
            </tr>
          )) : (
            <tr><td colSpan={5} className="text-center text-zinc-400 py-4">No hay clientes registrados.</td></tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg border border-zinc-700 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold mb-2">Nuevo Cliente</h2>
            <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" required />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" required />
            <select value={form.estatus} onChange={e => setForm(f => ({ ...f, estatus: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white">
              <option value="Lead">Lead</option>
              <option value="Contactado">Contactado</option>
              <option value="Cliente Activo">Cliente Activo</option>
            </select>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-zinc-700 text-white">Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded bg-zinc-100 text-black font-bold">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
  