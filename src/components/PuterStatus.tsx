"use client";

import { useEffect, useState } from "react";
import { puter } from "@heyputer/puter.js";

export default function PuterStatus() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(Boolean(puter));
  }, []);

  return (
    <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
      Puter SDK: {ready ? "listo" : "cargando"}
    </p>
  );
}
