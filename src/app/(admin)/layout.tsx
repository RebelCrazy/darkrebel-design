import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen bg-bg text-text font-dm-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-w)]">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
