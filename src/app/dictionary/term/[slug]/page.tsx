"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { glossaryData } from "@/lib/glossaryData";
import ReactMarkdown from "react-markdown";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function TermDetail() {
  const { slug } = useParams();
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

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

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          {lang === 'ja' ? '初めてAIに触れる方向けの辞書の完全版を手に入れませんか？' : 'Get the Complete Edition for AI Beginners'}
        </h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "導入としてAI、Gemini、Antigravityの難しい技術用語を慣れ親しんだ例で解説をする「概念の翻訳書」をご準備しました。Obsidian用に活用できるmdファイルを購入特典として活用いただけます。" 
            : "We've prepared a 'Translation of Concepts' that explains difficult technical terms of AI, Gemini, and Antigravity using familiar examples."}
        </p>
        
        {bookRecommendation && (
          <AffiliateCard 
            item={bookRecommendation} 
            label={lang === 'ja' ? "購入特典（mdファイル）付き" : "Includes Bonus MD Files"}
          />
        )}
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
