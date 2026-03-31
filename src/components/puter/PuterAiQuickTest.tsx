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

export default function PuterAiQuickTest() {
  const [prompt, setPrompt] = useState(
    "Resume el estado ideal de un proyecto web para un cliente de Dark Rebel en 3 bullets."
  );
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runPrompt = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await puter.ai.chat(prompt);
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
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#555552", marginBottom: 6 }}>
          PRUEBA RAPIDA
        </div>
        <h2 style={{ margin: 0, fontSize: 18, color: "#f0ede8" }}>Puter AI Chat</h2>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          minHeight: 100,
          resize: "vertical",
          background: "#090909",
          color: "#f0ede8",
          border: "1px solid #222220",
          borderRadius: 10,
          padding: 12,
          fontSize: 13,
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={runPrompt}
          disabled={loading}
          style={{
            background: "#ff2020",
            color: "#080808",
            border: "none",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Consultando..." : "Probar prompt"}
        </button>
        <span style={{ fontSize: 11, color: "#555552" }}>
          Usa `puter.ai.chat(...)` desde cliente sin montar un backend extra.
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
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          minHeight: 120,
        }}
      >
        {answer || "La respuesta aparecera aqui despues de ejecutar la prueba."}
      </div>
    </section>
  );
}
