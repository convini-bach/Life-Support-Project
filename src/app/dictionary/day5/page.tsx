"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import AffiliateCard from "@/components/AffiliateCard";
import { ITEMS } from "@/lib/recommendation";

export default function Day5() {
  const { lang } = useI18n();
  const bookRecommendation = ITEMS.find(i => i.id === 'ai-dictionary-book');

  return (
    <div className="dictionary-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Day 5: Context Management
        </div>
        <h1>
          {lang === 'ja' ? "第5日目：文脈の守護神（Context Management）" : "Day 5: Context Management"}
        </h1>
      </header>

      <section>
        <p>AIと長くチャットをしていると、急に昔のことを忘れたり、動作が重くなったりします。これは「文脈（コンテキスト）の限界」を迎えたサインです。</p>
        <p>AIの記憶の仕組みを理解し、人間が上手にメモをまとめたり会話をリセットしてあげる「コンテキスト管理の技術」を身につけましょう。これが大規模開発における迷走を防ぐ鍵となります。</p>
      </section>

      <hr />

      <section>
        <h2>21. Context Overload（コンテキスト・オーバーロード）</h2>
        <h3>一言でいうと？</h3>
        <p>AIの頭の中の記憶領域がいわゆる「パンク」してしまった状態（脳みそのショート）のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>情報が多すぎると、AIは直近の指示を見落とすようになります。AIがおかしくなったら「あ、容量オーバーだな」と察し、情報を削ぎ落としてあげる（リセットする）のが人間の役目です。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          会議の議事録、マニュアル、今日の献立を同時に広げた机の上で、「で、今何を書けばいいんだっけ？」と混乱してフリーズしている新人さんの状態です。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「【警告】会話が長くなりすぎたため、コンテキスト・オーバーロードを起こしているようです。これまでの古い議論は一旦忘れて、今から送る『現在の要件』だけを読み込んで作業を再開してください。」</code></p>
      </section>

      <section>
        <h2>22. Summary Checkpoint（サマリー・チェックポイント）</h2>
        <h3>一言でいうと？</h3>
        <p>長くなった会話を、スレッドを区切る前に短く「要約」させ、次回の会話でカンニングペーパーとして使えるように保存する技術です。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>コンテキスト・オーバーロードを防ぐための最強の予防策です。何千行もの「過程」は捨て、「現在の完成状況」という要約だけを持ち歩くことで、AIの頭を常にクリアに保てます。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          金曜日の夕方に「今週やったこと」「来週やること」を3行で日報に残し、月曜日の朝にそれを読んでから迷わず作業を再開するようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「第一段階が完了しました。新しくスレッドを立ち上げるため、『1. 完成した機能、2. 定義済みの構造、3. 次の実装タスク』を盛り込んだサマリー・チェックポイントを作成してください。」</code></p>
      </section>

      <section>
        <h2>23. Knowledge Base（ナレッジベース / 知識の保管庫）</h2>
        <h3>一言でいうと？</h3>
        <p>AIの記憶に頼るのではなく、重要なルールを「別ファイル」として手元に保存しておく物理的な保管庫のことです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>チャットの履歴は一時的な記憶で、流れて消えてしまいます。プロジェクト共通の普遍的なルールをファイルとして独立させることで、いつでも正確なインプットが可能になります。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          お母さんに毎回作り方を聞くのではなく、台所の壁にレシピ（ナレッジベース）を貼っておき、「これを見て作って」と指示する方が確実でストレスがないのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「作業を開始する前に、ワークスペースにある design_guidelines.md を読み込んでください。そこに記載されているルールを厳守してコードを書いてください。」</code></p>
      </section>

      <section>
        <h2>24. Thread Reset（スレッド・リセット）</h2>
        <h3>一言でいうと？</h3>
        <p>あえて今の会話を閉じ、新しい会話画面でまっさらな状態から再開することです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>一つのスレッドで色々な相談を混ぜ込むと、AIは話題の切り替わりについていけなくなります。話題が変わったら物理的にスレッドを切り替えるのが最も効果的です。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          ぐちゃぐちゃになった古いアイデアだらけのホワイトボードに書き足すのではなく、一旦綺麗に消してから「新しいホワイトボードに書き直す」ことです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「新しいタスクを開始します。以下は前のスレッドから引き継いだ現在の作業状況（サマリー）です。これを前提として、本日はデータベースの設計に話題を切り替えます。」</code></p>
      </section>

      <section>
        <h2>25. Workspace Isolation（ワークスペースの分離）</h2>
        <h3>一言でいうと？</h3>
        <p>実験用の「砂場（sandbox）」と本番環境のフォルダを、物理的に分けて作業させることです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>AIに「ちょっとこの機能を試して」と頼むと、本番の動いているコードを容赦なく書き換えてしまうことがあります。隔離された実験場を作ることで、本体の安全性を守ります。</p>

        <blockquote>
          <strong>事務作業に例えると？</strong><br />
          お客様に提出する「本番の契約書」の中で、試し書きや文章の練習を行わないですよね。必ず「下書き用バインダー」を作るのと同じです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「新しい機能を試したいのですが、本番コードには触れず、まずは experiments/ フォルダの中にテスト用のファイルを生成して実験してください。」</code></p>
      </section>

      <section>
        <h2>26. System Instruction Override（システムプロンプトの上書き）</h2>
        <h3>一言でいうと？</h3>
        <p>AIの大元の「性格」や「役割」を、対話の中で一時的に全く別のものに書き換えてしまう高等テクニックです。</p>
        
        <h3>なぜ重要なのか？</h3>
        <p>普段の「親切なアシスタント」としての人格では見落としてしまうような隙やアイデアを、極端な人格（例：世界一厳しいセキュリティ専門家）を憑依させることで引き出します。</p>

        <blockquote>
          <strong>生活に例えると？</strong><br />
          普段は優しい先輩に、「よし、今から10分間だけ、意地悪な競合他社の社長のふりをして私のプランをボロクソに批判して！」とお願いするようなものです。
        </blockquote>

        <h3>実践プロンプト例</h3>
        <p><code>「【システムプロンプト上書き指示】今からあなたは『世界一厳格なセキュリティ専門家』です。その視点から、先ほどのログイン機能のコードをレビューし、少しでも脆弱な部分があれば指摘してください。」</code></p>
      </section>

      {/* Navigation and CTA */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <Link href="/dictionary/day4" style={{ color: '#64748b', textDecoration: 'none' }}>
          &larr; {lang === 'ja' ? '第4日目へ戻る' : 'Back to Day 4'}
        </Link>
        <Link href="/dictionary/day6" className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
          {lang === 'ja' ? '第6日目へ進む' : 'Go to Day 6'} &rarr;
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
