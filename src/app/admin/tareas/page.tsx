"use client";
import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";

export default function TareasPage() {
  const [tareas, setTareas] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ titulo: "", descripcion: "", estado: "Pendiente", fecha_entrega: "", proyecto_id: "" });

  const fetchTareas = () => {
    fetch("/api/tareas")
      .then((res) => res.json())
      .then(setTareas);
  };
  useEffect(() => { fetchTareas(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    setForm({ titulo: "", descripcion: "", estado: "Pendiente", fecha_entrega: "", proyecto_id: "" });
    fetchTareas();
  };

  const getColor = (estado: string) => {
    if (estado === "Pendiente") return "bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700";
    if (estado === "En Progreso") return "bg-gradient-to-r from-zinc-800 to-zinc-600 border border-slate-400";
    if (estado === "Completada") return "bg-gradient-to-r from-zinc-900 to-zinc-700 border border-white/40";
    return "bg-zinc-900 border border-zinc-700";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><ListChecks /> Gestor de Tareas</h1>
      <button onClick={() => setShowModal(true)} className="mb-4 px-4 py-2 rounded bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700">Añadir Tarea</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Pendiente', 'En Progreso', 'Completada'].map((estado) => (
          <div key={estado} className="rounded-lg p-4 min-h-[180px] flex flex-col gap-3 " style={{background: 'none'}}>
            <h2 className="text-lg font-semibold mb-2">{estado === 'Pendiente' ? 'To Do' : estado}</h2>
            {tareas.filter((t) => t.estado === estado).map((t) => (
              <div key={t.id} className={`rounded-lg px-4 py-3 mb-2 ${getColor(estado)} shadow-md` }>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-white text-base">{t.titulo}</span>
                  <span className="text-xs text-zinc-400">{t.fecha_entrega}</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">{t.proyecto_nombre} / {t.cliente_nombre}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg border border-zinc-700 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold mb-2">Nueva Tarea</h2>
            <input type="text" placeholder="Título" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" required />
            <textarea placeholder="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" />
            <select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white">
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
            <input type="date" value={form.fecha_entrega} onChange={e => setForm(f => ({ ...f, fecha_entrega: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" required />
            <input type="text" placeholder="ID Proyecto" value={form.proyecto_id} onChange={e => setForm(f => ({ ...f, proyecto_id: e.target.value }))} className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white" required />
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