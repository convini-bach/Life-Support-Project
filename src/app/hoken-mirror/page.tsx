"use client";

import Link from "next/link";
import { useState } from "react";

export default function HokenMirror() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <main className="container min-h-screen">
      <nav style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          &larr; ポータルに戻る
        </Link>
      </nav>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Hoken-Mirror</h1>
        <p style={{ color: '#94a3b8' }}>その保険は、今のあなたを正しく映していますか？</p>
      </header>

      <section className="glass-card animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>簡易保険ミラーリング診断</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>月々の支払い保険料 (合計)</label>
            <input type="number" placeholder="15,000" style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginTop: '0.4rem' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>最も心配なリスクは？</label>
            <select style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', marginTop: '0.4rem' }}>
              <option>万が一の死亡保障</option>
              <option>病気やケガによる入院</option>
              <option>老後の生活資金</option>
              <option>子供の教育資金</option>
            </select>
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setIsAnalyzing(true)}
          style={{ width: '100%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}
        >
          {isAnalyzing ? "診断内容を分析中..." : "ミラーリング診断を実行"}
        </button>
        {isAnalyzing && (
          <div className="animate-fade-in" style={{ marginTop: '2rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <p>※現在はプレビュー版です。AIがあなたの状況をミラーリングしています...</p>
          </div>
        )}
      </section>
    </main>
  );
}
