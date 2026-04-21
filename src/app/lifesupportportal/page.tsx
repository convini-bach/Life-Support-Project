"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const APP_VERSION = "2604162400"; // YYMMDDHHMM

export default function Home() {
  const { t } = useI18n();

  const apps = [
    {
      id: "nutri-vision",
      name: "Nutri-Vision",
      description: t('portal.nutri_vision.desc'),
      href: "/lifesupportportal/nutri-vision",
      icon: "🥗",
      color: "#10b981",
    }
  ];

  return (
    <main className="container min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: '4rem' }}>
      <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', fontSize: '0.65rem', color: '#475569', zIndex: 10, fontFamily: 'monospace' }}>
        ver.{APP_VERSION}
      </div>
      <header className="text-center mb-16 animate-fade-in" style={{ width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Link href="/lifesupportportal/profile" className="glass-card" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            👤 {t('nav.profile')}
          </Link>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('portal.welcome')}</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{t('portal.subtitle')}</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {apps.map((app) => (
          <Link key={app.id} href={app.href} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1.5rem',
                padding: '1rem',
                background: `rgba(${app.id === 'nutri-vision' ? '16, 185, 129' : '59, 130, 246'}, 0.1)`,
                borderRadius: '16px'
              }}>
                {app.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: app.color }}>{app.name}</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{app.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: '2rem', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                {t('portal.open_app')} <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
        <p style={{ marginBottom: '1rem' }}>{t('portal.footer')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.7rem', opacity: 0.6 }}>
           <Link href="/lifesupportportal/guide" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.guide')}</Link>
           <Link href="/lifesupportportal/legal/tos" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.terms')}</Link>
           <Link href="/lifesupportportal/legal/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.privacy')}</Link>
           <Link href="/lifesupportportal/legal/scta" style={{ color: 'inherit', textDecoration: 'none' }}>特定商取引法</Link>
        </div>
      </footer>

      {/* Background Decor */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'rgba(16, 185, 129, 0.15)',
        filter: 'blur(100px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'rgba(59, 130, 246, 0.15)',
        filter: 'blur(120px)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
    </main>
  );
}
