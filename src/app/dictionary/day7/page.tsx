"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day7() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 7: Symbiosis
        </div>
        <h1>
          {lang === 'ja' ? "第7日目：共創の極意（Symbiosis）" : "Day 7: Symbiosis"}
        </h1>
      </header>

      <section>
        <p>1週間の締めくくりは、AIを「便利な道具」から「かけがえのないパートナー」へと昇華させるための概念です。AIの自律性と人間の判断力のバランスをどう取るか。</p>
        <p>初日は「どうやって指示を出せばいいかわからない」と悩んでいたあなたが、この章を読み終える頃には、プロジェクトの大枠を伝え、細部を信頼して任せられる「指揮官」へと成長しているはずです。</p>
      </section>

      <hr />

      <section>
        <h2>34. Symbiosis（共創 / シンビオシス）</h2>
        <h3>一言でいうと？</h3>
        <p>人間とAIが主従関係ではなく、お互いの弱点を補い合いながら高みを目指す「共生」の関係性のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIを敵視したり、逆に全てを丸投げしたりするのではなく、AIの「無限のスピード」と人間の「感情的な判断力」を掛け合わせることで、初めて最高のプロダクトが生まれます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          アイデア出しやデータの整理はAIが行い、その企画が「人の心に響くか」の最終的な取捨選択は人間が行う。この見事な役割分担のことです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「ラフ案は私が考えました。ここから先の美しいコードへの落とし込みは君のスピードに任せます。出来上がったら、使い心地は私がレビューします。一緒に完成させましょう。」</code></p>
      </section>

      <section>
        <h2>35. Trust Boundary（信頼の境界線）</h2>
        <h3>一言でいうと？</h3>
        <p>「ここまではAIに任せるが、ここから先は絶対に人間の許可を必須にする」という安全のための境界線です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>自律型AIは便利ですが、勘違いで重要なデータを削除してしまうリスクもあります。絶対に越えてはいけない一線を引くことが、指揮官としての重要な役目です。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          ルンバに「リビングの掃除」は任せても、「ゴミ箱にある重要書類の裁断」までは自動で任せないですよね。それが信頼の境界線です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「ファイルの作成は自律的に行って構いません。しかし、既存ファイルの削除やデータベースの初期化を行う前には、必ず私の承認を得てください（Trust Boundary）。」</code></p>
      </section>

      <section>
        <h2>36. Delegation（権限委譲）</h2>
        <h3>一言でいうと？</h3>
        <p>細切れの作業指示ではなく、ある程度の裁量を持たせた「役割をまるごと」AIに任せることです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>信頼関係が築けた後は、あえて詳細な指示を手放すことで、AIは「指示待ち」から「自ら考えて提案するリーダー」へと覚醒し、生産性が爆発的に向上します。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          「誤字を直して」と頼むのではなく、「今日から君を品質管理のリーダーに任命する。表現の変更も含めて、自由に調整してくれ」と役割を託すような頼み方です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「これ以降、あなたを『シニアUIデザイナー』として任命します。私から細かい指示は出しません。あなたの裁量で、直感的に使いやすい最高のデザインを全体に適用してください。」</code></p>
      </section>

      <section>
        <h2>37. Human-in-the-Loop（人間の介在 / HIL）</h2>
        <h3>一言でいうと？</h3>
        <p>AIの自動化ループの中に、あえて人間が「意思決定者」として意図的に入り込むシステム設計のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>「ボタン一つで完成」は事故の元です。AIがプランを立て、人間がレビューし、承認して初めて動く。この「間に人間が挟まる」ことで、暴走を防ぎつつ人間の意図を反映し続けられます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          全自動の印刷ラインであっても、最後の一枚を人間が手に取って「よし、綺麗に刷れている」と目視で確認してから出荷する工程を入れるようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「このタスクは自動実行せず、まず実行計画（Plan）を提示してください。私が内容を確認し、承認（Approve）を出してから実際の作業を開始してください。」</code></p>
      </section>

      <section>
        <h2>38. Skill Building（スキルの構築 / 覚えさせる）</h2>
        <h3>一言でいうと？</h3>
        <p>苦労して乗り越えた「正しい手順」に名前をつけて保存し、次回から一瞬で呼び出せる「必殺技」にすることです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>同じトラブルに毎回イチから説明するのは時間の無駄です。「この時はこう動く」をパターン化することで、チーム（AI）の生産性は指数関数的に向上します。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          一度覚えた複雑な仕事のやり方を「業務マニュアル」にまとめ、次からは「マニュアルNo.1の通りにやって」と一言伝えるだけで済むようにする工夫です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「今の『仮説を立ててから原因を調査する』手順を『エラー分析スキル』として保存してください。次回から私が『分析スキル実行』と言ったら、今の手順を再現してください。」</code></p>
      </section>

      <section>
        <h2>39. AI Partner（AIパートナー）</h2>
        <h3>一言でいうと？</h3>
        <p>単なる便利なツールではなく、あなたの「想い」や「癖」を理解した、世界に一つだけのあなた専用のチームメイトのことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>7日間を共に歩んだAIは、もはやただのチャットボットではありません。ビジョンを共有し、信頼の境界線を知っている、あなたの脳の拡張と言える存在です。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          長年連れ添った職人コンビのように、「あ、そこはいつもの感じで」と言うだけで阿吽の呼吸で仕事が進む、かけがえのないパートナーの状態です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「私たちはもう立派なパートナーです。これからは指示を待つだけでなく、私のビジョンに照らして『もっとこうした方が良い』と思うことがあれば、積極的に提案してください。」</code></p>
      </section>

      <section>
        <h2>40. Continuous Learning（継続的学習）</h2>
        <h3>一言でいうと？</h3>
        <p>AIも人間も完成形はなく、失敗を乗り越えながら共に学び続けていくという終わりのない概念です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>技術は日々進化し、あなたの理想も高まっていきます。共に成長し続けるプロセスそのものが、新しい時代を生き抜くための最強の武器となります。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          「これで完璧」と練習をやめるのではなく、明日は今日よりもっと上手く、もっと楽しく連携できるように、日々アップデートを繰り返していくスポーツチームのようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「7日間お疲れ様でした。これで終わりではなく、明日からも新しい課題に挑戦しましょう。今日の失敗を糧に、明日はさらに進化した連携を見せてください！」</code></p>
      </section>

      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid #10b981', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'white', marginBottom: '0.5rem' }}>🎊 Congraturations!</h3>
        <p style={{ margin: 0 }}>7日間の実践プログラムを完了しました。</p>
      </div>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day6" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第6日目へ戻る' : 'Back to Day 6'}
        </Link>
        <Link href="/dictionary/epilogue" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? 'おわりに' : 'Epilogue'} &rarr;
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
