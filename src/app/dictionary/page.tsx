"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function DictionaryIndex() {
  const { lang } = useI18n();

  const roadmapItems = [
    { day: 'Day 0', title: '準備編：AIの設定場所', slug: 'day0', desc: 'チャット、システム指示、ルールの外部ファイル化。' },
    { day: 'Day 1', title: '想いの同期 (Vision Sync)', slug: 'day1', desc: 'AIに情熱と背景を伝え、同じ船に乗る仲間へと引き上げる。' },
    { day: 'Day 2', title: '目標 vs 指示', slug: 'day2', desc: 'AIへの指示の解像度を上げ、期待通りの成果を得る方法。' },
    { day: 'Day 3', title: 'タスク分解術', slug: 'day3', desc: '巨大な問題をAIが実行可能な小さな単位へ切り分ける。' },
    { day: 'Day 4', title: '成果物へのフィードバック', slug: 'day4', desc: 'AIのアウトプットを共創するための対話テクニック。' },
    { day: 'Day 5', title: '文脈（Context）管理', slug: 'day5', desc: '記憶の混乱を防ぎ、一貫した出力を維持する。' },
    { day: 'Day 6', title: '高度な推論（Reasoning）', slug: 'day6', desc: 'AIに「考えさせて」から「実行させる」黄金律。' },
    { day: 'Day 7', title: 'AIとの共生', slug: 'day7', desc: 'ツールを超えた、一生モノのパートナーシップ。' },
  ];

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '4rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>
          {lang === 'ja' ? "AI実践辞典：7日間ステップアップガイド" : "AI Synergy Dictionary: 7-Day Guide"}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px' }}>
          {lang === 'ja' 
            ? "AIをただの道具で終わらせない。あなたの想いを同期し、最高のパートナーへと育て上げるための実践的トレーニング。" 
            : "Transform AI from a tool to a partner. Synchronize your vision and build a lifelong synergy."}
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {roadmapItems.map((item, index) => (
          <Link 
            key={item.slug} 
            href={`/dictionary/${item.slug}`}
            style={{ 
              display: 'flex', 
              gap: '2rem', 
              padding: '2rem', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '20px', 
              textDecoration: 'none',
              transition: 'transform 0.2s, background 0.2s, border-color 0.2s'
            }}
            className="roadmap-card"
          >
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '15px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              {item.day}
            </div>
            <div>
              <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '30px', border: '1px dashed rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h2 style={{ border: 'none', padding: 0, marginTop: 0, fontSize: '1.5rem', marginBottom: '1rem' }}>
          {lang === 'ja' ? "初めてAIに触れる方向けの辞書の完全版を手に入れませんか？" : "Get the Complete Edition for AI Beginners"}
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "導入としてAI、Gemini、Antigravityの難しい技術用語を慣れ親しんだ例で解説をする「概念の翻訳書」をご準備しました。Obsidian用に活用できるmdファイルを購入特典として活用いただけます。" 
            : "We've prepared a 'Translation of Concepts' that explains difficult technical terms of AI, Gemini, and Antigravity using familiar examples. Includes Obsidian-compatible md files as a bonus."}
        </p>
        <Link 
          href="https://www.amazon.co.jp/dp/B0GY1TCB6C" 
          className="btn-primary" 
          style={{ padding: '1rem 3rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}
        >
          {lang === 'ja' ? "Amazonで購入する（特典付き）" : "Purchase on Amazon"}
        </Link>
      </div>

      <style jsx>{`
        .roadmap-card:hover {
          transform: translateX(10px);
          background: rgba(255,255,255,0.06);
          border-color: rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
}
