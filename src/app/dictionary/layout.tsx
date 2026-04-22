"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


const MENU_ITEMS = [
  { slug: '', title: 'Roadmap', titleJa: '目次・全体像' },
  { slug: 'day0', title: 'Day 0', titleJa: '準備編：設定場所' },
  { slug: 'day1', title: 'Day 1', titleJa: '想いの同期 (Vision Sync)' },
  { slug: 'day2', title: 'Day 2', titleJa: '目標 vs 指示' },
  { slug: 'day3', title: 'Day 3', titleJa: 'タスク分解術' },
  { slug: 'day4', title: 'Day 4', titleJa: '成果物へのFB' },
  { slug: 'day5', title: 'Day 5', titleJa: '文脈（Context）管理' },
  { slug: 'day6', title: 'Day 6', titleJa: '高度な推論（Reasoning）' },
  { slug: 'day7', title: 'Day 7', titleJa: 'AIとの共生' },
  { slug: 'epilogue', title: 'Conclusion', titleJa: 'おわりに' },
  { slug: 'glossary', title: 'Glossary (A-Z)', titleJa: '用語集 (A-Z)' },
];

export default function DictionaryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useI18n();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TabNavigation />
      
      <div className="container" style={{ paddingTop: '8.5rem', display: 'flex', gap: '3rem', position: 'relative' }}>
        {/* Desktop Sidebar */}
        <aside style={{ 
          width: '260px', 
          position: 'sticky', 
          top: '8.5rem', 
          height: 'calc(100vh - 10rem)', 
          overflowY: 'auto',
          display: 'none', // Shown on desktop via media query or similar logic (simplified here)
          flexDirection: 'column',
          gap: '0.5rem',
          paddingRight: '1rem',
          borderRight: '1px solid rgba(255,255,255,0.05)'
        }} className="desktop-only-sidebar">
          <div style={{ marginBottom: '1.5rem', paddingLeft: '0.8rem' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              AI実践辞典 (7日間)
            </h2>
          </div>
          {MENU_ITEMS.map((item) => {
            const href = `/dictionary${item.slug ? '/' + item.slug : ''}`;
            const isActive = pathname === href;
            return (
              <Link 
                key={item.slug} 
                href={href}
                style={{
                  display: 'block',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  color: isActive ? 'white' : '#94a3b8',
                  background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  fontWeight: isActive ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent'
                }}
              >
                {lang === 'ja' ? item.titleJa : item.title}
              </Link>
            )
          })}
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .desktop-only-sidebar {
            display: flex !important;
          }
        }
        .dictionary-content h1 { font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 2rem; }
        .dictionary-content h2 { font-size: 1.8rem; font-weight: bold; color: white; margin-top: 3rem; margin-bottom: 1.5rem; border-left: 4px solid var(--primary); padding-left: 1.5rem; }
        .dictionary-content h3 { font-size: 1.3rem; font-weight: bold; color: #f1f5f9; margin-top: 2rem; margin-bottom: 1rem; }
        .dictionary-content p { line-height: 1.9; color: #cbd5e1; margin-bottom: 1.5rem; font-size: 1.05rem; }
        .dictionary-content ul, .dictionary-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; color: #cbd5e1; }
        .dictionary-content li { margin-bottom: 0.8rem; line-height: 1.6; }
        .dictionary-content blockquote { border-left: 4px solid #334155; padding: 1rem 1.5rem; margin: 2rem 0; background: rgba(255,255,255,0.02); border-radius: 8px; font-style: italic; }
        .dictionary-content hr { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 3rem 0; }
        .dictionary-content code { background: #1e293b; padding: 0.2rem 0.4rem; borderRadius: 4px; color: #fb7185; }
      `}</style>

    </div>
  );
}
