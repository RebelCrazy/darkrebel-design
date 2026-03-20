"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navSections = [
  {
    label: 'PRINCIPAL',
    items: [
      { href: '/dashboard',           label: 'Dashboard',         icon: '⬛', badge: null },
      { href: '/admin/proyectos',     label: 'Proyectos',         icon: '🔗', badge: '3'  },
      { href: '/admin/crm',           label: 'CRM de Clientes',   icon: '👥', badge: '8'  },
      { href: '/admin/tareas',        label: 'Gestor de Tareas',  icon: '✅', badge: '12' },
    ]
  },
  {
    label: 'PLANTILLAS',
    items: [
      { href: '/admin/cotizaciones',  label: 'Cotizaciones',      icon: '💰', badge: null },
      { href: '/admin/recursos',      label: 'Modelos de Brief',  icon: '📋', badge: null },
      { href: '/admin/contratos',     label: 'Contratos',         icon: '📄', badge: null },
    ]
  },
  {
    label: 'EQUIPO',
    items: [
      { href: '/admin/colaboradores', label: 'Colaboradores',     icon: '🤝', badge: null },
    ]
  }
];

const pageTitles: Record<string, string> = {
  '/dashboard':             'Dashboard',
  '/admin/proyectos':       'Portal de Cliente',
  '/admin/crm':             'CRM de Clientes',
  '/admin/tareas':          'Gestor de Tareas',
  '/admin/cotizaciones':    'Cotizaciones',
  '/admin/recursos':        'Modelos de Brief',
  '/admin/contratos':       'Contratos',
  '/admin/colaboradores':   'Colaboradores',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Panel';

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* SIDEBAR */}
      <nav style={{
        width: 'var(--sidebar-w)', flexShrink: 0,
        background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, background: 'var(--accent)',
              borderRadius: 8, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 16
            }}>⚡</div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>
              Dark<span style={{ color: 'var(--accent)' }}>Rebel</span>
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono', letterSpacing: '0.05em', paddingLeft: 42 }}>
            sistema de gestión
          </div>
        </div>

        {/* Nav */}
        {navSections.map(section => (
          <div key={section.label} style={{ padding: '20px 12px 8px' }}>
            <div style={{
              fontSize: 10, fontFamily: 'DM Mono', color: 'var(--text3)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0 8px', marginBottom: 6
            }}>{section.label}</div>
            {section.items.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href as any}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8, marginBottom: 1,
                    textDecoration: 'none', fontSize: 13.5,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--accent)' : 'var(--text2)',
                    background: isActive ? 'var(--accent-dim)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                    transition: 'all 0.15s',
                    position: 'relative'
                  }}
                >
                  <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: isActive ? 'var(--accent-dim)' : 'var(--surface3)',
                      color: isActive ? 'var(--accent)' : 'var(--text3)',
                      fontSize: 10, fontFamily: 'DM Mono',
                      padding: '2px 6px', borderRadius: 20,
                      border: '1px solid var(--border)'
                    }}>{item.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 'auto', padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <Link href="/admin/login" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
            transition: 'background 0.15s'
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--green))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#000', flexShrink: 0
            }}>DR</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)' }}>Dark Rebel Studio</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Administrador</div>
            </div>
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* TOPBAR */}
        <div style={{
          height: 56, borderBottom: '1px solid var(--border)',
          background: 'var(--surface)', display: 'flex',
          alignItems: 'center', padding: '0 28px', gap: 16, flexShrink: 0
        }}>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', flex: 1 }}>
            {title}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: 'transparent', color: 'var(--text2)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '7px 12px', fontSize: 14
            }}>🔔</button>
            <button style={{
              background: 'var(--accent)', color: '#000',
              fontWeight: 600, borderRadius: 8,
              padding: '7px 16px', fontSize: 12.5
            }}>+ Nuevo</button>
          </div>
        </div>
        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 48px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
