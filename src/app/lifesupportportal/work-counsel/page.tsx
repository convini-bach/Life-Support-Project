"use client";

import Link from "next/link";

export default function WorkCounsel() {
  return (
    <main className="container min-h-screen">
      <nav style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link href="/lifesupportportal" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          &larr; ポータルに戻る
        </Link>
      </nav>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Work-Counsel</h1>
        <p style={{ color: '#94a3b8' }}>働くことは、生きること。あなたのキャリアのリズムをAIが診断します。</p>
      </header>

      <section className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>💼</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
          今の仕事の満足度は？ 将来へのキャリア不安は？<br />
          伴走者としてのAIがあなたの強みとリスクを「映し出し」、より健やかな働き方を提案する専門カウンセリング機能、準備中です。
        </p>
      </section>
    </main>
  );
}
