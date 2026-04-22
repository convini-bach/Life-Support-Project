"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { glossaryData } from "@/lib/glossaryData";
import ReactMarkdown from "react-markdown";

export default function TermDetail() {
  const { slug } = useParams();
  const { lang } = useI18n();

  const term = glossaryData.find((t) => t.slug === slug);

  if (!term) {
    return (
      <div className="dictionary-content">
        <h1>Term Not Found</h1>
        <Link href="/dictionary/glossary">Back to Glossary</Link>
      </div>
    );
  }

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Dictionary Term
        </div>
        <h1>{term.title}</h1>
      </header>

      <section style={{ 
        background: 'rgba(255,255,255,0.02)', 
        padding: '2.5rem', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.05)',
        lineHeight: '1.8'
      }}>
        <div className="markdown-body">
          <ReactMarkdown>{term.content}</ReactMarkdown>
        </div>
      </section>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/dictionary/glossary" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '用語集一覧に戻る' : 'Back to Glossary'}
        </Link>
      </div>

      <style jsx global>{`
        .markdown-body h3 { 
          color: var(--primary); 
          font-size: 1.2rem; 
          margin-top: 2rem; 
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          display: inline-block;
          padding-bottom: 0.2rem;
        }
        .markdown-body p { margin-bottom: 1.2rem; }
        .markdown-body ul { margin-bottom: 1.5rem; }
        .markdown-body a { color: #60a5fa; text-decoration: none; }
      `}</style>
    </div>
  );
}
