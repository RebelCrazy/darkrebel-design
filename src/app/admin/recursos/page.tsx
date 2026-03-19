"use client";
import { BookOpen, FileText } from "lucide-react";

export default function RecursosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen /> Recursos & Plantillas</h1>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FileText /> Cotizador Gótico</h2>
        {/* Aquí va el generador de cotizaciones */}
        <div className="bg-zinc-900 rounded-lg p-4 mb-4">Cotizador visual aquí</div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FileText /> Briefs & Contratos</h2>
        {/* Aquí van los markdowns de plantillas */}
        <div className="bg-zinc-900 rounded-lg p-4">Plantillas de texto aquí</div>
      </section>
    </div>
  );
}