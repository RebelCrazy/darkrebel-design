"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Twitter, Dribbble } from "lucide-react";
import PuterStatus from "@/components/PuterStatus";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";

export const runtime = "edge";

const Marquee = () => {
  const { lang } = useAppContext();
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;
  const items = [
    t('marquee.brand'), t('marquee.web'), t('marquee.ui'), 
    t('marquee.consulting'), t('marquee.strategy'), t('marquee.tech')
  ];
  return (
    <div className="overflow-hidden border-y border-[var(--border)] py-8 bg-[var(--bg)]">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="display-md text-3xl md:text-5xl text-[var(--border2)] flex items-center gap-6 group hover:text-[var(--accent)] transition-colors duration-500">
            {item} <span className="text-[var(--accent)] text-xl opacity-30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const AlphabetSection = () => {
  const { lang } = useAppContext();
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;
  const alphaWords: Record<string, string> = {
    A:'API', B:'Branding', C:'CSS', D:'Diseño', E:'Estrategia', F:'Figma', G:'Grid',
    H:'HTML', I:'Identidad', J:'JavaScript', K:'Kerning', L:'Layout', M:'Mockup',
    N:'Node.js', O:'Open Source', P:'Prototipo', Q:'Query', R:'Responsive', S:'Sistema',
    T:'Tipografía', U:'UI / UX', V:'Visual', W:'Wireframe', X:'XML', Y:'YAML', Z:'Zen'
  };
  
  const alpha1 = 'ABCDEFGHIJKLM'.split('');
  const alpha2 = 'NOPQRSTUVWXYZ'.split('');

  return (
    <section className="py-32 border-b border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      <div className="px-6 md:px-12 mb-16">
        <div className="label mb-4">{t('alpha.label')}</div>
        <div className="w-12 h-px bg-[var(--accent)] mb-8"></div>
        <p className="body-lg text-2xl md:text-4xl max-w-4xl headline">
          {t('alpha.quote').replace(t('alpha.quote_acc'), '')}
          <span className="text-[var(--accent)]">{t('alpha.quote_acc')}</span>
        </p>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex animate-scroll-left whitespace-nowrap gap-1">
          {[...alpha1, ...alpha1].map((l, i) => (
            <div key={i} className="min-w-[180px] h-[100px] border border-[var(--border)] flex items-center justify-between px-8 group hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-default">
              <span className="display-md text-4xl group-hover:text-black">{l}</span>
              <span className="label text-[10px] group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">{alphaWords[l]}</span>
            </div>
          ))}
        </div>
        <div className="flex animate-scroll-right whitespace-nowrap gap-1">
          {[...alpha2, ...alpha2].map((l, i) => (
            <div key={i} className="min-w-[180px] h-[100px] border border-[var(--border)] flex items-center justify-between px-8 group hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-default">
              <span className="display-md text-4xl group-hover:text-black">{l}</span>
              <span className="label text-[10px] group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">{alphaWords[l]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MorphText = () => {
  const { lang } = useAppContext();
  const words = lang === 'es' 
    ? ["Creativo", "Visionario", "Innovador", "Profesional"]
    : ["Creative", "Visionary", "Innovative", "Professional"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return <span className="text-[var(--accent)] min-w-[10ch] inline-block">{words[index].substring(0, subIndex)}</span>;
};

const Countdown = () => {
  const { lang } = useAppContext();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-06-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="p-10 border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm relative group hover:border-[var(--accent)] transition-all">
          <div className="display-md text-6xl md:text-8xl text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">{String(value).padStart(2, '0')}</div>
          <div className="label tracking-[0.4em] text-[9px] opacity-60">
            {label === 'days' ? (lang === 'es' ? 'Días' : 'Days') : 
             label === 'hours' ? (lang === 'es' ? 'Horas' : 'Hours') : 
             label === 'minutes' ? (lang === 'es' ? 'Minutos' : 'Minutes') : 
             (lang === 'es' ? 'Segundos' : 'Seconds')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const { lang } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
          <div className="hero-noise opacity-30" />
          <div className="absolute inset-0 z-0">
            <Image 
              src="/ciudad_tapatia.png" 
              alt="Ciudad Tapatía" 
              fill 
              className="object-cover grayscale opacity-20 dark:opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
          </div>
          <div className="hero-cross absolute top-1/2 right-[5%] opacity-10 hidden xl:block text-9xl">+</div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="label mb-16 animate-fadein tracking-[0.5em] text-[var(--text3)] text-xs">
              {t('hero.label')}
            </div>
            
            <h1 className="display mb-8 animate-fadein" style={{ animationDelay: '0.2s' }}>
              {t('hero.t1')}<br />
              {t('hero.t2')}<br />
              <span className="text-[var(--accent)]">{t('hero.t3')}</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 animate-fadein" style={{ animationDelay: '0.3s' }}>
              <p className="body-lg max-w-md text-[var(--text2)] text-lg md:text-xl leading-relaxed">
                {t('hero.sub')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/servicios" className="btn btn-primary group px-8">
                  {t('hero.cta1')}
                  <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/nosotros" className="btn hover:border-[var(--text)] px-8">
                  {t('hero.cta2')}
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-16 left-6 md:left-12 z-10 animate-fadein" style={{ animationDelay: '0.6s' }}>
            <PuterStatus />
          </div>
        </section>

        <Marquee />

        {/* STUDIO POWER */}
        <section className="py-40 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="label mb-6">{t('power.label')}</div>
              <div className="w-16 h-0.5 bg-[var(--accent)] mb-12"></div>
              <h2 className="display-md text-7xl md:text-9xl mb-10">
                {t('power.title')}<br />
                <MorphText />
              </h2>
            </div>
            
            <div className="space-y-12">
              <p className="body-lg text-[var(--text2)] text-xl max-w-lg leading-relaxed">
                {t('power.desc')}
              </p>
              
              <div className="grid grid-cols-2 gap-1 overflow-hidden bg-[var(--border)]">
                {[
                  { label: t('stats.projects'), value: '120+' },
                  { label: t('stats.rating'), value: '5★' },
                  { label: t('stats.response'), value: '48h' },
                  { label: t('stats.revisions'), value: '∞' }
                ].map((stat, i) => (
                  <div key={i} className="p-10 bg-[var(--bg)] group hover:bg-[var(--accent)] transition-all duration-500">
                    <div className="display-md text-5xl text-[var(--accent)] group-hover:text-black mb-3">{stat.value}</div>
                    <div className="label text-[9px] group-hover:text-black opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-40 px-6 md:px-12 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <div className="label mb-6">{t('process.label')}</div>
              <div className="w-16 h-px bg-[var(--accent)] mb-8"></div>
              <h2 className="display-md text-6xl md:text-8xl">{t('process.title')}</h2>
            </div>

            <div className="grid grid-cols-1 gap-1 bg-[var(--border)]">
              {[
                { num: '1', title: t('step1.title'), desc: t('step1.desc'), btn: lang === 'es' ? 'Comienza aquí' : 'Start here', link: '/contacto' },
                { num: '2', title: t('step2.title'), desc: t('step2.desc'), btn: lang === 'es' ? 'Conoce más' : 'Learn more', link: '/nosotros' },
                { num: '3', title: t('step3.title'), desc: t('step3.desc'), btn: lang === 'es' ? 'Ver servicios' : 'View services', link: '/servicios' }
              ].map((step, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-[120px_1fr_auto] gap-12 py-20 px-10 bg-[var(--bg)] group hover:bg-[var(--surface2)] transition-all duration-500">
                  <div className="display-md text-9xl text-[var(--border)] group-hover:text-[var(--accent)] transition-colors">{step.num}</div>
                  <div className="max-w-xl">
                    <h3 className="headline text-4xl mb-6 group-hover:translate-x-2 transition-transform">{step.title}</h3>
                    <p className="text-[var(--text3)] text-lg leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="flex items-center">
                    <Link href={step.link} className="btn btn-sm group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                      {step.btn}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-40 border-b border-[var(--border)]">
          <div className="px-6 md:px-12 mb-20 flex justify-between items-end">
            <div>
              <div className="label mb-6">{t('gallery.label')}</div>
              <div className="w-16 h-px bg-[var(--accent)] mb-8"></div>
              <h2 className="headline text-5xl md:text-7xl">{t('gallery.title')}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-[var(--border)]">
            {[
              { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', cat: t('gallery.cat1') },
              { img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80', cat: t('gallery.cat2') },
              { img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', cat: t('gallery.cat3') },
              { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', cat: t('gallery.cat4') }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden bg-[var(--bg)]">
                <Image 
                  src={item.img} 
                  alt={item.cat} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                  <span className="label text-[10px] text-[var(--accent)] mb-2">
                    {lang === 'es' ? 'Proyecto' : 'Project'}
                  </span>
                  <h4 className="headline text-2xl">{item.cat}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-48 px-6 md:px-12 text-center border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="display-md text-5xl md:text-9xl leading-[1.05]">
              {t('quote.text')}
            </h2>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-40 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-24">
            <div>
              <div className="label mb-6">{t('faq.label')}</div>
              <div className="w-16 h-px bg-[var(--accent)] mb-8"></div>
              <h2 className="display-md text-6xl md:text-8xl mb-12">{t('faq.title')}</h2>
              <p className="body-lg text-xl text-[var(--text2)] leading-relaxed">
                {t('faq.cta').replace('Pregúntanos directamente.', '').replace('Ask us directly.', '')}
                <Link href="/contacto" className="text-[var(--accent)] hover:underline">
                  {lang === 'es' ? 'Pregúntanos directamente.' : 'Ask us directly.'}
                </Link>
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  q: lang === 'es' ? '¿Cuánto tarda un proyecto?' : 'How long does a project take?', 
                  a: lang === 'es' ? 'Los tiempos dependen del alcance. Una página de aterrizaje toma 5–7 días; una identidad de marca completa 2–3 semanas; un diseño web completo 3–5 semanas.' : 'Timelines depend on the scope. A landing page takes 5–7 days; a full brand identity 2–3 weeks; a full web design 3–5 weeks.' 
                },
                { 
                  q: lang === 'es' ? '¿Trabajan con startups?' : 'Do you work with startups?', 
                  a: lang === 'es' ? 'Por supuesto. Amamos a las empresas en etapa inicial. Ofrecemos paquetes accesibles y planes de pago flexibles para que el presupuesto nunca sea una barrera.' : 'Of course. We love early-stage companies. We offer accessible packages and flexible payment plans so budget is never a barrier.' 
                },
                { 
                  q: lang === 'es' ? '¿Qué incluye la entrega del proyecto?' : 'What does the project delivery include?', 
                  a: lang === 'es' ? 'Recibirás archivos fuente (Figma, AI, PDF), activos exportados en todos los formatos necesarios, una guía de uso y 30 días de soporte post-entrega.' : 'You will receive source files (Figma, AI, PDF), exported assets in all necessary formats, a style guide, and 30 days of post-delivery support.' 
                },
                { 
                  q: lang === 'es' ? '¿Cuántas revisiones están incluidas?' : 'How many revisions are included?', 
                  a: lang === 'es' ? 'Rondas ilimitadas dentro del alcance del proyecto. Iteramos hasta que estés genuinamente contento. No contamos revisiones; contamos resultados.' : 'Unlimited rounds within the project scope. We iterate until you are genuinely happy. We don\'t count revisions; we count results.' 
                },
                { 
                  q: lang === 'es' ? '¿También hacen desarrollo?' : 'Do you also do development?', 
                  a: lang === 'es' ? 'Nos especializamos en diseño, pero trabajamos con socios de desarrollo de confianza. Podemos gestionar todo el pipeline si es necesario.' : 'We specialize in design, but work with trusted development partners. We can manage the entire pipeline if necessary.' 
                }
              ].map((faq, i) => (
                <details key={i} className="group border border-[var(--border)] bg-[var(--bg)] p-8 transition-all hover:border-[var(--border2)]">
                  <summary className="list-none flex justify-between items-center cursor-pointer headline text-2xl md:text-3xl group-hover:text-[var(--accent)] transition-colors">
                    {faq.q}
                    <span className="w-10 h-10 border border-[var(--border)] flex items-center justify-center group-open:bg-[var(--accent)] group-open:text-black transition-all">+</span>
                  </summary>
                  <p className="mt-8 text-[var(--text3)] text-lg leading-relaxed max-w-2xl animate-fadein">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="py-40 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="px-6 md:px-12 mb-20 flex justify-between items-end flex-wrap gap-10">
            <div>
              <div className="label mb-6">{t('blog.label')}</div>
              <div className="w-16 h-px bg-[var(--accent)] mb-8"></div>
              <h2 className="display-md text-6xl md:text-8xl">{t('blog.title')}</h2>
            </div>
            <Link href="/blog" className="btn px-10">{t('blog.cta')}</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[var(--border)]">
            {[
              { title: lang === 'es' ? 'Los 5 principios del diseño de marca atemporal' : 'The 5 Principles of Timeless Brand Design', date: lang === 'es' ? '1 de marzo de 2026' : 'March 1, 2026', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80', excerpt: lang === 'es' ? '¿Qué separa a las marcas que perduran de las que se desvanecen en su primera temporada?' : 'What separates brands that last from those that fade away in their first season?' },
              { title: lang === 'es' ? 'Por qué el diseño dark mode exige un enfoque diferente' : 'Why Dark Mode Design Demands a Different Approach', date: lang === 'es' ? '18 de feb de 2026' : 'Feb 18, 2026', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80', excerpt: lang === 'es' ? 'Las interfaces oscuras no son solo inversiones de las claras. El dark mode requiere repensar todo.' : 'Dark interfaces are not just inversions of light ones. Dark mode requires rethinking everything.' },
              { title: lang === 'es' ? 'Elegir tipografía que vende, no solo que se ve bien' : 'Choosing Typography That Sells, Not Just Looks Good', date: lang === 'es' ? '5 de feb de 2026' : 'Feb 5, 2026', img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80', excerpt: lang === 'es' ? 'La elección tipográfica nunca es neutral. Cada fuente lleva un peso emocional profundo.' : 'Typographic choice is never neutral. Each font carries a deep emotional weight.' }
            ].map((post, i) => (
              <div key={i} className="bg-[var(--bg)] p-12 group border border-[var(--border)] hover:border-[var(--accent)] transition-all">
                <div className="aspect-video relative overflow-hidden mb-10 bg-[var(--surface2)]">
                  <Image src={post.img} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="label text-[9px] text-[var(--text3)] mb-6">{post.date}</div>
                <h3 className="headline text-2xl mb-6 group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
                <p className="text-[var(--text2)] mb-10 line-clamp-2">{post.excerpt}</p>
                <Link href="/blog" className="inline-flex items-center gap-3 label text-[9px] text-[var(--accent)] group-hover:gap-5 transition-all">
                  {t('blog.read')} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="py-40 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="label mb-8">{t('countdown.label')}</div>
            <h2 className="display-md text-6xl md:text-9xl mb-10">{t('countdown.title')}</h2>
            <p className="body-lg text-[var(--text2)] text-xl max-w-2xl mx-auto mb-20 leading-relaxed">
              {t('countdown.sub')}
            </p>
            <Countdown />
            <div className="mt-20">
              <Link href="/contacto" className="btn btn-primary px-16 py-6">{t('countdown.cta')}</Link>
            </div>
          </div>
        </section>

        <AlphabetSection />

        {/* CONTACT CTA SECTION */}
        <section className="py-40 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-[var(--surface)] border border-[var(--border)]">
            <div className="p-16 md:p-24 border-b lg:border-b-0 lg:border-r border-[var(--border)] flex flex-col justify-between">
              <div className="space-y-16">
                <div>
                  <div className="label mb-6 text-[var(--accent)] tracking-[0.4em]">{t('contact.phone')}</div>
                  <p className="display-md text-4xl md:text-5xl">33 4007 9524</p>
                </div>
                <div>
                  <div className="label mb-6 text-[var(--accent)] tracking-[0.4em]">{t('contact.email_label')}</div>
                  <p className="display-md text-4xl md:text-5xl">info@darkrebel.store</p>
                </div>
                <div>
                  <div className="label mb-6 text-[var(--accent)] tracking-[0.4em]">{t('contact.office')}</div>
                  <p className="text-[var(--text2)] text-lg">{t('contact.office_desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-10 mt-16 pt-16 border-t border-[var(--border)]">
                <Instagram className="hover:text-[var(--accent)] cursor-pointer transition-colors" size={24} />
                <Linkedin className="hover:text-[var(--accent)] cursor-pointer transition-colors" size={24} />
                <Twitter className="hover:text-[var(--accent)] cursor-pointer transition-colors" size={24} />
                <Dribbble className="hover:text-[var(--accent)] cursor-pointer transition-colors" size={24} />
              </div>
            </div>
            
            <div className="p-16 md:p-24 bg-[var(--bg)]">
              <h3 className="display-md text-5xl md:text-6xl mb-12">{t('cta.title')}</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="label text-[9px] mb-3 block">{t('contact.form_name')}</label>
                    <input type="text" placeholder="Josepe" className="w-full bg-[var(--surface)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--text3)]" />
                  </div>
                  <div>
                    <label className="label text-[9px] mb-3 block">{t('contact.form_email')}</label>
                    <input type="email" placeholder="josepe@empresa.com" className="w-full bg-[var(--surface)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--text3)]" />
                  </div>
                </div>
                <div>
                  <label className="label text-[9px] mb-3 block">{t('contact.form_service')}</label>
                  <select className="w-full bg-[var(--surface)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all text-[var(--text2)]">
                    <option>{t('marquee.brand')}</option>
                    <option>{t('marquee.web')}</option>
                    <option>{t('marquee.ui')}</option>
                    <option>{lang === 'es' ? 'Otro' : 'Other'}</option>
                  </select>
                </div>
                <div>
                  <label className="label text-[9px] mb-3 block">{t('contact.form_msg')}</label>
                  <textarea rows={5} placeholder={lang === 'es' ? 'Cuéntanos más...' : 'Tell us more...'} className="w-full bg-[var(--surface)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all resize-none placeholder:text-[var(--text3)]"></textarea>
                </div>
                <button className="btn btn-primary w-full py-6 text-lg">{t('contact.form_send')}</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Back to Top Button */}
      {scrolled && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-50 w-12 h-12 bg-[var(--accent)] text-black flex items-center justify-center hover:scale-110 transition-all group"
        >
          <ArrowRight size={24} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-fadein {
          animation: fadein 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        details[open] summary span {
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}
