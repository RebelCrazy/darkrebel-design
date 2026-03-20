import type { Metadata } from "next";
import "./globals.css";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import React from "react";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Dark Rebel | Portal de Proyectos",
  description: "Portal de gestion de proyectos para clientes y administracion"
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmMono.variable} ${dmSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {children}
      </body>
    </html>
  );
}
