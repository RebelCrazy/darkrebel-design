"use client";

import { useState } from "react";
import { puter } from "@heyputer/puter.js";

function extractChatText(result: unknown): string {
  if (typeof result === "string") return result;

  if (result && typeof result === "object") {
    const message = (result as { message?: { content?: unknown } }).message;
    const content = message?.content;

    if (typeof content === "string") return content;

    if (Array.isArray(content)) {
      return content
        .map((part) => {
          if (typeof part === "string") return part;
          if (part && typeof part === "object" && "text" in part) {
            const text = (part as { text?: unknown }).text;
            return typeof text === "string" ? text : "";
          }
          return "";
        })
        .filter(Boolean)
        .join("\n");
    }
  }

  return "No hubo texto legible en la respuesta.";
}

const presets = [
  "Redacta un update corto para cliente sobre avance de sitio web.",
  "Convierte este brief en 5 tareas accionables.",
  "Resume riesgos y siguientes pasos de un proyecto creativo.",
];

export default function AdminAssistantPanel() {
  const [question, setQuestion] = useState(presets[0]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAssistant = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await puter.ai.chat([
        {
          role: "system",
          content:
            "Eres un asistente operativo para Dark Rebel. Responde en espanol claro, accionable y breve. Prioriza proyectos, clientes, propuestas y seguimiento.",
        },
        {
          role: "user",
          content: question,
        },
      ]);

      setAnswer(extractChatText(result));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: "#111111",
        border: "1px solid #222220",
        borderRadius: 12,
        padding: 18,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#555552", marginBottom: 6 }}>
            ASISTENTE INTERNO
          </div>
          <h2 style={{ margin: 0, fontSize: 18, color: "#f0ede8" }}>Mini asistente en admin</h2>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setQuestion(preset)}
              style={{
                background: "transparent",
                color: "#aaa9a6",
                border: "1px solid #333330",
                borderRadius: 999,
                padding: "8px 10px",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Usar preset
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          minHeight: 120,
          resize: "vertical",
          background: "#090909",
          color: "#f0ede8",
          border: "1px solid #222220",
          borderRadius: 10,
          padding: 12,
          fontSize: 13,
          outline: "none",
          marginTop: 14,
        }}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={askAssistant}
          disabled={loading}
          style={{
            background: "#f0ede8",
            color: "#080808",
            border: "none",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Pensando..." : "Consultar asistente"}
        </button>
        <span style={{ fontSize: 11, color: "#555552" }}>
          Ideal para briefs, updates de cliente y tareas siguientes.
        </span>
      </div>

      {error ? (
        <div
          style={{
            marginTop: 14,
            borderRadius: 10,
            padding: 12,
            background: "rgba(255,32,32,0.08)",
            color: "#ff8d8d",
            fontSize: 12,
          }}
        >
          {error}
        </div>
      ) : null}

      <div
        style={{
          marginTop: 14,
          borderRadius: 10,
          border: "1px solid #222220",
          background: "#090909",
          padding: 14,
          color: answer ? "#f0ede8" : "#555552",
          fontSize: 13,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          minHeight: 160,
        }}
      >
        {answer || "Aqui veras la respuesta del asistente interno cuando ejecutes una consulta."}
      </div>
    </section>
  );
}
