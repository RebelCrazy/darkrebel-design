import React from "react";
import ClientRow from "@/components/admin/ClientRow";

const clients = [
  { avatar: "MG", avatarColor: "var(--accent)", name: "María González", project: "Landing page boutique", status: <span className="status-chip chip-active">Activo</span>, email: "maria@boutique.mx", amount: "$15,000", owner: "Tú", last: "hoy" },
  { avatar: "RC", avatarColor: "var(--blue)", name: "Restaurante Cenit", project: "Web + branding", status: <span className="status-chip chip-progress">En proceso</span>, email: "contacto@cenit.com", amount: "$28,000", owner: "Ana (colab)", last: "hace 2 días" },
  { avatar: "TS", avatarColor: "var(--purple)", name: "Tech Startup MX", project: "Dashboard SaaS", status: <span className="status-chip chip-waiting">En espera</span>, email: "ceo@techstartup.mx", amount: "$45,000", owner: "Tú", last: "hace 5 días" },
  { avatar: "PL", avatarColor: "var(--orange)", name: "Piel Luz Studio", project: "Tienda Shopify", status: <span className="status-chip chip-active">Activo</span>, email: "hola@pielluz.mx", amount: "$18,500", owner: "Tú", last: "ayer" },
  { avatar: "JR", avatarColor: "var(--green)", name: "Joyería Robles", project: "E-commerce + SEO", status: <span className="status-chip chip-prospect">Prospecto</span>, email: "ventas@jroblesmx.com", amount: "$22,000", owner: "Tú", last: "hace 1 sem" },
  { avatar: "GF", avatarColor: "var(--text3)", name: "Gym Force", project: "Sitio corporativo", status: <span className="status-chip chip-done">Entregado</span>, email: "admin@gymforce.mx", amount: "$12,000", owner: "Tú", last: "hace 3 sem" },
];

export default function CrmPanel() {
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">CRM de Clientes</div>
      <div className="text-[var(--text2)] text-base mb-6">Registra clientes y prospectos, asígnales estatus y dale seguimiento claro a cada oportunidad.</div>
      <div className="flex items-center gap-2 mb-4">
        <input className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] text-sm font-sans outline-none focus:border-[var(--border2)]" placeholder="🔍  Buscar por nombre, proyecto o estatus..." />
        <button className="btn btn-ghost border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text2)] hover:bg-[var(--surface3)]">Filtrar</button>
        <button className="btn btn-accent bg-[var(--accent)] text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--accent2)]">+ Nuevo cliente</button>
      </div>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Cliente</th>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Proyecto</th>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Estatus</th>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Monto</th>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Responsable</th>
              <th className="text-left text-[11px] font-mono text-[var(--text3)] uppercase px-4 py-2 border-b border-[var(--border)] font-normal">Última actividad</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={i} className="hover:bg-white/5">
                <td className="px-4 py-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="client-avatar" style={{ background: c.avatarColor, width: 30, height: 30, fontSize: 11 }}>{c.avatar}</div>
                    <div>
                      <div className="crm-name font-medium text-[var(--text)] text-sm">{c.name}</div>
                      <div className="crm-sub text-xs text-[var(--text3)]">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-[var(--text2)]">{c.project}</td>
                <td className="px-4 py-3 border-b border-[var(--border)]">{c.status}</td>
                <td className="px-4 py-3 border-b border-[var(--border)] font-mono text-[var(--accent)]">{c.amount}</td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-[var(--text2)] text-xs">{c.owner}</td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-[var(--text3)] text-xs font-mono">{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
