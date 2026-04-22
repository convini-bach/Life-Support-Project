"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day2() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 2: Goal vs Prompt
        </div>
        <h1>
          {lang === 'ja' ? "第2日目：脱・丸投げ指示（Goal vs Prompt）" : "Day 2: Goal vs Prompt"}
        </h1>
      </header>

      <section>
        <p>想い（ビジョン）を共有できたら、次は実際の「作業の頼み方」のチューニングです。「０から作って」「良い感じにして」という丸投げの指示は、一見楽に見えて、実はAIを一番困らせてしまいます。</p>
        <p>AIが持つ広大な能力をギュッと100%引き出すためには、人間側が具体的な「枠組み」を与える必要があります。この章では、AIに最も響くプロンプトの設計図を学びます。</p>
      </section>

      <hr />

      <section>
        <h2>6. Goal Setting（ゴールセッティング）</h2>
        <p>AIへの指示を出すときに、「何をやるか（How）」ではなく、「どんな結果が欲しいか（What）」を明確に定義することです。</p>
        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          後輩に「この資料の誤字を直して文字を大きくして」と頼むより、「社長に見せても恥ずかしくない、視認性が高く説得力のある企画書にして」と頼む方が、レイアウトの崩れや言葉遣いまで自発的に気を配ってもらえます。
        </blockquote>
        <h3>実践プロンプト例</h3>
        <p><code>「ユーザーが一目で毎月の増減を把握でき、スマホでも見やすい画面を作りたいです。これがゴールです。最適な表示方法を考え、それを実装するコードを書いてください。」</code></p>
      </section>

      <section>
        <h2>7. Output Format（アウトプットフォーマット）</h2>
        <p>AIに返事をしてほしい「形式（見た目）」をきっちりとプロンプト内で指定することです。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「…出力は長文の解説は不要です。【出力形式】1. 修正の要点を1行で、2. 差分だけを2つのコードブロックで提示してください」</code></p>
      </section>

      <section>
        <h2>8. Constraints（制約事項）</h2>
        <p>AIが自由に考えすぎるのを防ぐための「絶対に守らなければならないルール」や「技術的な制限」のことです。</p>
        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「金曜日の夜で飲み会を設定して」と頼むだけでなく、「ただし、予算は一人5000円以内」「絶対に個室であること」と条件の枠をはめるのが制約事項です。
        </blockquote>
      </section>

      <section>
        <h2>9. Negative Prompt（ネガティブプロンプト）</h2>
        <p>「やってほしいこと」の逆で、「絶対に〇〇しないでほしい」というNG行動を明確に伝える指示のことです。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「ネガティブプロンプト：挨拶をしない。修正が不要な箇所への賞賛は不要。既存のコメントアウトを削除しないこと。」</code></p>
      </section>

      <section>
        <h2>10. Few-Shot Prompting（フューショット）</h2>
        <p>ルールで長く説明する代わりに、「お手本」をいくつか見せてパターンを真似させる技術です。言葉で説明しにくい「トーン＆マナー」を伝える際に最強の効果を発揮します。</p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day1" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第1日目へ戻る' : 'Back to Day 1'}
        </Link>
        <Link href="/dictionary/day3" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第3日目へ進む' : 'Go to Day 3'} &rarr;
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>🎁 {lang === 'ja' ? '特典付き・完全版のご案内' : 'Complete Edition'}</h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "このガイドの実践を加速させる「Obsidian専用テンプレート」や「プロンプト集」をパッケージした完全版を note で公開中です。" 
            : "Get the Complete Edition on note.com, including Obsidian templates and prompt collections to accelerate your practice."}
        </p>
        <Link href="https://note.com/convinibach/n/n3b92e13f37d8" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'note で完全版を購入する' : 'Buy Complete Edition on note'}
        </Link>
      </div>
    </div>
  );
}
