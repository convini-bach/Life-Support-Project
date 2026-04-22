"use client";

import Link from "next/link";
import AffiliateCard from "@/components/AffiliateCard";
import { getRecommendations } from "@/lib/recommendation";


export default function SumaiCheck() {
  const recommendation = getRecommendations('housing')[0];

  return (
    <main className="container min-h-screen">
      <nav style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          &larr; ポータルに戻る
        </Link>
      </nav>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Sumai-Check</h1>
        <p style={{ color: '#94a3b8' }}>住まいのコストは、人生を支える土台。そのバランスを確認しましょう。</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <section className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🏠</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
            住宅ローン、賃貸、将来の修繕費...。<br />
            住まいに関する複雑なコストをAIが整理し、あなたのライフプランに合わせた「最適な住み方」を提案する機能、準備中です。
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
             🛡️ 点検とあわせて備えたいアイテム
          </h3>
          {recommendation && (
            <AffiliateCard 
              item={recommendation} 
              label="住まいの安全におすすめ"
            />
          )}
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
            本格的なコスト診断が始まる前に、まずは基本的な住まいの安全（防災・防火）から見直してみませんか？
          </p>
        </section>
      </div>

    </main>
  );
}
