"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day3() {
  const { lang } = useI18n();

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
        <p>大きすぎるゴールを、AIが一度のターンで安全に実行できる「最小の作業単位（タスク）」に分解することです。</p>
        <blockquote>
          <strong>生活に例えると？</strong><br />
          AIのシェフに「今夜のディナーを作って」と一言で頼むのではなく、「まずはメニューを確定させる」「次にスーパーで肉を買ってくる」「その後、肉の下ごしらえをする」と、人間が工程の壁を作ってあげるのがタスクブレイクダウンです。
        </blockquote>
        <h3>実践プロンプト例</h3>
        <p><code>「家計簿アプリを作る予定ですが、今日はTask 1だけを実装します。他のことは考えないでください。Task 1: カレンダーの枠組みだけを表示する。」</code></p>
      </section>

      <section>
        <h2>12. Step-by-Step（ステップ・バイ・ステップ）</h2>
        <p>AIに対して、「答えを急がず、一つずつ順番に考えて、その過程を書き出してね」と誘導する魔法の言葉です。プロンプトの末尾に <strong>「Let's think step by step.」</strong> と添えるだけで、AIの精度が劇的に向上します。</p>
      </section>

      <section>
        <h2>13. Scope Creep（スコープクリープ）</h2>
        <p>作っている途中で「あ、この機能も！」と次々に追加してしまい、プロジェクトの終わりが永久に見えなくなる現象です。「Ver 1.0には入れない」という切り捨てリストを持つ勇気が重要です。</p>
      </section>

      <section>
        <h2>14. MVP（Minimum Viable Product）</h2>
        <p>「とりあえず目的の動作だけはする、一番小さくてシンプルな完成品」のことです。まずは「0から10（MVP）」を作り、動くことを確かめてから「色を塗る」というトッピングのステップを踏むのが鉄則です。</p>
      </section>

      <section>
        <h2>15. Dependency（依存関係）</h2>
        <p>「土台ができてから柱を建てる」という作業順序を人間がコントロールすることです。指示を出す前に「これを作らせるためには、先に何が決まっていなければならないのか？」を1秒だけ想像しましょう。</p>
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
        <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>🎁 {lang === 'ja' ? '特典付き・完全版のご案内' : 'Complete Edition'}</h4>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {lang === 'ja' 
            ? "このガイドの実践を加速させる「Obsidian専用テンプレート」や「プロンプト集」をパッケージした完全版を note で公開中です。" 
            : "Get the Complete Edition on note.com, including Obsidian templates and prompt collections to prevent failures."}
        </p>
        <Link href="https://note.com/convinibach/n/n3b92e13f37d8" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'note で完全版を購入する' : 'Buy Complete Edition on note'}
        </Link>
      </div>
    </div>
  );
}
