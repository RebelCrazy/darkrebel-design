import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dark Rebel | Portal de Proyectos",
  description: "Portal de gestion de proyectos para clientes y administracion"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-black text-zinc-100 antialiased">
        <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 md:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}
