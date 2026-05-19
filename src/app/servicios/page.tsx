"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, Infinity as InfinityIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const services = [
  {
    id: 'p1', name: 'Paquete de Identidad de Marca', cat: 'Branding', price: 299, oldPrice: 399,
    desc: 'Sistema completo: logo, colores, tipografía y guías.',
    badge: 'Popular', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80'
  },
  {
    id: 'p2', name: 'Diseño Web — Landing Page', cat: 'Web Design', price: 199,
    desc: 'Diseño de página de aterrizaje personalizada con enfoque mobile-first.',
    badge: '', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80'
  },
  {
    id: 'p3', name: 'Auditoría UI/UX', cat: 'Consulting', price: 149,
    desc: 'Auditoría completa de interfaz con recomendaciones accionables.',
    badge: 'Nuevo', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80'
  },
  {
    id: 'p4', name: 'Diseño Web Completo', cat: 'Web Design', price: 799, oldPrice: 999,
    desc: 'Diseño de sitio web multi-página: hasta 8 páginas responsivas.',
    badge: 'Mejor Valor', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
  {
    id: 'p5', name: 'Kit de Redes Sociales', cat: 'Branding', price: 99,
    desc: 'Plantillas editables para Instagram, LinkedIn y Twitter/X.',
    badge: '', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'
  },
  {
    id: 'p6', name: 'Real Estate Tech - Portal', cat: 'Web Design', price: 1200,
    desc: 'Plataforma especializada para inmobiliarias con integración CRM.',
    badge: 'Pro', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
  },
];

export default function Servicios() {
  const { lang } = useAppContext();
  const [filter, setFilter] = useState('Todos');
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  const [shopServices, setShopServices] = useState<any[]>(services);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await client.fetch(`*[_type == "service" && !(_id in drafts)] | order(order asc)`);
        if (data && data.length > 0) {
          const categoryMap: Record<string, string> = {
            'branding': 'Branding',
            'web': 'Web Design',
            'uiux': 'Consulting',
            'social': 'Branding',
            'realestate': 'Web Design'
          };
          const mappedServices = data.map((service: any) => ({
            id: service._id,
            name: service.title,
            cat: categoryMap[service.category] || 'Web Design',
            price: service.price?.from || 0,
            desc: service.description,
            badge: service.featured ? 'Destacado' : '',
            img: service.image ? urlFor(service.image).url() : 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80'
          }));
          setShopServices(mappedServices);
        }
      } catch (error) {
        console.error("Failed to fetch services from Sanity, using fallback:", error);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = filter === 'Todos' ? shopServices : shopServices.filter(s => s.cat === filter);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* PAGE HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden border-b border-[var(--border)]">
          <div className="hero-noise opacity-20" />
          <div className="absolute top-1/2 right-0 translate-y-[-50%] translate-x-[20%] display text-[25vw] text-[var(--surface3)] select-none pointer-events-none opacity-20">SHOP</div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="label mb-6 animate-fadein tracking-[0.3em] text-[var(--text3)]">
              {lang === 'es' ? 'Lo que ofrecemos' : 'What we offer'}
            </div>
            <h1 className="display mb-8 animate-fadein" style={{ animationDelay: '0.2s' }}>
              {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}<br />
              {lang === 'es' ? 'Y' : '&'} <span className="text-[var(--accent)]">{lang === 'es' ? 'PAQUETES.' : 'PACKAGES.'}</span>
            </h1>
            <p className="body-lg max-w-lg text-[var(--text2)] animate-fadein" style={{ animationDelay: '0.3s' }}>
              {lang === 'es' 
                ? 'Paquetes a precio fijo diseñados para mayor claridad. Elige lo que necesitas y comenzamos a trabajar.'
                : 'Fixed-price packages designed for clarity. Choose what you need and we start working.'}
            </p>
          </div>
        </section>

        {/* SHOP SECTION */}
        <section className="py-24 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-16">
              {['Todos', 'Branding', 'Web Design', 'Consulting'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  className={`px-8 py-3 label text-[10px] border transition-all ${filter === f ? 'bg-[var(--accent)] border-[var(--accent)] text-black' : 'border-[var(--border)] hover:border-[var(--text3)]'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-[var(--border)]">
              {filteredServices.map((service, i) => (
                <div key={service.id} className="bg-[var(--bg)] group border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden bg-[var(--surface2)]">
                    <Image src={service.img} alt={service.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                    {service.badge && (
                      <div className="absolute top-6 left-6 bg-[var(--accent)] text-black px-4 py-1 label text-[9px]">{service.badge}</div>
                    )}
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="label text-[10px] text-[var(--text3)] mb-4 tracking-widest">{service.cat}</div>
                    <h3 className="headline text-2xl mb-4 group-hover:text-[var(--accent)] transition-colors">{service.name}</h3>
                    <p className="text-[var(--text3)] text-sm mb-8 line-clamp-2">{service.desc}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-3xl headline text-[var(--accent)]">
                        ${service.price}
                        {(service as any).oldPrice && <span className="text-sm text-[var(--text3)] line-through ml-3">${(service as any).oldPrice}</span>}
                      </div>
                      <Link href="/contacto" className="w-12 h-12 border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-all">
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US SECTION */}
        <section className="py-32 px-6 md:px-12 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="label mb-4">{lang === 'es' ? 'Por qué Dark Rebel' : 'Why Dark Rebel'}</div>
            <h2 className="display-md text-5xl md:text-7xl mb-16">
              {lang === 'es' ? 'Sin sorpresas. Solo' : 'No surprises. Just'} <span className="text-[var(--accent)]">{lang === 'es' ? 'resultados.' : 'results.'}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { 
                  num: '01', 
                  title: lang === 'es' ? 'Precios fijos' : 'Fixed Pricing', 
                  desc: lang === 'es' 
                    ? 'Lo que ves es lo que pagas. Sin cargos ocultos ni sorpresas en la facturación final.' 
                    : 'What you see is what you pay. No hidden fees or surprises on the final invoice.', 
                  icon: <Star /> 
                },
                { 
                  num: '02', 
                  title: lang === 'es' ? 'Entrega rápida' : 'Fast Delivery', 
                  desc: lang === 'es' 
                    ? 'Respetamos tus plazos. Compromisos de entrega claros acordados antes de iniciar.' 
                    : 'We respect your deadlines. Clear delivery commitments agreed upon before starting.', 
                  icon: <Clock /> 
                },
                { 
                  num: '03', 
                  title: lang === 'es' ? 'Revisiones ilimitadas' : 'Unlimited Revisions', 
                  desc: lang === 'es' 
                    ? 'No contamos rondas. Iteramos hasta que el trabajo sea perfecto para tu marca.' 
                    : 'We don\'t count rounds. We iterate until the work is perfect for your brand.', 
                  icon: <InfinityIcon /> 
                }
              ].map((item, i) => (
                <div key={i} className="space-y-6">
                  <div className="display-md text-6xl text-[var(--accent)] opacity-20">{item.num}</div>
                  <h3 className="headline text-2xl">{item.title}</h3>
                  <p className="text-[var(--text3)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
