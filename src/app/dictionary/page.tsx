"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function DictionaryIndex() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {lang === 'ja' ? "AI実践辞典：共創のライブラリ" : "AI Synergy Dictionary: Co-creation Library"}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          {lang === 'ja' 
            ? "AIをただの道具で終わらせない。基礎から高度な実装まで、あなたの想いを形にするための知識体系。" 
            : "Transform AI from a tool to a partner. From basics to advanced implementation."}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        {/* Category 1: 7-Day Roadmap */}
        <div className="portal-card main-feature" style={{ gridColumn: '1 / -1' }}>
          <div className="card-content">
            <div className="card-header">
              <span className="badge">Recommended</span>
              <h2>{lang === 'ja' ? "7日間ステップアップガイド" : "7-Day Step-Up Guide"}</h2>
              <p>{lang === 'ja' ? "AIを最高のパートナーへと育て上げるための集中トレーニング。" : "Intensive training to build a perfect synergy with AI."}</p>
            </div>
            <div className="roadmap-grid">
              {[
                { day: '0', title: '準備' }, { day: '1', title: '同期' }, { day: '2', title: '指示' }, { day: '3', title: '分解' },
                { day: '4', title: '対話' }, { day: '5', title: '文脈' }, { day: '6', title: '推論' }, { day: '7', title: '共生' }
              ].map(d => (
                <Link key={d.day} href={`/dictionary/day${d.day}`} className="day-bubble">
                  <span className="day-num">{d.day}</span>
                  <span className="day-label">{d.title}</span>
                </Link>
              ))}
            </div>
            <Link href="/dictionary/day0" className="btn-primary-outline" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
              {lang === 'ja' ? "最初から始める" : "Start from Day 0"} &rarr;
            </Link>
          </div>
        </div>

        {/* Category 2: Glossary */}
        <Link href="/dictionary/glossary" className="portal-card secondary" style={{ textDecoration: 'none' }}>
          <div className="card-content">
            <div className="icon">📖</div>
            <h3>{lang === 'ja' ? "AI用語辞典 (A to Z)" : "AI Glossary (A to Z)"}</h3>
            <p>{lang === 'ja' ? "AIの世界で使われる重要な概念を、身近な例え話でわかりやすく解説。" : "Key concepts explained with familiar analogies."}</p>
            <span className="link-text">{lang === 'ja' ? "用語を見る" : "View Terms"} &rarr;</span>
          </div>
        </Link>

        {/* Category 3: Technical Extra */}
        <div className="portal-card secondary">
          <div className="card-content">
            <div className="icon">🛠️</div>
            <h3>{lang === 'ja' ? "技術補足：実践応用編" : "Technical Extra"}</h3>
            <p>{lang === 'ja' ? "AdMobでの収益化や、NVIDIA NIMを活用した高度なトークン削減術など。" : "Monetization with AdMob and token saving with NVIDIA NIM."}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              <Link href="/dictionary/extra-admob" className="sub-link">
                • {lang === 'ja' ? "AdMobリワード広告の設置" : "AdMob Integration Guide"}
              </Link>
              <Link href="/dictionary/extra-nvidia" className="sub-link">
                • {lang === 'ja' ? "NVIDIA NIMによる効率化" : "NVIDIA NIM Token Saving"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Book Affiliate */}
      <div style={{ marginTop: '5rem', padding: '4rem 3rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '40px', border: '1px dashed rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h2 style={{ border: 'none', padding: 0, marginTop: 0, fontSize: '1.8rem', marginBottom: '1rem' }}>
          {lang === 'ja' ? "本辞典の「完全版」を、あなたの手元に。" : "Get the 'Complete Edition' in your hands."}
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          {lang === 'ja' 
            ? "このサイトの全ての知見に加え、AIとの対話そのものを変える「概念の翻訳書」を。Obsidianなどで活用できるMarkdownファイルも同梱しています。" 
            : "The ultimate guide to transform your AI synergy. Includes Markdown files for Obsidian."}
        </p>
        
        {bookRecommendation && (
          <AffiliateCard 
            item={bookRecommendation} 
            label={lang === 'ja' ? "購入特典（mdファイル）付き" : "Includes Bonus MD Files"}
          />
        )}
      </div>

      <style jsx>{`
        .portal-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 30px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }
        .portal-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.06);
          border-color: rgba(16, 185, 129, 0.3);
        }
        .card-content {
          padding: 2.5rem;
        }
        .badge {
          display: inline-block;
          background: var(--primary);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .main-feature h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        .roadmap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        .day-bubble {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 0.5rem;
          transition: transform 0.2s;
        }
        .day-bubble:hover {
          transform: scale(1.1);
        }
        .day-num {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          alignItems: center;
          justifyContent: center;
          color: var(--primary);
          font-weight: bold;
        }
        .day-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        .secondary h3 {
          font-size: 1.4rem;
          color: white;
          margin-bottom: 1rem;
        }
        .link-text {
          display: inline-block;
          margin-top: 1.5rem;
          color: var(--primary);
          font-weight: bold;
        }
        .sub-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .sub-link:hover {
          color: var(--primary);
        }
        .btn-primary-outline {
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 0.6rem 1.5rem;
          border-radius: 20px;
          font-weight: bold;
          transition: all 0.2s;
        }
        .btn-primary-outline:hover {
          background: var(--primary);
          color: white;
        }
      `}</style>
    </div>
  );
}
