"use client";

import Link from "next/link";

export default function RecipeCart() {
  return (
    <main className="container min-h-screen">
      <nav style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link href="/lifesupportportal" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          &larr; ポータルに戻る
        </Link>
      </nav>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Recipe-Cart</h1>
        <p style={{ color: '#94a3b8' }}>不足している栄養を、賢く買い足す。AIがあなたのカートを最適化します。</p>
      </header>

      <section className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🛒</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
          Nutri-Vision での解析結果から、「足りない栄養素」を補うレシピを自動提案。<br />
          必要な食材を無駄なく買い物リストにまとめるスマートカート機能、準備中です。
        </p>
      </section>
    </main>
  );
}
