"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer style={{
      marginTop: 'auto',
      padding: '4rem 2rem 6rem',
      background: 'rgba(10, 15, 28, 0.5)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      width: '100%',
      color: '#64748b'
    }}>
      <div className="container" style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          fontSize: '0.85rem'
        }}>
          <Link href="/lifesupportportal/guide" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>{t('nav.guide')}</Link>
          <Link href="/lifesupportportal/legal/tos" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('nav.tos')}</Link>
          <Link href="/lifesupportportal/legal/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t('nav.privacy')}</Link>
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          maxWidth: '600px'
        }}>
          <p style={{ marginBottom: '1rem' }}>&copy; 2026 Life Support AI Ecosystem. All rights reserved.</p>
          <p style={{ marginBottom: '0.5rem' }}>{t('portal.footer')}</p>
          <div style={{ marginTop: '1.5rem', opacity: 0.4 }}>
            <Link href="/lifesupportportal/legal/scta" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.65rem' }}>{t('nav.scta')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
