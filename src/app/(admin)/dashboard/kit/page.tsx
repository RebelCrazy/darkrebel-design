import Link from "next/link";

const card = {
  display: "block" as const,
  borderRadius: 12,
  border: "1px solid #222220",
  background: "#111111",
  padding: 20,
  textDecoration: "none" as const,
  color: "inherit" as const,
  transition: "border-color 0.15s, background 0.15s",
};

export default function KitFreelancersPage() {
  return (
    <div>
      <p style={{ marginBottom: 6, fontFamily: "DM Mono,monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555552" }}>
        Kit operativo
      </p>
      <h1 style={{ fontFamily: "Syne,serif", fontWeight: 800, fontSize: 28, marginBottom: 10, color: "#f0ede8", letterSpacing: "-0.03em" }}>
        Tu espacio tipo «KR Kit», en tu dominio
      </h1>
      <p style={{ marginBottom: 32, maxWidth: 640, fontSize: 14, color: "#aaa9a6", lineHeight: 1.6 }}>
        Inspirado en hubs como{" "}
        <a
          href="https://kaliromiglia.notion.site/KR-Kit-para-Freelancers-15a9b96689858045b26ad86d8ddf9bce"
          style={{ color: "#ff2020", textDecoration: "underline", textUnderlineOffset: 3 }}
          target="_blank"
          rel="noreferrer"
        >
          KR Kit para Freelancers
        </a>
        : proyectos web, CRM con embudo, tareas asignadas, plantillas, propuestas con partidas y colaboradores — sin Notion. Todo en tu D1.
      </p>

      <div
        style={{
          marginBottom: 28,
          padding: 18,
          borderRadius: 12,
          border: "1px dashed #333330",
          background: "rgba(24,24,24,0.6)",
        }}
      >
        <p style={{ fontFamily: "DM Mono,monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555552" }}>
          Precaución: bases de datos
        </p>
        <p style={{ marginTop: 10, fontSize: 13, color: "#aaa9a6", lineHeight: 1.5 }}>
          Aplica en D1 las migraciones hasta <code style={{ color: "#ff2020" }}>0006_web_freelance.sql</code> (campos web en proyectos + tabla propuestas).
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {[
          { href: "/admin/proyectos", t: "Proyectos web", d: "URLs prod/staging, stack, hosting, Figma y enlace al portal cliente." },
          { href: "/admin/tareas", t: "Tareas por proyecto", d: "Asignación a colaboradores, fechas y visibilidad en /p/…." },
          { href: "/admin/crm", t: "CRM + embudo", d: "Tabla o vista columnas Lead → Cliente activo." },
          { href: "/admin/propuestas", t: "Propuestas / $$", d: "Presupuestos con partidas, moneda y estado (enviada, aceptada…)." },
          { href: "/admin/recursos", t: "Recursos y briefs", d: "Prompts, briefs y notas en Markdown." },
          { href: "/admin/contratos", t: "Contratos (plantillas)", d: "Textos legales o comerciales reutilizables." },
          { href: "/admin/cotizaciones", t: "Plantillas de cotización", d: "Modelos de alcance para copiar en propuestas." },
          { href: "/admin/colaboradores", t: "Colaboradores", d: "Equipo que ayuda en sitios y tareas." },
        ].map((item) => (
          <Link key={item.href} href={item.href as never} style={card} className="kit-card block">
            <h2 style={{ fontFamily: "Syne,serif", fontWeight: 700, fontSize: 17, marginBottom: 8, color: "#f0ede8" }}>{item.t}</h2>
            <p style={{ fontSize: 12, color: "#555552", lineHeight: 1.45, margin: 0 }}>{item.d}</p>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 36, textAlign: "center", fontSize: 11, color: "#555552" }}>
        <Link href="/dashboard" style={{ color: "#ff2020", textDecoration: "none" }}>
          ← Volver al dashboard
        </Link>
      </p>
    </div>
  );
}
