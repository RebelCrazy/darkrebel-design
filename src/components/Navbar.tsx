"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ShoppingCart, Sun, Moon, ExternalLink } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";

export function Navbar() {
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] py-3 px-6 md:px-12 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[var(--text2)] font-semibold">
        <div className="flex items-center gap-2">
          <Mail size={12} className="text-[var(--accent)]" />
          <span>{t('topbar.cta')}</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="hover:text-[var(--text)] transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-[var(--text)] transition-colors">Behance</Link>
          <Link href="#" className="hover:text-[var(--text)] transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-[var(--text)] transition-colors">Dribbble</Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 ${scrolled ? "top-0 backdrop-blur-xl bg-[var(--bg)]/80 border-b border-[var(--border)] py-3" : "top-12 bg-transparent"}`}>
        <Link href="/" className="flex items-center group">
          <Image src="/logo.svg" alt="Dark Rebel Logo" width={120} height={40} className="w-auto h-8 md:h-10 group-hover:opacity-80 transition-opacity" />
        </Link>
        
        <div className="hidden lg:flex items-center gap-12">
          {['Inicio', 'Nosotros', 'Servicios', 'Blog', 'Contacto'].map((item) => (
            <Link 
              key={item} 
              href={(item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) as any} 
              className="label text-[10px] hover:text-[var(--accent)] transition-colors relative group"
            >
              {t(`nav.${item.toLowerCase().replace(' ', '-')}`)}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-4 border-r border-[var(--border)] pr-8">
             <button onClick={toggleLang} className="text-[10px] font-bold tracking-widest hover:text-[var(--accent)] transition-colors">
               {lang === 'es' ? 'EN' : 'ES'}
             </button>
             <button onClick={toggleTheme} className="hover:text-[var(--accent)] transition-colors">
               {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
             </button>
          </div>
          
          <Link href="/cart" className="relative group">
            <ShoppingCart size={18} className="group-hover:text-[var(--accent)] transition-colors" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)] text-black text-[9px] font-bold flex items-center justify-center rounded-full">0</span>
          </Link>

          <Link href="https://proyectos.darkrebel.store" target="_blank" className="btn btn-sm hidden md:flex items-center gap-2 text-[10px]">
            Portal Clientes <ExternalLink size={12} />
          </Link>

          <button className="lg:hidden flex flex-col gap-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[var(--bg)] transition-all duration-500 lg:hidden ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Inicio', 'Nosotros', 'Servicios', 'Blog', 'Contacto'].map((item) => (
            <Link 
              key={item} 
              href={(item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) as any} 
              className="display-md text-4xl text-[var(--text)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(`nav.${item.toLowerCase().replace(' ', '-')}`)}
            </Link>
          ))}
          <div className="flex gap-8 mt-12">
            <button onClick={toggleLang} className="label text-xl text-[var(--text2)] hover:text-[var(--text)] transition-colors">
              {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
            </button>
            <button onClick={toggleTheme} className="label text-xl text-[var(--text2)] hover:text-[var(--text)] transition-colors">
              {theme === 'dark' ? (lang === 'es' ? 'MODO CLARO' : 'LIGHT MODE') : (lang === 'es' ? 'MODO OSCURO' : 'DARK MODE')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
