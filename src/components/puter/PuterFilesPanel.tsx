"use client";

import { ChangeEvent, useState } from "react";
import { puter } from "@heyputer/puter.js";

type ListedItem = {
  id: string;
  name: string;
  path: string;
  isDirectory: boolean;
  size: number | null;
};

const demoDir = "darkrebel-demo";

export default function PuterFilesPanel() {
  const [items, setItems] = useState<ListedItem[]>([]);
  const [status, setStatus] = useState("Aun no se ha consultado el espacio de archivos.");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const formatSize = (size: number | null) => {
    if (size == null) return "sin tamano";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const refreshListing = async () => {
    setBusy(true);
    setError("");

    try {
      await puter.fs.mkdir(demoDir, { createMissingParents: true, overwrite: true });
      const list = await puter.fs.readdir(demoDir);
      const normalized = list.map((item) => ({
        id: item.uid || item.id || item.path,
        name: item.name,
        path: item.path,
        isDirectory: item.isDirectory,
        size: item.size,
      }));
      setItems(normalized);
      setStatus(`Carpeta sincronizada: ${demoDir}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const createDemoNote = async () => {
    setBusy(true);
    setError("");

    try {
      const now = new Date().toLocaleString("es-MX");
      await puter.fs.write(
        `${demoDir}/nota-darkrebel.txt`,
        `Dark Rebel demo\nGenerado: ${now}\n\n- Brief revisado\n- Propuesta en curso\n- Siguiente paso: feedback del cliente\n`,
        { createMissingParents: true, overwrite: true }
      );
      await refreshListing();
      setStatus("Se creo o actualizo la nota de demostracion en Puter FS.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  const uploadSelectedFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      await puter.fs.write(`${demoDir}/${file.name}`, file, {
        createMissingParents: true,
        overwrite: true,
      });
      await refreshListing();
      setStatus(`Archivo cargado en Puter FS: ${file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    } finally {
      event.target.value = "";
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
          FILESYSTEM
        </div>
        <h2 style={{ margin: 0, fontSize: 18, color: "#f0ede8" }}>Demo de archivos con Puter FS</h2>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          onClick={createDemoNote}
          disabled={busy}
          style={{
            background: "#ff6b35",
            color: "#080808",
            border: "none",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Crear nota demo
        </button>

        <button
          type="button"
          onClick={refreshListing}
          disabled={busy}
          style={{
            background: "transparent",
            color: "#f0ede8",
            border: "1px solid #333330",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Ver archivos
        </button>

        <label
          style={{
            border: "1px solid #333330",
            borderRadius: 999,
            padding: "10px 16px",
            color: "#aaa9a6",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Subir archivo
          <input type="file" onChange={uploadSelectedFile} style={{ display: "none" }} />
        </label>
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "#555552" }}>
        Carpeta de trabajo: <code>{demoDir}</code>
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
        }}
      >
        <div style={{ fontSize: 12, color: "#aaa9a6", marginBottom: 10 }}>{status}</div>

        {items.length === 0 ? (
          <div style={{ fontSize: 12, color: "#555552" }}>
            La lista aparecera aqui cuando consultes o subas archivos.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.6fr 1fr auto",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #1f1f1d",
                  background: "#101010",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: "#f0ede8" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#555552", marginTop: 3 }}>{item.path}</div>
                </div>
                <div style={{ fontSize: 11, color: "#aaa9a6" }}>{item.isDirectory ? "carpeta" : "archivo"}</div>
                <div style={{ fontSize: 11, color: "#ff6b35" }}>{formatSize(item.size)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
