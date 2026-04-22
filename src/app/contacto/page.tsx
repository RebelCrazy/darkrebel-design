"use client";

import { useState } from "react";
import { ArrowRight, Instagram, Linkedin, Twitter, Dribbble } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { TRANSLATIONS } from "@/lib/translations";

export const runtime = "edge";

export default function Contacto() {
  const { lang } = useAppContext();
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const t = (key: string) => (TRANSLATIONS[lang] as any)[key] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* PAGE HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden border-b border-[var(--border)]">
          <div className="hero-noise opacity-20" />
          <div className="absolute top-1/2 right-0 translate-y-[-50%] translate-x-[20%] display text-[25vw] text-[var(--surface3)] select-none pointer-events-none opacity-20">HELLO</div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="label mb-6 animate-fadein tracking-[0.3em] text-[var(--text3)]">
              {lang === 'es' ? 'Contáctanos' : 'Contact us'}
            </div>
            <h1 className="display mb-8 animate-fadein" style={{ animationDelay: '0.2s' }}>
              {lang === 'es' ? 'HABLEMOS' : 'LET\'S'}<br />
              <span className="text-[var(--accent)]">{lang === 'es' ? 'YA.' : 'TALK.'}</span>
            </h1>
            <p className="body-lg max-w-lg text-[var(--text2)] animate-fadein" style={{ animationDelay: '0.3s' }}>
              {lang === 'es' 
                ? 'Respondemos en 48 horas. Para consultas urgentes, escríbenos directamente a '
                : 'We respond in 48 hours. For urgent inquiries, email us directly at '}
              <a href="mailto:info@darkrebel.store" className="text-[var(--accent)] hover:underline">info@darkrebel.store</a>.
            </p>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section className="py-32 px-6 md:px-12 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
              {/* Info Column */}
              <div className="space-y-16">
                <div>
                  <div className="label mb-6 text-[var(--accent)]">{lang === 'es' ? 'Teléfono' : 'Phone'}</div>
                  <p className="display-md text-3xl md:text-5xl">33 4007 9524</p>
                </div>
                
                <div>
                  <div className="label mb-6 text-[var(--accent)]">{lang === 'es' ? 'Correo' : 'Email'}</div>
                  <p className="display-md text-3xl md:text-5xl">info@darkrebel.store</p>
                </div>

                <div>
                  <div className="label mb-6 text-[var(--accent)]">{lang === 'es' ? 'Ubicación' : 'Location'}</div>
                  <div className="space-y-2">
                    <p className="headline text-2xl">{lang === 'es' ? 'Estudio Remoto' : 'Remote Studio'}</p>
                    <p className="text-[var(--text3)] body-lg">
                      {lang === 'es' ? 'Con base en Jalisco, NYC y Berlín.' : 'Based in Jalisco, NYC and Berlin.'}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="label mb-8 text-[var(--text3)]">{t('footer.follow')}</div>
                  <div className="flex gap-8">
                    <Instagram className="hover:text-[var(--accent)] transition-colors cursor-pointer" size={28} />
                    <Linkedin className="hover:text-[var(--accent)] transition-colors cursor-pointer" size={28} />
                    <Twitter className="hover:text-[var(--accent)] transition-colors cursor-pointer" size={28} />
                    <Dribbble className="hover:text-[var(--accent)] transition-colors cursor-pointer" size={28} />
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="bg-[var(--surface)] border border-[var(--border)] p-10 md:p-20 relative">
                {formStatus === "sent" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg)]/95 z-10 p-10 text-center animate-fadein">
                    <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mb-8">
                      <ArrowRight className="text-black" size={40} />
                    </div>
                    <h2 className="headline text-4xl mb-4">{lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</h2>
                    <p className="text-[var(--text3)] mb-8">
                      {lang === 'es' 
                        ? 'Nos pondremos en contacto contigo en las próximas 48 horas.' 
                        : 'We will get in touch with you within the next 48 hours.'}
                    </p>
                    <button onClick={() => setFormStatus("idle")} className="btn btn-sm">
                      {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                    </button>
                  </div>
                ) : null}

                <h2 className="headline text-4xl md:text-6xl mb-12">{t('contact.title')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label text-[10px] mb-3 block">{t('contact.name')} *</label>
                      <input required type="text" placeholder="Josepe" className="w-full bg-[var(--bg)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--text3)]" />
                    </div>
                    <div>
                      <label className="label text-[10px] mb-3 block">{t('contact.email')} *</label>
                      <input required type="email" placeholder="josepe@empresa.com" className="w-full bg-[var(--bg)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--text3)]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label text-[10px] mb-3 block">{lang === 'es' ? 'Empresa / Marca' : 'Company / Brand'}</label>
                      <input type="text" placeholder={lang === 'es' ? 'Opcional' : 'Optional'} className="w-full bg-[var(--bg)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--text3)]" />
                    </div>
                    <div>
                      <label className="label text-[10px] mb-3 block">{t('contact.service')}</label>
                      <select className="w-full bg-[var(--bg)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all text-[var(--text3)]">
                        <option value="">{lang === 'es' ? 'Selecciona un servicio…' : 'Select a service…'}</option>
                        <option>Identidad de Marca</option>
                        <option>Diseño Web</option>
                        <option>Real Estate Tech</option>
                        <option>Auditoría UI/UX</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label text-[10px] mb-3 block">{t('contact.message')} *</label>
                    <textarea required rows={5} placeholder={lang === 'es' ? 'Cuéntanos sobre tu proyecto...' : 'Tell us about your project...'} className="w-full bg-[var(--bg)] border border-[var(--border)] p-5 focus:border-[var(--accent)] outline-none transition-all resize-none placeholder:text-[var(--text3)]"></textarea>
                  </div>

                  <button type="submit" disabled={formStatus === "sending"} className="btn btn-primary w-full py-6 flex items-center justify-center gap-3">
                    {formStatus === "sending" ? (lang === 'es' ? "Enviando..." : "Sending...") : t('contact.send')} <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
