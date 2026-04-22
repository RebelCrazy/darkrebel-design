"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";

export function Footer() {
  const { lang } = useAppContext();
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  return (
    <footer className="py-32 px-6 md:px-12 border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <Image src="/logo.svg" alt="Dark Rebel Logo" width={140} height={45} className="mb-10 opacity-80" />
          <p className="text-[var(--text2)] text-lg leading-relaxed mb-12">
            {t('footer.desc')}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/servicios" className="btn btn-sm px-8">Servicios</Link>
            <Link href="/contacto" className="btn btn-sm btn-ghost px-8 border-[var(--border2)] hover:border-[var(--text)]">Contáctanos</Link>
          </div>
        </div>
        
        <div>
          <div className="label text-[var(--text)] mb-12 tracking-[0.4em]">{t('footer.pages')}</div>
          <div className="flex flex-col gap-5 text-[var(--text2)] text-lg">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">{t('nav.inicio')}</Link>
            <Link href="/nosotros" className="hover:text-[var(--accent)] transition-colors">{t('nav.nosotros')}</Link>
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">{t('nav.servicios')}</Link>
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">{t('nav.blog')}</Link>
            <Link href="/contacto" className="hover:text-[var(--accent)] transition-colors">{t('nav.contacto')}</Link>
          </div>
        </div>

        <div>
          <div className="label text-[var(--text)] mb-12 tracking-[0.4em]">{t('footer.services')}</div>
          <div className="flex flex-col gap-5 text-[var(--text2)] text-lg">
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">Identidad de Marca</Link>
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">Diseño Web</Link>
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">Auditoría UI/UX</Link>
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">Kit de Redes Sociales</Link>
            <Link href="/servicios" className="hover:text-[var(--accent)] transition-colors">Retención Mensual</Link>
          </div>
        </div>

        <div>
          <div className="label text-[var(--text)] mb-12 tracking-[0.4em]">{t('footer.follow')}</div>
          <div className="flex flex-col gap-5 text-[var(--text2)] text-lg">
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">Behance</Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">Dribbble</Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">X (Twitter)</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--text3)] font-bold">
          {t('footer.rights')}
        </div>
        <div className="flex gap-12 text-[11px] tracking-[0.3em] uppercase text-[var(--text3)] font-bold">
          <span className="hover:text-[var(--text)] cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-[var(--text)] cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
