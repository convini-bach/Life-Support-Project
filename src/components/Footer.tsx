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
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          maxWidth: '600px'
        }}>
          <p style={{ marginBottom: '1rem' }}>&copy; 2026 Life Support AI Ecosystem. All rights reserved.</p>
          <p>{t('portal.footer')}</p>
        </div>
      </div>
    </footer>
  );
}
