"use client";

import Link from "next/link";
import Image from "next/image";
import PuterStatus from "@/components/PuterStatus";

export const runtime = "edge";

export default function HomeCoverPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-fadein mb-10">
            <Image
              src="/logo.svg"
              alt="Dark Rebel Logo"
              width={220}
              height={220}
              priority
              className="mx-auto drop-shadow-lg"
            />
          </div>
          <Link
            href="/admin/login"
            className="mt-2 px-8 py-3 rounded-full bg-white/10 border border-zinc-800 text-lg font-serif text-white tracking-widest shadow-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Acceso a Proyectos
          </Link>
          <PuterStatus />
        </div>
      </main>
      <footer className="w-full py-4 flex flex-col items-center text-xs text-zinc-500 font-serif opacity-70">
        <span>© 2026 Dark Rebel | Guadalajara, Jalisco.</span>
        <Link href="https://darkrebel.store" className="underline hover:text-white transition-colors duration-200 mt-1">darkrebel.store</Link>
      </footer>
      <style jsx global>{`
        html, body { background: #000 !important; }
        .animate-fadein {
          animation: fadein 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
