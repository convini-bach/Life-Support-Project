"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import TabNavigation from "@/components/TabNavigation";


export default function ArticlesIndex() {
  const { lang, t } = useI18n();

  const articles = [
    {
      slug: "kidney-and-salt",
      title: lang === 'ja' ? "37歳、要再検査からの再出発。塩分管理に AI が必要な理由" : "Restarting after a 37-year-old health report. Why AI is needed for salt management",
      excerpt: lang === 'ja' 
        ? "「自分は健康だ」という過信が崩れた日。見えない敵である『塩分』を可視化することの重要性を、実体験から語ります。"
        : "The day overconfidence in health crumbled. Speaking from experience on the importance of visualizing the invisible enemy: salt.",
      date: "2026-04-21",
      category: lang === 'ja' ? "健康管理" : "Health",
      color: "#ef4444"
    },
    {
      slug: "meal-logging-tips",
      title: lang === 'ja' ? "AI 解析の精度を 2 倍にする！食事写真の撮り方 5 つのコツ" : "Double Your AI Analysis Accuracy! 5 Tips for Taking Food Photos",
      excerpt: lang === 'ja'
        ? "AIコーチをあなたの最強の味方にするために。判定ミスを減らし、より正確なアドバイスを引き出すための撮影テクニック。"
        : "To make your AI coach your strongest ally. Shooting techniques to reduce misjudgments and get more accurate advice.",
      date: "2026-04-20",
      category: lang === 'ja' ? "アプリ活用" : "App Tips",
      color: "#10b981"
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '8rem' }}>
      <TabNavigation />
      
      <main className="container" style={{ paddingTop: '8.5rem', maxWidth: '1000px' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Knowledge Hub
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            {lang === 'ja' ? "あなたの健やかな人生を支える、AI活用のヒントと健康の知恵。" : "Tips on AI usage and health wisdom to support your healthy life."}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card animate-fade-in" style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '2.5rem',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s, border-color 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '0.3rem 0.8rem', 
                  background: `rgba(${article.slug === 'kidney-and-salt' ? '239, 68, 68' : '16, 185, 129'}, 0.1)`, 
                  color: article.color,
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem'
                }}>
                  {article.category}
                </div>
                
                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {article.title}
                </h2>
                
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  {article.excerpt}
                </p>
                
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{article.date}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Read More &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
