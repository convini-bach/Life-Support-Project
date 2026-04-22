"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function TabNavigation() {
  const pathname = usePathname();
  const { t } = useI18n();

  const tabs = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.meal'), href: '/nutri-vision' },
    { label: t('nav.history'), href: '/nutri-vision/history' },
    { label: t('nav.profile'), href: '/profile' },
  ];

  return (
    <nav style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10, 15, 28, 0.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
        {tabs.map(tab => {
          // exact match for sub-pages or exact match for base paths
          const isActive = pathname === tab.href;
          
          return (
            <Link 
              key={tab.href} 
              href={tab.href} 
              style={{
                flex: 1, textAlign: 'center', padding: '1rem', textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: 'bold', transition: 'all 0.3s',
                color: isActive ? 'var(--primary)' : '#64748b',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                position: 'relative'
              }}
            >
              {tab.label}
              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 0, left: '20%', right: '20%',
                  height: '2px', background: 'var(--primary)', 
                  boxShadow: '0 0 10px var(--primary)'
                }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
