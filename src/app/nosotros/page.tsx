"use client";

export const runtime = "edge";

import Link from "next/link";
import Image from "next/image";
import { Target, Users, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";



export default function Nosotros() {
  const { lang } = useAppContext();
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* PAGE HERO */}
        <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden border-b border-[var(--border)]">
          <div className="hero-noise opacity-20" />
          <div className="absolute top-1/2 right-0 translate-y-[-50%] translate-x-[20%] display text-[25vw] text-[var(--surface3)] select-none pointer-events-none opacity-20">ABOUT</div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="label mb-6 animate-fadein tracking-[0.3em] text-[var(--text3)]">
              {lang === 'es' ? 'Quiénes somos' : 'Who we are'}
            </div>
            <h1 className="display mb-8 animate-fadein" style={{ animationDelay: '0.2s' }}>
              {lang === 'es' ? 'SOBRE' : 'ABOUT'}<br />
              <span className="text-[var(--accent)]">DARK REBEL.</span>
            </h1>
            <p className="body-lg max-w-lg text-[var(--text2)] animate-fadein" style={{ animationDelay: '0.3s' }}>
              {lang === 'es' 
                ? 'Somos un estudio de diseño remoto que cree que el gran diseño nunca es decoración — es estrategia hecha visible.'
                : 'We are a remote design studio that believes great design is never decoration — it is strategy made visible.'}
            </p>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-32 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="label mb-4">{lang === 'es' ? 'Nuestra historia' : 'Our story'}</div>
              <div className="w-12 h-0.5 bg-[var(--accent)] mb-8"></div>
              <h2 className="display-md text-5xl md:text-7xl mb-6">
                {lang === 'es' ? 'Nunca soñamos' : 'We never dreamed'}<br />
                {lang === 'es' ? 'con el éxito.' : 'about success.'}<br />
                <span className="text-[var(--accent)]">{lang === 'es' ? 'Lo trabajamos.' : 'We worked for it.'}</span>
              </h2>
            </div>
            
            <div className="space-y-8">
              <p className="body-lg text-[var(--text2)] leading-relaxed">
                {lang === 'es' 
                  ? 'Fundado en 2020, DARK REBEL DESIGN comenzó como una operación unipersonal con una creencia: que las marcas pequeñas merecen diseño de clase mundial. Hoy somos un equipo distribuido de diseñadores, estrategas y narradores que sirven a clientes en más de 20 países.'
                  : 'Founded in 2020, DARK REBEL DESIGN started as a one-person operation with one belief: that small brands deserve world-class design. Today we are a distributed team of designers, strategists, and storytellers serving clients in over 20 countries.'}
              </p>
              <p className="body-lg text-[var(--text2)] leading-relaxed">
                {lang === 'es'
                  ? 'Cada proyecto comienza con una pregunta: ¿qué deben sentir las personas al encontrarse con esta marca? La respuesta da forma a todo lo que sigue — desde el logo hasta el diseño, desde la tipografía hasta el tono de voz.'
                  : 'Every project begins with a question: what should people feel when encountering this brand? The answer shapes everything that follows — from logo to layout, from typography to tone of voice.'}
              </p>
              
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { label: lang === 'es' ? 'Proyectos' : 'Projects', value: '120+' },
                  { label: lang === 'es' ? 'Países' : 'Countries', value: '20+' },
                  { label: lang === 'es' ? 'Años' : 'Years', value: '5' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="display-md text-5xl text-[var(--accent)]">{stat.value}</div>
                    <div className="label text-[10px] mt-2 opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-32 px-6 md:px-12 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <div className="label mb-4">{lang === 'es' ? 'Nuestro enfoque' : 'Our approach'}</div>
              <h2 className="display-md text-5xl md:text-7xl">Lo que <span className="text-[var(--accent)]">{lang === 'es' ? 'nos guía.' : 'guides us.'}</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Target size={40} />, 
                  title: lang === 'es' ? 'Diseño Estratégico' : 'Strategic Design', 
                  desc: lang === 'es' 
                    ? 'No trabajamos decoración. Cada decisión visual está anclada en objetivos de negocio reales y comprensión profunda del usuario.'
                    : 'We don\'t do decoration. Every visual decision is anchored in real business goals and deep user understanding.'
                },
                { 
                  icon: <Users size={40} />, 
                  title: lang === 'es' ? 'Colaboración Real' : 'Real Collaboration', 
                  desc: lang === 'es' 
                    ? 'Trabajamos contigo, no solo para ti. Proceso transparente, feedback loops claros y sin jerga innecesaria en cada etapa.'
                    : 'We work with you, not just for you. Transparent process, clear feedback loops, and no unnecessary jargon at every stage.'
                },
                { 
                  icon: <Award size={40} />, 
                  title: lang === 'es' ? 'Craft Sin Concesiones' : 'Uncompromising Craft', 
                  desc: lang === 'es' 
                    ? 'Los detalles importan. Desde la tipografía hasta el tracking de interacción, entregamos trabajo del que realmente nos enorgullecemos.'
                    : 'Details matter. From typography to interaction tracking, we deliver work we are truly proud of.'
                }
              ].map((value, i) => (
                <div key={i} className="p-12 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] transition-all duration-500">
                  <div className="text-[var(--accent)] mb-8">{value.icon}</div>
                  <h3 className="headline text-2xl mb-6">{value.title}</h3>
                  <p className="text-[var(--text3)] leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-32 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="label mb-4">{lang === 'es' ? 'El equipo' : 'The team'}</div>
              <h2 className="display-md text-5xl md:text-7xl">{lang === 'es' ? 'Las personas detrás del trabajo' : 'The people behind the work'}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[var(--border)]">
              {[
                { name: 'Alex Reyes', role: lang === 'es' ? 'Fundador y Director Creativo' : 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', desc: lang === 'es' ? '10 años en diseño de marca. Obsesionado con la tipografía y los sistemas.' : '10 years in brand design. Obsessed with typography and systems.' },
                { name: 'Sara Kovács', role: lang === 'es' ? 'Diseñadora Principal UI/UX' : 'Lead UI/UX Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', desc: lang === 'es' ? 'Especialista en diseño de interacción. Convierte flujos de usuario complejos en experiencias encantadoras.' : 'Interaction design specialist. Turns complex user flows into delightful experiences.' },
                { name: 'Marcus Bell', role: lang === 'es' ? 'Estratega de Marca' : 'Brand Strategist', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', desc: lang === 'es' ? 'MBA + design thinking. Conecta los objetivos de negocio con la ejecución creativa.' : 'MBA + design thinking. Connects business goals with creative execution.' }
              ].map((member, i) => (
                <div key={i} className="bg-[var(--bg)] group">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image src={member.img} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-10">
                    <h3 className="headline text-2xl mb-1">{member.name}</h3>
                    <div className="label text-[10px] text-[var(--accent)] mb-6">{member.role}</div>
                    <p className="text-[var(--text3)] text-sm leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-40 px-6 md:px-12 text-center border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="display-md text-4xl md:text-7xl leading-[1.2]">
              {lang === 'es' 
                ? 'Aprende como si fueras a vivir para siempre, vive como si fueras a morir mañana.'
                : 'Learn as if you were to live forever, live as if you were to die tomorrow.'}
            </h2>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

