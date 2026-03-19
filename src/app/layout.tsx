import type { Metadata } from "next";
import "./globals.css";
import "../../css/style.css";
import { Bebas_Neue, Syne, DM_Sans } from "next/font/google";
import React from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-head" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Dark Rebel | Portal de Proyectos",
  description: "Portal de gestion de proyectos para clientes y administracion"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es"
      className={`${bebas.variable} ${syne.variable} ${dmSans.variable}`}
      style={{ background: "var(--bg)", color: "var(--text)" }}>
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {/* Cursor personalizado */}
        <div id="cursor" />
        <div id="cursor-ring" />
        {/* Hero noise background */}
        <div className="hero-noise" />
        <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 md:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}
