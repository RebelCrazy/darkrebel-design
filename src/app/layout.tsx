import type { Metadata } from "next";
import "./globals.css";
import "../../css/style.css";
import { Bebas_Neue, Syne, DM_Sans } from "next/font/google";
import React, { useEffect, useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-head" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Dark Rebel | Portal de Proyectos",
  description: "Portal de gestion de proyectos para clientes y administracion"
};

  children
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (cursor && ring) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
      document.addEventListener('mousemove', move);
      let running = true;
      function animCursor() {
        if (!running) return;
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animCursor);
      }
      animCursor();
      return () => {
        running = false;
        document.removeEventListener('mousemove', move);
      };
    }
  }, [mounted]);

  return (
    <html lang="es"
      className={`${bebas.variable} ${syne.variable} ${dmSans.variable}`}
      style={{ background: "var(--bg)", color: "var(--text)" }}>
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }} suppressHydrationWarning>
        {/* Cursor personalizado solo tras montaje */}
        {mounted && <><div id="cursor" /><div id="cursor-ring" /></>}
        {/* Hero noise background */}
        <div className="hero-noise" />
        <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 md:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}
