"use client";

export const runtime = "edge";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";



const posts = [
  {
    id: 1,
    title: 'Los 5 principios del diseño de marca atemporal',
    titleEn: 'The 5 Principles of Timeless Brand Design',
    date: '1 de marzo de 2026',
    dateEn: 'March 1, 2026',
    excerpt: '¿Qué separa a las marcas que perduran décadas de las que se desvanecen en su primera temporada? Todo se reduce a cinco principios innegociables.',
    excerptEn: 'What separates brands that last decades from those that fade in their first season? It all comes down to five non-negotiable principles.',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80'
  },
  {
    id: 2,
    title: 'Por qué el diseño dark mode exige un enfoque diferente',
    titleEn: 'Why Dark Mode Design Demands a Different Approach',
    date: '18 de feb de 2026',
    dateEn: 'Feb 18, 2026',
    excerpt: 'Las interfaces oscuras no son solo inversiones de las claras. El dark mode requiere repensar el contraste y la jerarquía.',
    excerptEn: 'Dark interfaces are not just inversions of light ones. Dark mode requires rethinking contrast and hierarchy.',
    img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80'
  },
  {
    id: 3,
    title: 'Elegir tipografía que vende, no solo que se ve bien',
    titleEn: 'Choosing Typography That Sells, Not Just Looks Good',
    date: '5 de feb de 2026',
    dateEn: 'Feb 5, 2026',
    excerpt: 'La elección tipográfica nunca es neutral. Cada fuente lleva peso emocional y afecta directamente las decisiones de compra.',
    excerptEn: 'Typographic choice is never neutral. Each font carries emotional weight and directly affects purchasing decisions.',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80'
  },
  {
    id: 4,
    title: 'El brief roto: cómo escribir briefs de diseño que funcionen',
    titleEn: 'The Broken Brief: How to Write Design Briefs That Work',
    date: '22 de ene de 2026',
    dateEn: 'Jan 22, 2026',
    excerpt: 'El 90% de los fracasos de diseño comienzan en el brief. Aquí hay un framework refinado en más de 120 proyectos.',
    excerptEn: '90% of design failures start with the brief. Here is a framework refined across more than 120 projects.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
  }
];

export default function Blog() {
  const { lang } = useAppContext();
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* PAGE HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden border-b border-[var(--border)]">
          <div className="hero-noise opacity-20" />
          <div className="absolute top-1/2 right-0 translate-y-[-50%] translate-x-[20%] display text-[25vw] text-[var(--surface3)] select-none pointer-events-none opacity-20">BLOG</div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="label mb-6 animate-fadein tracking-[0.3em] text-[var(--text3)]">
              {lang === 'es' ? 'Perspectivas e ideas' : 'Perspectives & ideas'}
            </div>
            <h1 className="display mb-8 animate-fadein" style={{ animationDelay: '0.2s' }}>
              {lang === 'es' ? 'EL' : 'THE'}<br />
              <span className="text-[var(--accent)]">{lang === 'es' ? 'BLOG.' : 'BLOG.'}</span>
            </h1>
            <p className="body-lg max-w-lg text-[var(--text2)] animate-fadein" style={{ animationDelay: '0.3s' }}>
              {lang === 'es' 
                ? 'Pensamiento de diseño, estrategia de marca, tendencias web y el ocasional desahogo sobre tipografía horrible.'
                : 'Design thinking, brand strategy, web trends, and the occasional rant about horrible typography.'}
            </p>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-[var(--border)]">
              {posts.map((post) => (
                <article key={post.id} className="bg-[var(--bg)] group border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500">
                  <div className="aspect-[16/9] relative overflow-hidden bg-[var(--surface2)]">
                    <Image src={post.img} alt={lang === 'es' ? post.title : post.titleEn} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                  </div>
                  <div className="p-10 md:p-16">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-px bg-[var(--accent)]"></div>
                      <div className="label text-[10px] text-[var(--text3)] flex items-center gap-2">
                        <Calendar size={12} /> {lang === 'es' ? post.date : post.dateEn}
                      </div>
                    </div>
                    <h2 className="headline text-3xl md:text-4xl mb-6 group-hover:text-[var(--accent)] transition-colors">
                      {lang === 'es' ? post.title : post.titleEn}
                    </h2>
                    <p className="text-[var(--text3)] leading-relaxed mb-8">
                      {lang === 'es' ? post.excerpt : post.excerptEn}
                    </p>
                    <Link href="#" className="inline-flex items-center gap-3 label text-[10px] text-[var(--accent)] hover:gap-5 transition-all">
                      {lang === 'es' ? 'Leer más' : 'Read more'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

