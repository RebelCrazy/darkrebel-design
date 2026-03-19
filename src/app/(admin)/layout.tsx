"use client";
import React, { useState } from "react";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import PortalPanel from "@/components/admin/PortalPanel";
import CrmPanel from "@/components/admin/CrmPanel";
import TareasPanel from "@/components/admin/TareasPanel";
import CotizacionesPanel from "@/components/admin/CotizacionesPanel";
import BriefsPanel from "@/components/admin/BriefsPanel";
import ContratosPanel from "@/components/admin/ContratosPanel";
import ColaboradoresPanel from "@/components/admin/ColaboradoresPanel";

const panels = {
  overview: { title: "Dashboard", cta: "+ Nuevo cliente" },
  portal: { title: "Portal de Cliente", cta: "+ Nuevo portal" },
  crm: { title: "CRM de Clientes", cta: "+ Nuevo cliente" },
  tareas: { title: "Gestor de Tareas", cta: "+ Nueva tarea" },
  cotizaciones: { title: "Cotizaciones", cta: "+ Nueva cotización" },
  briefs: { title: "Modelos de Brief", cta: "+ Nuevo brief" },
  contratos: { title: "Contratos", cta: "+ Nuevo contrato" },
  colaboradores: { title: "Colaboradores", cta: "+ Agregar colaborador" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [activePanel, setActivePanel] = useState<string>("overview");

  const handleCTA = () => {
    alert(`➕ Crear nuevo elemento en: ${panels[activePanel].title}`);
  };

  return (
    <div className="flex w-full h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-hidden">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={panels[activePanel].title} cta={panels[activePanel].cta} onCTA={handleCTA} />
        <div className="flex-1 overflow-y-auto p-8">
          {activePanel === "overview" && children}
          {activePanel === "portal" && <PortalPanel />}
          {activePanel === "crm" && <CrmPanel />}
          {activePanel === "tareas" && <TareasPanel />}
          {activePanel === "cotizaciones" && <CotizacionesPanel />}
          {activePanel === "briefs" && <BriefsPanel />}
          {activePanel === "contratos" && <ContratosPanel />}
          {activePanel === "colaboradores" && <ColaboradoresPanel />}
          {/* Aquí se agregarán los demás paneles dinámicos */}
        </div>
      </main>
    </div>
  );
}
