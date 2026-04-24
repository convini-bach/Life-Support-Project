"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day1() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

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
        <h3>一言でいうと？</h3>
        <p>そのプロジェクトにおいて「絶対に譲れない中心的な価値」のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>開発が進むにつれて機能を追加したくなりますが、すべてを盛り込むと使い勝手が悪くなります。コアバリューが設定されていると、それが「機能を採用するか捨てるか」の明確な判断基準となります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          新しいレストランを開くときの「看板メニュー」を決める作業です。「早い・安い」を売りにするのか、「時間がかかっても極上の味」を売りにするのかを決めておかなければ、お店はすぐに迷走してしまいます。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「このアプリのコアバリューは『1タップで記録が完了すること（究極のシンプルさ）』です。今後、機能を追加する際はこのコアバリューを損なわないかを必ず確認してから実装案を出してください。」</code></p>
      </section>

      <section>
        <h2>3. User Persona（ユーザーペルソナ）</h2>
        <h3>一言でいうと？</h3>
        <p>そのアプリを使ってくれる「たった一人のお客さん」の具体的な人物像のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>「みんなに使いやすいもの」を作ろうとすると、誰にとっても平凡なものになります。「特定のこの人を強烈に救うもの」を作る方が、結果的に多くの人に刺さるプロダクトになります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          友人の誕生日プレゼントを選ぶとき、「30代女性向け」と考えるより、「肩こりに悩んでいてキャンプが好きなAさん」と具体的にイメージした方が、絶対に喜ばれるものをピンポイントで選べるのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「ペルソナは、『スマホの基本操作はできるが、複雑な設定画面を見るとすぐにアプリを閉じてしまう50代の女性』です。このペルソナに向けて、設定画面のUIを見直してください。」</code></p>
      </section>

      <section>
        <h2>4. Success Criteria（サクセスクライテリア）</h2>
        <h3>一言でいうと？</h3>
        <p>「何ができたら、この仕事は成功（完了）と言えるのか」という合格ライン・完了条件のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは非常に勤勉なので、止められない限り無限にコードを書き続けたり、過剰に高品質なデザインを探求し続けたりします。明確なゴールラインを引くことで、無駄な時間とコストを削減できます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          子供に「お風呂掃除しておいて」と頼むと、パッと流して終わるか、カビまで取り始めるか人によって違います。「浴槽のザラザラが無くなったら完了ね」と指定するのがサクセスクライテリアです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今日の作業のサクセスクライテリアは、『ユーザーがメールアドレスでログインし、自分のダッシュボード画面が表示されること』です。細かい追加機能は今は除外して、最短でこの条件を達成してください。」</code></p>
      </section>

      <section>
        <h2>5. Project Prompt（プロジェクトプロンプト）</h2>
        <h3>一言でいうと？</h3>
        <p>決めた「ビジョン」「コアバリュー」「ペルソナ」「ルール」を一つにまとめた、プロジェクト専用の「憲法」となるテキストのことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>会話が何日も続くと、AIの記憶がいっぱいになり、最初の大前提を忘れてしまうことがあります。ドキュメント化しておくことで、いつでも初心に引き戻すことができます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          会社の壁に貼ってある「社訓」や、マニュアルの1ページ目に書いてある「私たちの理念」のようなものです。判断に迷った時は必ずこれを見る、という絶対的な聖典です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「現在のコードの改修を行いたいのですが、まずは project_prompt.md を読み込んでください。私たちのビジョンとペルソナを再確認した上で、今後の実装案を提示してください。」</code></p>
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
