"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer style={{ 
      marginTop: '8rem', 
      padding: '5rem 0', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(255,255,255,0.01)'
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '3rem',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Project Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem' }}>Life Support Hub</h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6' }}>
            {lang === 'ja' 
              ? "AIの力で、自分と大切な人を守るための健康の主権を個人の手に。創設者の情熱から生まれたプロジェクトです。"
              : "Empowering individuals to regain health sovereignty with AI. A project born from the founder's passion."}
          </p>
        </div>

        {/* Application Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Application</h4>
          <Link href="/nutri-vision" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>🥗 Nutri-Vision</Link>
          <Link href="/sumai-check" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>🏠 Sumai-Check</Link>
          <Link href="/hoken-mirror" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>🛡️ Hoken-Mirror</Link>
        </div>

        {/* Resources & Story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Resources</h4>
          <Link href="/about" style={{ color: '#10b981', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 'bold' }}>📖 {lang === 'ja' ? '私たちの物語' : 'Our Story'}</Link>
          <Link href="/articles" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>💡 {lang === 'ja' ? '知識のハブ' : 'Articles'}</Link>
          <Link href="/dictionary" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>🎨 {lang === 'ja' ? 'AI実践辞典' : 'AI Dictionary'}</Link>
          <Link href="/guide" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>📘 {t('nav.guide')}</Link>
        </div>

        {/* Legal & Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Legal</h4>
          <Link href="/legal/privacy" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>{t('nav.privacy')}</Link>
          <Link href="/legal/tos" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>{t('nav.terms')}</Link>
          <Link href="/legal/scta" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>{t('nav.scta')}</Link>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScGmzoQL3ZJehCoSVYBoPB0lv9LkrsHAKzi3AjhIb8SE20h3g/viewform?usp=header" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>

      <div style={{ 
        marginTop: '4rem', 
        textAlign: 'center', 
        color: '#475569', 
        fontSize: '0.75rem',
        paddingTop: '3rem',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}>
        <p>&copy; 2026 Life Support Project - Empowering Human Sovereignty with AI</p>
      </div>
    </footer>
  );
}
