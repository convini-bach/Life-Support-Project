"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day2() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

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
        <h3>一言でいうと？</h3>
        <p>AIへの指示を出すときに、「何をやるか（How）」ではなく、「どんな結果が欲しいか（What）」を明確に定義することです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>「やり方」を指定してしまうと、AIはあなたの思いついた手段の中でしか動けません。「ゴール」を渡せば、AIが持つ膨大な知識の中から「もっと効率的で優れた方法」を逆算して提案してくれるようになります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          後輩に「この資料の誤字を直して文字を大きくして」と頼むより、「社長に見せても恥ずかしくない、視認性が高く説得力のある企画書にして」と頼む方が、レイアウトの崩れや言葉遣いまで自発的に気を配ってもらえます。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「ユーザーが一目で毎月の増減を把握でき、スマホでも見やすい画面を作りたいです。これがゴールです。最適な表示方法を考え、それを実装するコードを書いてください。」</code></p>
      </section>

      <section>
        <h2>7. Output Format（アウトプットフォーマット）</h2>
        <h3>一言でいうと？</h3>
        <p>AIに返事をしてほしい「形式（見た目）」をきっちりとプロンプト内で指定することです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIはサービス精神が旺盛なので、放っておくと長文で返してきます。出力形式を指定することで、人間が読む負担を減らし、コピペなどの後続作業を何倍も楽にすることができます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          カレーのレシピを聞くとき、「材料を教えて」と聞くと文章で返ってきますが、「スーパーで買いやすい順に、箇条書きのリスト形式で教えて」と頼むと、そのまま買い物メモとして使えます。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「…出力は長文の解説は不要です。【出力フォーマット】1. 修正の要点を1行で、2. 差分だけを2つのコードブロックで提示してください」</code></p>
      </section>

      <section>
        <h2>8. Constraints（制約事項）</h2>
        <h3>一言でいうと？</h3>
        <p>AIが自由に考えすぎるのを防ぐための「絶対に守らなければならないルール」や「技術的な制限」のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは放っておくと最新で複雑な技術を使いたがる傾向があります。「制約」とは、AIの足に重りをつけるのではなく、あなたの歩幅に合わせて走らせるための手綱です。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          飲み会を設定してもらうときに、「金曜日の夜で」と頼むだけでなく、「予算は一人5000円以内」「絶対に個室であること」と条件の枠をはめるのが制約事項です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「会員登録機能を作ってください。ただし、【制約事項】として、複雑なデータベースは使用せず、ブラウザ保存（Local Storage）のみで完結させてください。」</code></p>
      </section>

      <section>
        <h2>9. Negative Prompt（ネガティブプロンプト）</h2>
        <h3>一言でいうと？</h3>
        <p>「やってほしいこと」の逆で、「絶対に〇〇しないでほしい」というNG行動を明確に伝える指示のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>開発が進むと、AIの丁寧すぎる挨拶すらノイズになります。やってほしくない事を明文化することで、コミュニケーションの無駄を極限まで減らします。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          美容室で「ショートカットにしてください」と頼むだけでなく、「ただし、前髪だけは絶対に切らないで！」と釘を刺しておくことです。これがないと、美容師さんの良かれと思ったアレンジが入ってしまいます。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「ネガティブプロンプト：挨拶をしない。修正が不要な箇所への賞賛は不要。既存のコメントアウトを削除しないこと。」</code></p>
      </section>

      <section>
        <h2>10. Few-Shot Prompting（フューショット）</h2>
        <h3>一言でいうと？</h3>
        <p>ルールで長く説明する代わりに、「お手本」をいくつか見せてパターンを真似させる技術です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>デザインの色調や文章のトーンなど、「言葉で説明しにくいもの」を伝える際に最強の効果を発揮します。例を少し見せるだけで、出力精度が飛躍的に高まります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「キャッチーな感じで議事録を書いて」と教えるより、先週あなたが書いた「上手な議事録のコピー」を渡して「これと同じテンションで書いて」と頼む方が、確実にお手本通りに書けるのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「以下の文章を親しみやすいトーンに変更してください。【お手本】：（元の文章）→（あなたの書いた文章）。それでは、次の文章をお手本に合わせて書き換えてください。」</code></p>
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
    </div>
  );
}
