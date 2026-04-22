"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day1() {
  const { lang } = useI18n();

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 1: Vision Sync
        </div>
        <h1>
          {lang === 'ja' ? "第1日目：想いの同期（Vision Sync）" : "Day 1: Vision Sync"}
        </h1>
      </header>

      <section>
        <p>AIの実務活用における最初の、そして最大の壁は「何を作りたいか（What）」ではなく、「なぜそれを作りたいのか（Why）」をAIに完璧に伝えることにあります。</p>
        <p>どんなに高性能なAIであっても、現時点ではあなたの心の中にある「情熱」や「背景にあるストーリー」までは推測できません。まずはAIをただの入力マシーンから「同じ船に乗る仲間」へと引き上げるための言葉と概念を深く知っていきましょう。</p>
      </section>

      <hr />

      <section>
        <h2>1. Vision Sync（ビジョン・シンク）</h2>
        <h3>一言でいうと？</h3>
        <p>あなたとAIの間で、プロジェクトの「最終的な目的」と「根本にある想い」を完璧に一致させる作業のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは目的が共有されていないと「とりあえず動くが、血の通っていないシステム」を作ってしまいます。ビジョンを同期させることで、AI自身が「この機能はユーザーにとって本当に必要か？」を判断できるようになります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          新しいアルバイトスタッフに「ここにハンコを押しておいて」とだけ頼むのが普通の指示です。対してビジョン・シンクは、「この書類はお客様の一生を左右する大切な契約書だから、ミスのないようにダブルチェックしながらハンコを押してね」と、作業の奥にある意味と重さを伝えることに似ています。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「これから健康管理アプリを作ります。単なる記録ツールではなく、『ずぼらな人でも毎日開きたくなる、温かい伴走者のようなアプリ』にしたいです。これが私たちのビジョンです。これ以降の提案はすべてこのビジョンに沿って行ってください。」</code></p>
      </section>

      <section>
        <h2>2. Core Value（コアバリュー）</h2>
        <p>そのプロジェクトにおいて「絶対に譲れない中心的な価値」のことです。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「このアプリのコアバリューは『1タップで記録が完了すること（究極のシンプルさ）』です。今後、機能を追加する際はこのコアバリューを損なわないかを必ず確認してから実装案を出してください。」</code></p>
      </section>

      <section>
        <h2>3. User Persona（ユーザーペルソナ）</h2>
        <p>そのアプリを使ってくれる「たった一人のお客さん」の具体的な人物像のことです。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「ペルソナは、『スマホの基本操作はできるが、複雑な設定画面を見るとすぐにアプリを閉じてしまう50代の女性』です。このペルソナに向けて、設定画面のUIを見直してください。」</code></p>
      </section>

      <section>
        <h2>4. Success Criteria（サクセスクライテリア）</h2>
        <p>「何ができたら、この仕事は成功（完了）と言えるのか」という合格ラインのことです。</p>
        <h3>実践プロンプト例</h3>
        <p><code>「今日の作業のサクセスクライテリアは、『ユーザーがメールアドレスでログインし、自分のダッシュボード画面が表示されること』です。細かい追加機能は今は除外して、最短でこの条件を達成してください。」</code></p>
      </section>

      <section>
        <h2>5. Project Prompt（プロジェクトプロンプト）</h2>
        <p>これまで決めた「ビジョン」「コアバリュー」「ペルソナ」「ルール」を一つにまとめた、プロジェクト専用の「憲法」となるテキストのことです。</p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day0" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '準備編へ戻る' : 'Back to Day 0'}
        </Link>
        <Link href="/dictionary/day2" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第2日目へ進む' : 'Go to Day 2'} &rarr;
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
