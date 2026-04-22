import type { Metadata } from "next";

import "./globals.css";

import Head from "next/head";

export const metadata: Metadata = {
  title: "Dark Rebel | Portal de Proyectos",
  description: "Diseño Web Profesional en Jalisco y Chapala. Portal de gestión de proyectos para clientes y administración.",
  keywords: ["Diseño Web", "Jalisco", "Chapala", "Dark Rebel", "Branding", "Real Estate Tech"],
  icons: {
    icon: "/favicon.svg"
  }
};
import { Syne, DM_Mono, DM_Sans, Bebas_Neue } from "next/font/google";
import React from "react";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
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



import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
