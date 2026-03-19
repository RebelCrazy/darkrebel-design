import Link from "next/link";
import { Users, Briefcase, ListChecks, FileText, BookOpen } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white font-serif">
      <aside className="w-64 bg-[#111] border-r border-[#27272a] flex flex-col py-8 px-4">
        <div className="mb-10 text-center">
          <Link href="/admin">
            <span className="text-2xl font-bold tracking-widest">Dark Rebel</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarLink href="/admin/crm" icon={<Users className="w-5 h-5" />}>CRM de Clientes</SidebarLink>
          <SidebarLink href="/admin/tareas" icon={<ListChecks className="w-5 h-5" />}>Gestor de Tareas</SidebarLink>
          <SidebarLink href="/admin/recursos" icon={<BookOpen className="w-5 h-5" />}>Recursos & Plantillas</SidebarLink>
          <SidebarLink href="/admin/proyectos" icon={<Briefcase className="w-5 h-5" />}>Proyectos</SidebarLink>
          <SidebarLink href="/admin/contratos" icon={<FileText className="w-5 h-5" />}>Contratos</SidebarLink>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-black min-h-screen">{children}</main>
    </div>
  );
}

function SidebarLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors">
      {icon}
      <span className="text-base font-medium">{children}</span>
    </Link>
  );
}
