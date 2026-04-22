"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { glossaryData } from "@/lib/glossaryData";

export default function GlossaryIndex() {
  const { lang } = useI18n();

  // Sort and group by first letter (using title)
  const grouped = glossaryData.reduce((acc, term) => {
    const firstChar = term.title.charAt(0).toUpperCase();
    if (!acc[firstChar]) acc[firstChar] = [];
    acc[firstChar].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryData>);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '4rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          AI Dictionary Index
        </div>
        <h1>
          {lang === 'ja' ? "用語集：A to Z" : "Glossary: A to Z"}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {lang === 'ja' 
            ? "このプロジェクトやAIの世界で使われる重要な用語を解説します。" 
            : "Key terms and concepts used in this project and the AI world."}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
        {letters.map((letter) => (
          <div key={letter} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ border: 'none', padding: 0, marginTop: 0, marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.5rem' }}>
              {letter}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {grouped[letter].map((term) => (
                <Link 
                  key={term.slug} 
                  href={`/dictionary/term/${term.slug}`}
                  style={{ 
                    color: '#cbd5e1', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    padding: '0.3rem 0',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                >
                  {term.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/dictionary" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '実践辞典トップへ戻る' : 'Back to Dictionary Top'}
        </Link>
      </div>
    </div>
  );
}
