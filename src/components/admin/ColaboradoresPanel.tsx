import React from "react";

const colaboradores = [
  {
    avatar: "AV",
    color: "var(--blue)",
    name: "Ana Valencia",
    role: "Diseñadora UI/UX",
    tasks: [
      { name: "Diseño mockups Cenit", status: "EN PROCESO", color: "var(--blue)" },
      { name: "Logo Piel Luz v2", status: "REVISIÓN", color: "var(--orange)" },
      { name: "Paleta de colores Piel Luz", status: "POR HACER", color: "var(--text3)" },
    ],
  },
  {
    avatar: "LM",
    color: "var(--purple)",
    name: "Luis Morales",
    role: "Desarrollador Frontend",
    tasks: [
      { name: "Desarrollo Cenit", status: "EN PROCESO", color: "var(--blue)" },
      { name: "Integración Shopify PL", status: "EN PROCESO", color: "var(--blue)" },
      { name: "Formulario contacto Cenit", status: "POR HACER", color: "var(--text3)" },
    ],
  },
  {
    avatar: "KR",
    color: "var(--green)",
    name: "Karen Ramírez",
    role: "Copywriter",
    tasks: [
      { name: "Textos homepage María", status: "REVISIÓN", color: "var(--orange)" },
      { name: "SEO copy Joyería Robles", status: "POR HACER", color: "var(--text3)" },
    ],
  },
];

export default function ColaboradoresPanel() {
  return (
    <div>
      <div className="font-syne font-bold text-2xl mb-2">Panel de Colaboradores</div>
      <div className="text-[var(--text2)] text-base mb-6">Un espacio para cada persona de tu equipo. Ve sus proyectos activos, tareas asignadas y carga de trabajo en tiempo real.</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {colaboradores.map((c, i) => (
          <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <div className="w-11 h-11 rounded-lg mb-3 flex items-center justify-center font-extrabold text-lg text-black" style={{ background: c.color }}>{c.avatar}</div>
            <div className="font-syne font-bold text-[15px] mb-0.5">{c.name}</div>
            <div className="text-[11px] text-[var(--text3)] font-mono mb-3">{c.role}</div>
            <div className="flex flex-col gap-1">
              {c.tasks.map((t, j) => (
                <div key={j} className="flex items-center justify-between bg-[var(--surface2)] rounded px-3 py-2 text-xs">
                  <span className="text-[var(--text2)]">{t.name}</span>
                  <span className="font-mono text-[10px]" style={{ color: t.color }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
