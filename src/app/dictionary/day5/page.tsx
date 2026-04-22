"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Day5() {
  const { lang } = useI18n();

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
        <p>AIの記憶領域がいわゆる「パンク」してしまった状態（脳みそのショート）のことです。情報が多すぎると、直近の大事な指示を見落とす現象が発生します。AIがおかしくなったら「あ、容量オーバーだな」と察し、リセットしてあげるのが人間の役目です。</p>
      </section>

      <section>
        <h2>22. Summary Checkpoint（サマリー・チェックポイント）</h2>
        <p>コンテキスト・オーバーロードを防ぐ最強の予防策です。スレッドを区切る前に進捗を「要約」させ、次回の会話でカンニングペーパーとして使えるように保存します。</p>
      </section>

      <section>
        <h2>23. Knowledge Base（ナレッジベース / 知識の保管庫）</h2>
        <p>AIの記憶に頼るのではなく、重要なルールや仕様を「独立したファイル（Markdownなど）」として手元に保存しておく物理的な保管庫のことです。台所の壁に貼った「レシピ」のような役割を果たします。</p>
      </section>

      <section>
        <h2>24. Thread Reset（スレッド・リセット）</h2>
        <p>あえて今の会話を閉じ、新しい会話画面でまっさらな状態から再開することです。話題が変わったら、勇気を持って「サマリー」を携えて新しいホワイトボードに切り替えましょう。</p>
      </section>

      <section>
        <h2>25. Workspace Isolation（ワークスペースの分離）</h2>
        <p>実験用の「砂場（sandbox）」と本番環境のフォルダを分けることです。思いつきの機能追加で本番コードが破壊されるのを防ぎます。</p>
      </section>

       <section>
        <h2>26. System Instruction Override（システムプロンプトの上書き）</h2>
        <p>AIの性格を「専門家」や「ハッカー」など特定の役割に一時的に書き換え、普段は見落とすような隙を指摘させる高等テクニックです。作業が終わったら「親切なアシスタントに戻って」とリセットを忘れずに。</p>
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
