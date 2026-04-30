"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const EXTRA_ITEMS = [
  {
    slug: 'extra-admob',
    title: 'AdMobリワード広告の設置手順',
    titleEn: 'AdMob Rewarded Ads Integration',
    description: 'Webアプリにリワード広告を組み込み、収益化とユーザー体験を両立させる具体的な実装方法。',
    descriptionEn: 'Learn how to integrate rewarded ads into your web app for monetization.',
    icon: '💰'
  },
  {
    slug: 'extra-nvidia',
    title: 'NVIDIA NIMによる高度な最適化',
    titleEn: 'Optimization with NVIDIA NIM',
    description: 'LLMのオフロード技術を活用し、APIコストの削減とレスポンスの高速化を実現する実践手法。',
    descriptionEn: 'Advanced techniques to reduce API costs and improve response speed.',
    icon: '🚀'
  }
];

export default function ExtraIndex() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/dictionary" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          &larr; {lang === 'ja' ? "辞典トップへ戻る" : "Back to Dictionary"}
        </Link>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
          {lang === 'ja' ? "技術補足：実践応用編" : "Technical Extra: Advanced Practice"}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {lang === 'ja' 
            ? "AIエージェントを実際のプロダクトとして運用するための、収益化と最適化の知恵袋。" 
            : "Insights on monetization and optimization for running AI agents as products."}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {EXTRA_ITEMS.map((item) => (
          <Link key={item.slug} href={`/dictionary/${item.slug}`} style={{ textDecoration: 'none' }}>
            <div className="extra-card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.4rem', color: 'white', margin: '0 0 0.5rem 0', border: 'none', padding: 0 }}>
                  {lang === 'ja' ? item.title : item.titleEn}
                </h2>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {lang === 'ja' ? item.description : item.descriptionEn}
                </p>
              </div>
              <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>&rarr;</div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .extra-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .extra-card:hover {
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.3);
          transform: translateX(10px);
        }
        @media (max-width: 640px) {
          .extra-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
