"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day3() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 3: Task Breakdown
        </div>
        <h1>
          {lang === 'ja' ? "第3日目：迷子脱出の分解術（Task Breakdown）" : "Day 3: Task Breakdown"}
        </h1>
      </header>

      <section>
        <p>AIにどれだけ上手にゴールを伝えても、「大きすぎる作業」を丸投げすると、途中で論理が破綻したり、想定外の方向に走り出したりして「迷子」になってしまいます。</p>
        <p>人間が壮大なプロジェクトを進める際にマイルストーンを置くように、AIの仕事も「小さく切り分けて一つずつ片付ける」技術が必須です。AI開発における最大のスキルは、プロンプト力ではなく、この「タスクの分解力」です。</p>
      </section>

      <hr />

      <section>
        <h2>11. Task Breakdown（タスクブレイクダウン）</h2>
        <h3>一言でいうと？</h3>
        <p>大きすぎるゴールを、AIが一度のターンで安全に実行できる「最小の作業単位（タスク）」に分解することです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは一度に多くのことを頼まれると、途中で論理が破綻したり、細部を省略したりします。人間が工程を細かく切り分けて渡すことで、AIの仕事の品質は劇的に向上します。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          AIのシェフに「今夜のディナーを作って」と一言で頼むのではなく、「メニューを確定させる」「肉を買ってくる」「下ごしらえをする」と、人間が工程の壁を作ってあげる作業に似ています。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「家計簿アプリを作る予定ですが、今日はTask 1だけを実装します。他のことは考えないでください。Task 1: カレンダーの枠組みだけを表示するコードを書いてください。」</code></p>
      </section>

      <section>
        <h2>12. Step-by-Step（ステップ・バイ・ステップ）</h2>
        <h3>一言でいうと？</h3>
        <p>AIに対して、「答えを急がず、一つずつ順番に考えてね」と誘導する手法です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは計算や推論を行う際、いきなり答えを出そうとすると「うっかりミス」をします。過程を書き出させることで、AI自身の論理が整理され、正解率が飛躍的に高まります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          複雑な計算を暗算でやらせるのではなく、「必ず計算用紙に途中式を書いてから答えを出してね」とお願いするようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「この問題について、答えを出す前にステップ・バイ・ステップで順を追って考えてください。まず現状を整理し、次に解決策の候補を挙げ、最後に最適なものを選んでください。」</code></p>
      </section>

      <section>
        <h2>13. Scope Creep（スコープクリープ）</h2>
        <h3>一言でいうと？</h3>
        <p>作っている途中で「あ、この機能も！」と次々に追加してしまい、プロジェクトが終わらなくなる現象です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AI開発は手軽なため、つい要望を盛り込みすぎてしまいます。これが起きるとコードが複雑化し、AIも人間も制御不能になります。「Ver 1.0には入れない」という切り捨てが重要です。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「会議の資料を1枚作って」と頼まれたのに、作っているうちに「グラフも入れたい」「動画も埋め込みたい」と膨らんで、結局会議に間に合わなくなるような状態です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今はログイン機能だけに集中してください。デザインの調整や通知機能の追加は、今はスコープ外（Scope Creep）です。まずは動くものを作ることを優先しましょう。」</code></p>
      </section>

      <section>
        <h2>14. MVP（Minimum Viable Product）</h2>
        <h3>一言でいうと？</h3>
        <p>「とりあえず目的の動作だけはする、一番小さくてシンプルな完成品」のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>最初から完璧なものを作ろうとすると、エラーの原因が特定できなくなります。まずは「0から10（MVP）」を作り、動くことを確かめてから「トッピング」を乗せるのが鉄則です。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          車を作りたいとき、いきなりスポーツカーを目指すのではなく、まずは「地面を滑って移動できるスケートボード（MVP）」を作って、コアな体験を確かめる考え方です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今日の最終目標は、最低限のMVPを完成させることです。文字の装飾やクラウド保存は全て不要です。『文字を入力して、ボタンを押せば保存される』という機能のみを実装してください。」</code></p>
      </section>

      <section>
        <h2>15. Dependency（依存関係）</h2>
        <h3>一言でいうと？</h3>
        <p>「Aが終わらないと、Bが始められない」という、作業同士の前後の繋がりのことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは指示を同時並行でこなそうとしますが、開発には「土台ができてから柱を建てる」という絶対の順序があります。この順序を人間がコントロールしないと、手戻りが発生します。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「部長のハンコ（A）」をもらわないと、「経理に書類を出す（B）」ことができない、という会社の絶対的な業務フローと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「以下の2つのタスクをお願いしますが、依存関係があるため必ずAから実行してください。タスクA：データベースの設計をする。タスクB：そのデータベースを使う画面を作る。」</code></p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day2" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第2日目へ戻る' : 'Back to Day 2'}
        </Link>
        <Link href="/dictionary/day4" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第4日目へ進む' : 'Go to Day 4'} &rarr;
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
