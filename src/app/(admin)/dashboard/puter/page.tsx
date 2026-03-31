"use client";

import Link from "next/link";
import AdminAssistantPanel from "@/components/puter/AdminAssistantPanel";
import PuterAiQuickTest from "@/components/puter/PuterAiQuickTest";
import PuterFilesPanel from "@/components/puter/PuterFilesPanel";

export default function PuterDashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            marginBottom: 14,
            padding: "8px 14px",
            borderRadius: 8,
            background: "rgba(255,32,32,0.1)",
            border: "1px solid #333330",
            color: "#ff2020",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Volver al dashboard
        </Link>
        <div style={{ fontWeight: 800, fontSize: 24, color: "#f0ede8", marginBottom: 4 }}>
          Puter Lab
        </div>
        <div style={{ fontSize: 13, color: "#555552", maxWidth: 780 }}>
          Aqui tienes tres usos directos para el SDK: prueba rapida de IA, asistente interno para
          admin y un espacio de archivos para demos y automatizaciones.
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        <PuterAiQuickTest />
        <AdminAssistantPanel />
        <PuterFilesPanel />
      </div>
    </div>
  );
}
