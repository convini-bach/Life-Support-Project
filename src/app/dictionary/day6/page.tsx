"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day6() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 6: Advanced Reasoning
        </div>
        <h1>
          {lang === 'ja' ? "第6日目：壁を越える問いかけ（Advanced Reasoning）" : "Day 6: Advanced Reasoning"}
        </h1>
      </header>

      <section>
        <p>AIがどうしても問題を解決できない、何度指示してもエラーが直らないという「分厚い壁」にぶつかった時、必要なのは指示の量を増やすことではなく、「AIへの問いかけ方（質問の角度）をガラリと変えること」です。</p>
        <p>この章では、行き詰まった現状を打破する高度なプロンプティング手法を学びます。</p>
      </section>

      <hr />

      <section>
        <h2>27. Rubber Ducking（ラバーダック・デバッグ）</h2>
        <h3>一言でいうと？</h3>
        <p>解決策をAIに「聞く」のではなく、自分が何に悩んでいるのかを会話形式でAIに「ただひたすら説明する」技術です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>人間が書くプロンプト自体が思い込みに囚われていると、AIも同じ穴に落ちます。人間が状況を整理して話すプロセス自体が、AIに究極のヒントを与え、自ら解決の糸口を見つけることに繋がります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          仕事で行き詰まった時、事情を知らない同僚に「ここがこうなってて…あっ！もしかしてここが原因か！」と、話しているうちに自分で答えに気づくあの現象のことです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今から私が今起きているエラーについて説明します。あなたはすぐに答えを出そうとせず、私の説明の中で矛盾している部分があればそこだけを指摘してください。」</code></p>
      </section>

      <section>
        <h2>28. Error Trace（エラーの追跡）</h2>
        <h3>一言でいうと？</h3>
        <p>「画面に出た表面上のエラー」を直接直そうとせず、そのエラーが「どこから、どういう過程を経て発生したのか」という足跡を辿る技術です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>エラーメッセージの多くは「最終的に壊れた場所」を示しているだけで、原因を示していません。表面だけを渡すと、AIはその場しのぎの絆創膏を貼り、システムがいびつになります。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          天井から水漏れを見つけた時、床を雑巾で拭き続けるのではなく、「水はどこから来ている？上の階か？配管か？」と元を辿っていく作業です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「『User not found』が出ましたが、これを直接直さないでください。エラーの発生源を特定するため、①入力データ、②通信時、③保存時、どの段階でデータが消えているか検証する手順を提案してください。」</code></p>
      </section>

      <section>
        <h2>29. Perspective Shift（視点の切り替え）</h2>
        <h3>一言でいうと？</h3>
        <p>問題を作っている「開発者側」からではなく、アプリを「使う側」や「壊す悪意のある側」にAIの立ち位置を強制的に移動させることです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>開発が進むと会話が実装面のみに偏ります。意図的に視点を多角化させることで、技術的な正解ではなく、ユーザー体験としての正解を導き出します。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          自分で書いた企画書を、今度はあえて「一切の事情を知らない意地悪な社長の目線」で読み返して、突っ込まれそうな隙を探すことです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「あなたが『一切パソコンを使えない80歳の高齢者』だとしたら、今のこの設定画面のUIのどこでつまずくと思いますか？高齢者の視点で3点指摘してください。」</code></p>
      </section>

      <section>
        <h2>30. Alternative Approach（代替案の模索）</h2>
        <h3>一言でいうと？</h3>
        <p>今のアプローチ（方法A）で泥沼に陥った時、「その道自体を思い切って捨てる」ようにAIに促すことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIは指示に忠実なので、人間が「この方法で直して」と言い続ける限り、それが悪手であっても従い続け、自滅します。人間側が「別の道を提示して良い」と許可を出す必要があります。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          渋滞している道で「どうにか早く抜けよう」と粘るより、カーナビに「高速を降りて、遠回りでもいいから別のルート（代替案）を探して」と頼む方が、結果的に早く着くのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今使っている方法（アプローチA）にこだわるのはやめましょう。目的は『安全にログインできること』のみです。今のアプローチを捨てて、別の代替案を3つ提案してください。」</code></p>
      </section>

      <section>
        <h2>31. Root Cause Analysis（根本原因の分析）</h2>
        <h3>一言でいうと？</h3>
        <p>「なぜその問題が起きたのか」を、5段階くらい深く「なぜ？」とAIに掘り下げさせる分析法です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>あるバグを直しても、数日後にまた同じようなバグが発生することがあります。これは根本的な設計の欠陥が直っていないからです。放置すると、最終的にアプリを作り直す羽目になります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「プリンターが動かない（なぜ？）→紙が詰まった（なぜ？）→安い紙を間違えて発注した（なぜ？）」というように、真の原因を突き止めるトヨタ式問題解決法と同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「このエラーですが、コードを直す前に『Root Cause Analysis（根本原因の分析）』を行ってください。なぜこの値が空になってしまったのか、大元にある設計上の問題は何ですか？」</code></p>
      </section>

      <section>
        <h2>32. Hypothetical Question（仮説の提示）</h2>
        <h3>一言でいうと？</h3>
        <p>原因がわからない時に、「もし〇〇だとしたら？」という人間側の「直感や勘」をAIにぶつけて検証させる技術です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIはコードの論理性から原因を探りますが、人間は「さっきOSをアップデートした」といった環境の変化や直感を持っています。論理と直感を掛け合わせることで、最速の解決が見つかります。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          医者に症状を伝えるとき、「もしかして、昨日食べた生牡蠣が原因だったりしますか？」と自分の心当たりを伝えて、検査の方向性を絞ってもらうようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「原因が分かりません。仮説ですが、『昨日アップデートしたソフトの仕様変更が原因』だったりしますか？この仮説が正しいかどうか、ウェブ検索などを用いて検証してください。」</code></p>
      </section>

      <section>
        <h2>33. Devil's Advocate（悪魔の代弁者）</h2>
        <h3>一言でいうと？</h3>
        <p>AIに「あえて反対意見を言う役割」を演じさせ、アイデアの「弱い部分」を強制的にあぶり出すことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>自分とAIだけで開発していると、すべてが完璧だという錯覚に陥ります。外部からの冷や水のような批判をAIにシミュレーションさせることで、致命的な欠陥をリリース前に発見できます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          会議の前に、「今から君はライバル企業の社員だ。この企画のダメなところを3つボロクソに言ってくれ」と身内に頼んで、プレゼンの完成度を高める作業です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今から新機能のプランを説明します。あなたは『Devil's Advocate（悪魔の代弁者）』として、このプランを手放しで褒めず、ビジネス面でのリスクを3つ辛口で提示してください。」</code></p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day5" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第5日目へ戻る' : 'Back to Day 5'}
        </Link>
        <Link href="/dictionary/day7" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第7日目へ進む' : 'Go to Day 7'} &rarr;
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
